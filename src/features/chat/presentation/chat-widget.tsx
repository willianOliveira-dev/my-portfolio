"use client";

import { useState, useRef, useEffect } from "react";
import { BotMessageSquare } from "lucide-react";
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
            className="fixed right-4 bottom-4 size-14 rounded-full border-none bg-linear-to-tr from-primary to-rose-600 text-primary-foreground shadow-2xl transition-all hover:scale-105 hover:shadow-primary/25 sm:right-6 sm:bottom-6"
          >
            <BotMessageSquare className="size-8" strokeWidth={2.25} />
            <span className="sr-only">Abrir chat</span>
          </Button>
        </DialogTrigger>
      )}

      <DialogContent
        showCloseButton={false}
        overlayClassName="pointer-events-none bg-transparent backdrop-blur-none"
        className="inset-x-0 bottom-0 top-auto left-0 flex h-dvh w-dvw max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-white/20 bg-background/85 p-0 text-foreground shadow-2xl backdrop-blur-2xl dark:border-white/10 sm:inset-auto sm:right-6 sm:bottom-6 sm:left-auto sm:top-auto sm:h-128 sm:max-h-[calc(100vh-8rem)] sm:w-96 sm:max-w-none sm:rounded-2xl sm:bg-background/60"
        onInteractOutside={(event) => event.preventDefault()}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <DialogTitle className="sr-only">Chat com Wyatt</DialogTitle>
        <DialogDescription className="sr-only">
          Assistente de IA para conversas sobre Willian Oliveira, projetos e
          servicos digitais.
        </DialogDescription>
        <div className="absolute top-0 right-0 h-64 w-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-48 w-48 bg-rose-600/10 blur-[80px] rounded-full pointer-events-none" />

        <ChatHeader />

        <ScrollArea className="flex-1 min-h-0 bg-transparent z-10">
          <div className="flex flex-col gap-4 p-3 sm:p-4">
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
