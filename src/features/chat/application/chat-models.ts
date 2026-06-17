import { z } from "zod";

export const chatModels = {
  qwen: {
    id: "qwen/qwen3-32b",
    label: "Qwen",
  },
  llama: {
    id: "llama-3.3-70b-versatile",
    label: "Llama",
  },
  "gpt-oss-20b": {
    id: "openai/gpt-oss-20b",
    label: "GPT OSS 20B",
  },
} as const;

export type ChatModelKey = keyof typeof chatModels;

export const DEFAULT_CHAT_MODEL: ChatModelKey = "llama";

export const chatModelKeySchema = z.enum(
  Object.keys(chatModels) as [ChatModelKey, ...ChatModelKey[]]
);

export const chatModelOptions = Object.entries(chatModels).map(
  ([value, model]) => ({
    value: value as ChatModelKey,
    label: model.label,
  })
);
