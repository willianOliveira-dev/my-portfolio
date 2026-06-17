import { GroqChatCompletionStreamer } from "../adapters/outbound/groq-chat-completion-streamer";
import { StreamChatCompletion } from "../application/use-cases/stream-chat-completion";

export function buildStreamChatCompletion(): StreamChatCompletion {
  return new StreamChatCompletion(new GroqChatCompletionStreamer());
}
