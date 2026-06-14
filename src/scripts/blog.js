const searchInput = document.getElementById("blog-search");
const tagBtns = document.querySelectorAll(".tag-btn");
const cards = document.querySelectorAll(".blog-card");
const synopsisQuery = document.getElementById("synopsis-query");
const synopsisTag = document.getElementById("synopsis-tag");
let activeTag = "all";

function filter() {
  const query = (searchInput?.value || "").toLowerCase().trim();
  if (synopsisQuery) synopsisQuery.textContent = query ? `"${query}"` : '"..."';
  if (synopsisTag) synopsisTag.textContent = activeTag;

  let visibleCount = 0;
  cards.forEach((card) => {
    const matchesTag =
      activeTag === "all" ||
      (card.dataset.tags || "").split(",").includes(activeTag);
    const matchesSearch =
      !query ||
      (card.dataset.title || "").includes(query) ||
      (card.dataset.description || "").includes(query);
    card.style.display = matchesTag && matchesSearch ? "" : "none";
    if (matchesTag && matchesSearch) visibleCount++;
  });

  const list = document.getElementById("blog-list");
  let existing = document.getElementById("blog-empty-msg");
  if (visibleCount === 0) {
    if (!existing && list) {
      const msg = document.createElement("p");
      msg.id = "blog-empty-msg";
      msg.className = "term-empty";
      msg.textContent = "// no posts match your query";
      list.appendChild(msg);
    }
  } else {
    existing?.remove();
  }
}

searchInput?.addEventListener("input", filter);

tagBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tagBtns.forEach((b) => b.classList.remove("tag-btn--active"));
    btn.classList.add("tag-btn--active");
    activeTag = btn.dataset.tag || "all";
    filter();
  });
});

// live clock
function updateClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const clockEl = document.getElementById("sb-clock");
  const dateEl = document.getElementById("sb-date");
  if (clockEl) clockEl.textContent = `${hh}:${mm}:${ss}`;
  if (dateEl)
    dateEl.textContent = now.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
}
updateClock();
setInterval(updateClock, 1000);
