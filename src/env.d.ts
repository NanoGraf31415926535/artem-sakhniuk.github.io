/// <reference types="astro/client" />

declare const puter: {
  ai: {
    chat: (
      prompt: string,
      options?: {
        model?: string;
        temperature?: number;
        max_tokens?: number;
      }
    ) => Promise<string>;
  };
};
