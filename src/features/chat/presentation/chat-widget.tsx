"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { useCurrentLocale } from "@/hooks/use-current-locale";
import * as m from "@/paraglide/messages";
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
  const { locale } = useCurrentLocale();
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
  const messagesViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = messagesViewportRef.current?.querySelector<HTMLElement>(
      '[data-slot="scroll-area-viewport"]'
    );

    if (!viewport) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior: isOpen ? "smooth" : "auto",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [messages, isLoading, isOpen]);

  const handleQuickReply = (text: string) => {
    append({ role: "user", content: text });
  };

  const showQuickReplies = messages.length === 2 && !isLoading;
  const isAssistantStreaming =
    isResponseStreaming && messages[messages.length - 1]?.role === "assistant";
  const visibleMessages = isAssistantStreaming ? messages.slice(0, -1) : messages;
  const chatTriggerLabel = m.chat_trigger_label({}, { locale });

  return (
    <Dialog modal={false} open={isOpen} onOpenChange={setIsOpen}>
      {!isOpen && (
        <div className="group fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
          <span
            id="wyatt-chat-tooltip"
            role="tooltip"
            className="pointer-events-none absolute right-0 bottom-[calc(100%+0.75rem)] whitespace-nowrap rounded-full border border-primary/12 bg-white/88 px-3.5 py-2 text-xs font-semibold tracking-wide text-primary opacity-0 shadow-[0_0.9rem_2rem_rgb(193_0_7/16%),inset_0_1px_0_rgb(255_255_255/90%)] backdrop-blur-2xl transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:opacity-100 group-focus-within:-translate-y-1 group-focus-within:opacity-100 dark:border-white/10 dark:bg-black/82 dark:text-white dark:shadow-[0_0.9rem_2rem_rgb(0_0_0/40%),inset_0_1px_0_rgb(255_255_255/10%)]"
          >
            {chatTriggerLabel}
          </span>
          <div className="relative rounded-[1.15rem] p-0.5 transition-transform group-hover:scale-105 group-focus-within:scale-105">
            <BorderBeam
              size={116}
              duration={5}
              delay={2}
              borderWidth={1.5}
              containerClassName="opacity-90"
              className="from-transparent via-red-600 to-transparent dark:via-red-400"
            />
            <DialogTrigger asChild>
              <Button
                size="icon"
                aria-label={chatTriggerLabel}
                aria-describedby="wyatt-chat-tooltip"
                className="relative z-10 size-15 overflow-hidden rounded-[1rem] border border-primary/15 bg-white/80 text-primary shadow-[0_1.25rem_3rem_rgb(193_0_7/20%),inset_0_1px_0_rgb(255_255_255/85%)] backdrop-blur-2xl transition-all hover:bg-white hover:shadow-[0_1.5rem_3.5rem_rgb(193_0_7/28%),inset_0_1px_0_rgb(255_255_255/95%)] dark:border-white/10 dark:bg-black/72 dark:text-white dark:shadow-[0_1.25rem_3rem_rgb(0_0_0/45%),inset_0_1px_0_rgb(255_255_255/10%)] dark:hover:bg-black/86"
              >
                <span className="absolute inset-1 rounded-[0.8rem] bg-primary/8 dark:bg-white/8" />
                <ChatMascotAvatar
                  size="md"
                  className="relative z-10 border-none bg-transparent p-1 shadow-none dark:bg-transparent dark:shadow-none"
                />
                <span className="sr-only">{chatTriggerLabel}</span>
              </Button>
            </DialogTrigger>
          </div>
        </div>
      )}

      <DialogContent
        unstyled
        showCloseButton={false}
        overlayClassName="pointer-events-none bg-transparent backdrop-blur-none"
        className="fixed inset-x-0 bottom-0 z-50 flex h-dvh max-h-dvh w-dvw max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-primary/12 bg-white/82 p-0 text-foreground shadow-[0_2rem_6rem_rgb(15_15_15/20%),0_0_0_1px_rgb(255_255_255/55)_inset] outline-none backdrop-blur-2xl duration-100 data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0 dark:border-white/10 dark:bg-black/72 dark:text-white dark:shadow-[0_2rem_6rem_rgb(0_0_0/55%),0_0_0_1px_rgb(255_255_255/8)_inset] sm:inset-auto sm:right-6 sm:bottom-6 sm:h-132 sm:max-h-[calc(100dvh-3rem)] sm:w-104 sm:rounded-2xl sm:data-closed:zoom-out-95 sm:data-open:zoom-in-95"
        onInteractOutside={(event) => event.preventDefault()}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <DialogTitle className="sr-only">Chat com Wyatt</DialogTitle>
        <DialogDescription className="sr-only">
          Assistente de IA para conversas sobre Willian Oliveira, projetos e
          servicos digitais.
        </DialogDescription>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/34%),transparent_32%,rgb(193_0_7/5%)_100%)] dark:bg-[linear-gradient(180deg,rgb(255_255_255/7%),transparent_38%,rgb(193_0_7/10%)_100%)]" />
        <div className="pointer-events-none absolute -right-28 top-10 size-72 rounded-full bg-primary/12 blur-[92px] dark:bg-primary/16" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 size-64 rounded-full bg-rose-600/10 blur-[86px] dark:bg-rose-600/16" />
        <ChatHeader />

        <ScrollArea
          ref={messagesViewportRef}
          className="z-10 min-h-0 flex-1 basis-0 overflow-hidden bg-transparent"
        >
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
        <BorderBeam
          size={300}
          duration={5}
          delay={2}
          borderWidth={1.25}
          containerClassName="z-30"
          className="from-transparent via-red-600 to-transparent dark:via-red-500"
        />
      </DialogContent>
    </Dialog>
  );
}
