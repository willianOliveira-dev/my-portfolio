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
        "flex w-full items-end gap-2.5",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && <ChatMascotAvatar />}

      <div
        className={cn(
          "max-w-[82%] rounded-[1.35rem] px-4 py-3 text-sm leading-relaxed shadow-sm",
          isBot
            ? "rounded-bl-md border border-primary/8 bg-white/78 text-foreground shadow-[0_0.75rem_2rem_rgb(15_15_15/7%),inset_0_1px_0_rgb(255_255_255/80%)] backdrop-blur-xl dark:border-white/8 dark:bg-white/7 dark:text-white/88 dark:shadow-[0_0.75rem_2rem_rgb(0_0_0/25%),inset_0_1px_0_rgb(255_255_255/8%)]"
            : "rounded-br-md bg-linear-to-br from-primary via-red-600 to-rose-700 text-primary-foreground shadow-[0_0.9rem_2rem_rgb(193_0_7/22%)]"
        )}
      >
        {isBot ? (
          <div className="flex flex-col gap-3">
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
