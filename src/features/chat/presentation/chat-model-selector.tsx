import { BrainCircuit, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentLocale } from "@/hooks/use-current-locale";
import * as m from "@/paraglide/messages";

import type { ChatModelKey } from "../application/chat-models";
import type { ChatModelOption } from "../types";

type ChatModelSelectorProps = {
  model: ChatModelKey;
  options: readonly ChatModelOption[];
  onModelChange: (model: ChatModelKey) => void;
};

export function ChatModelSelector({
  model,
  options,
  onModelChange,
}: ChatModelSelectorProps) {
  const { locale } = useCurrentLocale();
  const selectedModel = options.find((option) => option.value === model);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 shrink-0 gap-2 rounded-full border-primary/10 bg-white/72 px-3 text-xs shadow-sm backdrop-blur-xl hover:bg-white dark:border-white/10 dark:bg-white/7 dark:hover:bg-white/12"
          aria-label={m.chat_model_label({}, { locale })}
        >
          <BrainCircuit data-icon="inline-start" />
          <span className="font-medium text-foreground dark:text-white/88">
            {selectedModel?.label}
          </span>
          <ChevronDown data-icon="inline-end" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-44 border-primary/10 bg-white/90 backdrop-blur-2xl dark:border-white/10 dark:bg-black/85"
      >
        <DropdownMenuLabel>
          {m.chat_model_label({}, { locale })}
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={model}
          onValueChange={(value) => onModelChange(value as ChatModelKey)}
        >
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
