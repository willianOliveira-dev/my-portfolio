import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { SiteLogo } from "@/components/site-header/site-logo";
import { useCurrentLocale } from "@/hooks/use-current-locale";
import * as m from "@/paraglide/messages";

import type { ChatModelKey } from "../application/chat-models";
import type { ChatModelOption } from "../types";
import { ChatModelSelector } from "./chat-model-selector";

type ChatInputProps = {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  selectedModel: ChatModelKey;
  modelOptions: readonly ChatModelOption[];
  onModelChange: (model: ChatModelKey) => void;
};

export function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  selectedModel,
  modelOptions,
  onModelChange,
}: ChatInputProps) {
  const { locale } = useCurrentLocale();

  return (
    <div className="z-10 flex shrink-0 flex-col gap-1.5 border-t border-border/50 bg-transparent p-2.5">
      <div className="flex items-center justify-between gap-2">
        <ChatModelSelector
          model={selectedModel}
          options={modelOptions}
          onModelChange={onModelChange}
        />
        <p className="max-w-36 text-right text-[10px] leading-tight text-muted-foreground">
          {m.chat_model_notice({}, { locale })}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-1.5">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder={m.chat_input_placeholder({}, { locale })}
          className="h-9 flex-1 bg-transparent border-none px-0 shadow-none focus-visible:ring-0"
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !input.trim()}
          className="size-9 shrink-0 rounded-full"
        >
          <SendHorizontal />
          <span className="sr-only">Enviar mensagem</span>
        </Button>
      </form>
      <div className="pointer-events-none flex items-center justify-center gap-1 opacity-50">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {m.chat_powered_by({}, { locale })}
        </span>
        <div className="scale-50 origin-left -ml-2">
          <SiteLogo compact />
        </div>
      </div>
    </div>
  );
}
