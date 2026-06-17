import { motion } from "motion/react";
import { Streamdown } from "streamdown";
import "streamdown/styles.css";
import { cn } from "@/lib/utils";
import type { Message, MessageTextPart } from "../types";
import { ChatMascotAvatar } from "./chat-mascot-avatar";

type ChatMessageProps = {
  message: Message;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === "assistant";
  const textParts = getTextParts(message);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex w-full items-end gap-2",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && <ChatMascotAvatar />}

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isBot
            ? "bg-muted text-foreground rounded-bl-sm"
            : "bg-linear-to-r from-primary to-rose-600 text-primary-foreground rounded-br-sm"
        )}
      >
        {isBot ? (
          <div className="space-y-3">
            {textParts.map((part, index) => (
              <Streamdown key={`${message.id}-${index}`}>
                {part.text}
              </Streamdown>
            ))}
          </div>
        ) : (
          <span className="whitespace-pre-wrap">{message.content}</span>
        )}
      </div>
    </motion.div>
  );
}

function getTextParts(message: Message): MessageTextPart[] {
  if (message.parts?.length) {
    return message.parts;
  }

  return [
    {
      type: "text",
      text: message.content,
      state: "done",
    },
  ];
}
