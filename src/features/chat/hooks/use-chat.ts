"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useChat as useAiChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";

import { useCurrentLocale } from "@/hooks/use-current-locale";
import * as m from "@/paraglide/messages";

import {
  DEFAULT_CHAT_MODEL,
  chatModelOptions,
  type ChatModelKey,
} from "../application/chat-models";
import type { Message, MessageTextPart, UseChatOptions } from "../types";

export function useChat(options?: UseChatOptions) {
  const { locale } = useCurrentLocale();
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] =
    useState<ChatModelKey>(DEFAULT_CHAT_MODEL);
  const [isOnboardingLoading, setIsOnboardingLoading] = useState(false);
  const hasStartedOnboarding = useRef(false);
  const hasCompletedOnboarding = useRef(false);
  const currentLocale = useRef(locale);

  useEffect(() => {
    currentLocale.current = locale;
  }, [locale]);

  const initialMessages = useMemo(
    () => options?.initialMessages?.map(toUIMessage) ?? [],
    [options?.initialMessages]
  );

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
      }),
    []
  );

  const {
    messages: aiMessages,
    setMessages: setAiMessages,
    sendMessage,
    status,
    error,
    clearError,
  } = useAiChat({
    messages: initialMessages,
    transport,
  });

  const messages = useMemo(
    () => aiMessages.map(toPresentationMessage).filter(isVisibleMessage),
    [aiMessages]
  );

  const isLoading =
    (Boolean(options?.isOpen) && isOnboardingLoading) ||
    status === "submitted" ||
    status === "streaming";
  const isResponseStreaming = status === "streaming";

  useEffect(() => {
    if (options?.initialMessages?.length) return;
    if (!options?.isOpen) return;
    if (hasStartedOnboarding.current) return;

    hasStartedOnboarding.current = true;
    let isCancelled = false;

    const wait = (ms: number) =>
      new Promise((resolve) => window.setTimeout(resolve, ms));

    const startOnboarding = async () => {
      await wait(250);
      if (isCancelled) return;

      setIsOnboardingLoading(true);
      await wait(700);
      if (isCancelled) return;

      setAiMessages((prev) =>
        upsertAssistantMessage(
          prev,
          "onboarding-1",
          m.chat_greeting({}, { locale: currentLocale.current })
        )
      );

      await wait(250);
      if (isCancelled) return;

      setIsOnboardingLoading(true);
      await wait(900);
      if (isCancelled) return;

      setAiMessages((prev) =>
        upsertAssistantMessage(
          prev,
          "onboarding-2",
          m.chat_onboarding_help({}, { locale: currentLocale.current })
        )
      );

      setIsOnboardingLoading(false);
      hasCompletedOnboarding.current = true;
    };

    startOnboarding();

    return () => {
      isCancelled = true;
      if (!hasCompletedOnboarding.current) {
        hasStartedOnboarding.current = false;
      }
    };
  }, [options?.initialMessages, options?.isOpen, setAiMessages]);

  useEffect(() => {
    if (options?.initialMessages?.length) return;
    if (!hasStartedOnboarding.current) return;

    setAiMessages((prev) =>
      prev.map((message) => {
        if (message.id === "onboarding-1") {
          return createAssistantMessage(
            "onboarding-1",
            m.chat_greeting({}, { locale })
          );
        }

        if (message.id === "onboarding-2") {
          return createAssistantMessage(
            "onboarding-2",
            m.chat_onboarding_help({}, { locale })
          );
        }

        return message;
      })
    );
  }, [options?.initialMessages, locale, setAiMessages]);

  const handleInputChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setInput(e.target.value);
    },
    []
  );

  const append = useCallback(
    async (message: Omit<Message, "id" | "createdAt">) => {
      if (!message.content.trim() || isLoading) return;

      clearError();

      await sendMessage(
        { text: message.content.trim() },
        { body: { model: selectedModel } }
      );
    },
    [clearError, isLoading, selectedModel, sendMessage]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!input.trim()) return;

      append({ role: "user", content: input });
      setInput("");
    },
    [input, append]
  );

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    isResponseStreaming,
    append,
    selectedModel,
    setSelectedModel,
    modelOptions: chatModelOptions,
    error,
  };
}

function toUIMessage(message: Message): UIMessage {
  return {
    id: message.id,
    role: message.role,
    parts: [
      {
        type: "text",
        text: message.content,
      },
    ],
  };
}

function createAssistantMessage(id: string, text: string): UIMessage {
  return {
    id,
    role: "assistant",
    parts: [
      {
        type: "text",
        text,
      },
    ],
  };
}

function upsertAssistantMessage(
  messages: UIMessage[],
  id: string,
  text: string
): UIMessage[] {
  const nextMessage = createAssistantMessage(id, text);
  const existingIndex = messages.findIndex((message) => message.id === id);

  if (existingIndex === -1) {
    return [...messages, nextMessage];
  }

  return messages.map((message, index) =>
    index === existingIndex ? nextMessage : message
  );
}

function toPresentationMessage(message: UIMessage): Message {
  const parts = message.parts.filter(isTextPart).map(toMessageTextPart);

  return {
    id: message.id,
    role: message.role === "user" ? "user" : "assistant",
    content: parts.map((part) => part.text).join(""),
    parts,
  };
}

function isVisibleMessage(message: Message): boolean {
  return message.content.trim().length > 0;
}

function isTextPart(
  part: UIMessage["parts"][number]
): part is Extract<UIMessage["parts"][number], { type: "text" }> {
  return part.type === "text";
}

function toMessageTextPart(
  part: Extract<UIMessage["parts"][number], { type: "text" }>
): MessageTextPart {
  return {
    type: "text",
    text: part.text,
    state: part.state,
  };
}
