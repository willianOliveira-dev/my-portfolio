import type { UIMessage } from "ai";
import { z } from "zod";

import { chatModelKeySchema } from "./chat-models";

const chatRoleSchema = z.enum(["user", "assistant"]);

const legacyChatMessageSchema = z
  .object({
    id: z.string().optional(),
    role: chatRoleSchema,
    content: z.string().trim().min(1).max(4_000),
  })
  .passthrough();

const uiChatMessageSchema = z
  .object({
    id: z.string().min(1),
    role: chatRoleSchema,
    parts: z.array(z.unknown()).min(1),
  })
  .passthrough();

export const chatCompletionRequestSchema = z
  .object({
    messages: z
      .array(z.union([uiChatMessageSchema, legacyChatMessageSchema]))
      .min(1)
      .max(30),
    model: chatModelKeySchema.optional(),
  })
  .passthrough();

export type ChatCompletionRequest = z.infer<
  typeof chatCompletionRequestSchema
>;

export function normalizeChatMessages(
  messages: ChatCompletionRequest["messages"]
): UIMessage[] {
  return messages.map((message, index) => {
    if ("parts" in message) {
      return message as UIMessage;
    }

    return {
      id: message.id ?? `message-${index}`,
      role: message.role,
      parts: [
        {
          type: "text",
          text: message.content,
        },
      ],
    } satisfies UIMessage;
  });
}
