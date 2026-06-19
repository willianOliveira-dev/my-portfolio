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
    <div className="z-10 flex shrink-0 flex-col gap-2 border-t border-primary/10 bg-white/48 p-3 backdrop-blur-2xl dark:border-white/8 dark:bg-black/30">
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
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-full border border-primary/10 bg-white/80 p-1 shadow-[0_0.75rem_2rem_rgb(15_15_15/7%),inset_0_1px_0_rgb(255_255_255/85%)] backdrop-blur-xl dark:border-white/10 dark:bg-white/7 dark:shadow-[0_0.75rem_2rem_rgb(0_0_0/24%),inset_0_1px_0_rgb(255_255_255/7%)]"
      >
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder={m.chat_input_placeholder({}, { locale })}
          className="h-9 flex-1 border-none bg-transparent px-3 shadow-none placeholder:text-muted-foreground/75 focus-visible:ring-0"
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !input.trim()}
          className="size-9 shrink-0 rounded-full bg-primary text-primary-foreground shadow-[0_0.6rem_1.5rem_rgb(193_0_7/25%)] hover:bg-primary/90 disabled:shadow-none"
        >
          <SendHorizontal data-icon="inline-start" />
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
