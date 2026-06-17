import type {
  ChatCompletionStreamer,
  StreamChatCompletionInput,
} from "../ports/chat-completion-streamer";

export class StreamChatCompletion {
  constructor(private readonly chatCompletion: ChatCompletionStreamer) {}

  execute(input: StreamChatCompletionInput): Promise<Response> {
    return this.chatCompletion.stream(input);
  }
}
