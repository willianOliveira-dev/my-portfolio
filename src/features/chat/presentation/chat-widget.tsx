"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHeader } from "./chat-header";
import { ChatMascotAvatar } from "./chat-mascot-avatar";
import { ChatMessage } from "./chat-message";
import { ChatTypingIndicator } from "./chat-typing-indicator";
import { ChatInput } from "./chat-input";
import { ChatQuickReplies } from "./chat-quick-replies";
import { useChat } from "../hooks/use-chat";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    isResponseStreaming,
    append,
    selectedModel,
    setSelectedModel,
    modelOptions,
    error,
  } = useChat({ isOpen });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleQuickReply = (text: string) => {
    append({ role: "user", content: text });
  };

  const showQuickReplies = messages.length === 2 && !isLoading;
  const isAssistantStreaming =
    isResponseStreaming && messages[messages.length - 1]?.role === "assistant";
  const visibleMessages = isAssistantStreaming ? messages.slice(0, -1) : messages;

  return (
    <Dialog modal={false} open={isOpen} onOpenChange={setIsOpen}>
      {!isOpen && (
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="fixed right-4 bottom-4 z-50 size-[3.75rem] rounded-full border border-primary/15 bg-white/80 text-primary shadow-[0_1.25rem_3rem_rgb(193_0_7/20%),inset_0_1px_0_rgb(255_255_255/85%)] backdrop-blur-2xl transition-all hover:scale-105 hover:bg-white hover:shadow-[0_1.5rem_3.5rem_rgb(193_0_7/28%),inset_0_1px_0_rgb(255_255_255/95%)] dark:border-white/10 dark:bg-black/72 dark:text-white dark:shadow-[0_1.25rem_3rem_rgb(0_0_0/45%),inset_0_1px_0_rgb(255_255_255/10%)] dark:hover:bg-black/86 sm:right-6 sm:bottom-6"
          >
            <span className="absolute inset-1 rounded-full bg-primary/8 dark:bg-white/8" />
            <ChatMascotAvatar
              size="md"
              className="relative border-none bg-transparent p-1 shadow-none dark:bg-transparent dark:shadow-none"
            />
            <span className="sr-only">Abrir chat</span>
          </Button>
        </DialogTrigger>
      )}

      <DialogContent
        showCloseButton={false}
        overlayClassName="pointer-events-none bg-transparent backdrop-blur-none"
        className="inset-x-0 bottom-0 top-auto left-0 flex h-dvh w-dvw max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-primary/12 bg-white/82 p-0 text-foreground shadow-[0_2rem_6rem_rgb(15_15_15/20%),0_0_0_1px_rgb(255_255_255/55)_inset] backdrop-blur-2xl dark:border-white/10 dark:bg-black/72 dark:text-white dark:shadow-[0_2rem_6rem_rgb(0_0_0/55%),0_0_0_1px_rgb(255_255_255/8)_inset] sm:inset-auto sm:right-6 sm:bottom-6 sm:left-auto sm:top-auto sm:h-[33rem] sm:max-h-[calc(100vh-8rem)] sm:w-[26rem] sm:max-w-none sm:rounded-2xl"
        onInteractOutside={(event) => event.preventDefault()}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <DialogTitle className="sr-only">Chat com Wyatt</DialogTitle>
        <DialogDescription className="sr-only">
          Assistente de IA para conversas sobre Willian Oliveira, projetos e
          servicos digitais.
        </DialogDescription>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/34%),transparent_32%,rgb(193_0_7/5%)_100%)] dark:bg-[linear-gradient(180deg,rgb(255_255_255/7%),transparent_38%,rgb(193_0_7/10%)_100%)]" />
        <div className="pointer-events-none absolute right-[-7rem] top-10 size-72 rounded-full bg-primary/12 blur-[92px] dark:bg-primary/16" />
        <div className="pointer-events-none absolute bottom-[-6rem] left-[-6rem] size-64 rounded-full bg-rose-600/10 blur-[86px] dark:bg-rose-600/16" />

        <ChatHeader />

        <ScrollArea className="z-10 min-h-0 flex-1 bg-transparent">
          <div className="flex flex-col gap-4 p-3.5 sm:p-4">
            {visibleMessages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {isLoading && <ChatTypingIndicator />}

            {showQuickReplies && <ChatQuickReplies onSelect={handleQuickReply} />}
            {error ? (
              <p className="px-2 text-xs leading-snug text-destructive">
                {error.message}
              </p>
            ) : null}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          selectedModel={selectedModel}
          modelOptions={modelOptions}
          onModelChange={setSelectedModel}
        />
      </DialogContent>
    </Dialog>
  );
}
