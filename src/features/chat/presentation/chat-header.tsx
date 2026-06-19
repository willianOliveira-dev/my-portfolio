import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Minus } from "lucide-react";
import { ChatMascotAvatar } from "./chat-mascot-avatar";

export function ChatHeader() {
  return (
    <div className="relative z-10 flex shrink-0 items-center justify-between overflow-hidden rounded-none border-b border-primary/10 bg-white/72 p-4 text-foreground shadow-[0_1.5rem_3rem_rgb(193_0_7/8%),inset_0_1px_0_rgb(255_255_255/85%)] backdrop-blur-2xl dark:border-white/10 dark:bg-black/55 dark:text-white dark:shadow-[0_1.5rem_3rem_rgb(0_0_0/35%),inset_0_1px_0_rgb(255_255_255/8%)] sm:rounded-t-2xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/45 to-transparent dark:via-white/20" />
      <div className="pointer-events-none absolute right-[-3rem] top-[-5rem] size-40 rounded-full bg-primary/16 blur-3xl dark:bg-primary/22" />
      <div className="pointer-events-none absolute left-4 top-0 h-16 w-28 rounded-full bg-white/55 blur-2xl dark:bg-white/6" />
      <div className="relative flex items-center gap-3">
        <ChatMascotAvatar
          size="md"
          className="border-primary/20 bg-white/90 dark:border-white/15 dark:bg-white/10"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-none tracking-wide text-foreground dark:text-white">
            Wyatt
          </span>
          <span className="mt-1 flex items-center gap-1.5 text-[11px] font-medium leading-none text-muted-foreground dark:text-white/58">
            <span className="size-1.5 rounded-full bg-primary shadow-[0_0_0_3px_rgb(193_0_7/12%)]" />
            Assistente do Willian
          </span>
        </div>
      </div>
      <DialogClose asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="relative size-8 shrink-0 rounded-full text-foreground/65 hover:bg-primary/8 hover:text-foreground dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <Minus data-icon="inline-start" />
          <span className="sr-only">Minimizar chat</span>
        </Button>
      </DialogClose>
    </div>
  );
}
