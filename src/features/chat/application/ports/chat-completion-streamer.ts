import type { UIMessage } from "ai";

import type { ChatModelKey } from "../chat-models";

export type StreamChatCompletionInput = {
  messages: UIMessage[];
  model: ChatModelKey;
};

export interface ChatCompletionStreamer {
  stream(input: StreamChatCompletionInput): Promise<Response>;
}
