import { createRequire } from "node:module";
import {
  convertToModelMessages,
  streamText,
  type LanguageModel,
  type ProviderMetadata,
} from "ai";

import { chatModels } from "../../application/chat-models";
import { CHAT_SYSTEM_PROMPT } from "../../application/chat-prompt";
import type {
  ChatCompletionStreamer,
  StreamChatCompletionInput,
} from "../../application/ports/chat-completion-streamer";

const SERVER_ERROR_MESSAGE =
  "Não foi possivel gerar a resposta agora. Tente novamente em instantes.";

const require = createRequire(import.meta.url);

type GroqModule = {
  groq: (modelId: string) => LanguageModel;
};

export class GroqChatCompletionStreamer implements ChatCompletionStreamer {
  async stream({
    messages,
    model,
  }: StreamChatCompletionInput): Promise<Response> {
    const result = streamText({
      model: getGroqModel(chatModels[model].id),
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

function getGroqModel(modelId: string): LanguageModel {
  const { groq } = require("@ai-sdk/groq") as GroqModule;

  return groq(modelId);
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
