import { groq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText, type ProviderMetadata } from "ai";

import { chatModels } from "../../application/chat-models";
import { CHAT_SYSTEM_PROMPT } from "../../application/chat-prompt";
import type {
  ChatCompletionStreamer,
  StreamChatCompletionInput,
} from "../../application/ports/chat-completion-streamer";

const SERVER_ERROR_MESSAGE =
  "Não foi possivel gerar a resposta agora. Tente novamente em instantes.";

export class GroqChatCompletionStreamer implements ChatCompletionStreamer {
  async stream({
    messages,
    model,
  }: StreamChatCompletionInput): Promise<Response> {
    const result = streamText({
      model: groq(chatModels[model].id),
      system: CHAT_SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      temperature: 0.4,
      maxOutputTokens: 700,
      providerOptions: getGroqProviderOptions(model),
    });

    return result.toUIMessageStreamResponse({
      onError: () => SERVER_ERROR_MESSAGE,
    });
  }
}

function getGroqProviderOptions(
  model: StreamChatCompletionInput["model"]
): ProviderMetadata | undefined {
  if (model === "llama") {
    return undefined;
  }

  return {
    groq: {
      reasoningFormat: "hidden",
    },
  } satisfies ProviderMetadata;
}
