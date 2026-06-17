import type { ChatModelKey } from "./application/chat-models";

export type Role = "user" | "assistant";

export type MessageTextPart = {
  type: "text";
  text: string;
  state?: "streaming" | "done";
};

export type Message = {
  id: string;
  role: Role;
  content: string;
  parts?: MessageTextPart[];
  createdAt?: Date;
};

export type UseChatOptions = {
  initialMessages?: Message[];
  isOpen?: boolean;
};

export type ChatModelOption = {
  value: ChatModelKey;
  label: string;
};
