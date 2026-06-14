import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHANNEL_USERNAME = "aswebdevelopment";
const STATE_DIR = ".github/state";
const STATE_FILE = `${STATE_DIR}/last-update-id.txt`;
const CONTENT_DIR = "src/content/blog";

if (!BOT_TOKEN) {
  console.error("TELEGRAM_BOT_TOKEN is not set");
  process.exit(1);
}

const lastUpdateId = (() => {
  if (existsSync(STATE_FILE)) {
    return parseInt(readFileSync(STATE_FILE, "utf-8").trim(), 10);
  }
  return 0;
})();

const response = await fetch(
  `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${lastUpdateId + 1}&limit=100`,
);

if (!response.ok) {
  console.error(`Telegram API error: ${response.status} ${response.statusText}`);
  process.exit(1);
}

const data = await response.json();

if (!data.ok) {
  console.error(`Telegram API error: ${data.description}`);
  process.exit(1);
}

const updates = data.result || [];

const channelPosts = updates
  .filter(
    (update) =>
      update.channel_post &&
      update.channel_post.chat?.username === CHANNEL_USERNAME &&
      update.channel_post.text,
  )
  .map((update) => ({
    updateId: update.update_id,
    messageId: update.channel_post.message_id,
    text: update.channel_post.text,
    date: update.channel_post.date,
  }));

if (channelPosts.length === 0) {
  console.log("No new posts found.");
  process.exit(0);
}

let maxUpdateId = lastUpdateId;

for (const post of channelPosts) {
  const lines = post.text.split("\n");
  const title = lines[0].trim();
  const body = lines.slice(1).join("\n").trim();

  if (!title) continue;

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const date = new Date(post.date * 1000);
  const dateStr = date.toISOString().split("T")[0];

  if (!existsSync(CONTENT_DIR)) {
    mkdirSync(CONTENT_DIR, { recursive: true });
  }

  const frontmatter = `---
title: "${title}"
publishedDate: ${dateStr}
tags: []
description: "${title}"
draft: false
---

${body}
`;

  const filename = `${CONTENT_DIR}/${dateStr}-${slug}.md`;

  if (existsSync(filename)) {
    console.log(`Skipped (already exists): ${filename}`);
  } else {
    writeFileSync(filename, frontmatter);
    console.log(`Created: ${filename}`);
  }

  maxUpdateId = Math.max(maxUpdateId, post.updateId);
}

if (!existsSync(STATE_DIR)) {
  mkdirSync(STATE_DIR, { recursive: true });
}
writeFileSync(STATE_FILE, String(maxUpdateId));
console.log(`State updated: last_update_id = ${maxUpdateId}`);
