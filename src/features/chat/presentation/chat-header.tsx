import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Minus } from "lucide-react";
import { ChatMascotAvatar } from "./chat-mascot-avatar";

export function ChatHeader() {
  return (
    <div className="relative z-10 flex shrink-0 items-center justify-between overflow-hidden rounded-none border-b border-white/20 bg-linear-to-r from-primary via-rose-600 to-amber-500 p-4 text-primary-foreground shadow-lg shadow-primary/10 sm:rounded-t-2xl">
      <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-black/10" />
      <div className="relative flex items-center gap-3">
        <ChatMascotAvatar
          size="md"
          className="border-border/70 bg-background/90 shadow-sm dark:border-white/15 dark:bg-background/25"
          imageClassName="dark:brightness-0 dark:invert"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-none tracking-wide">
            Wyatt
          </span>
        </div>
      </div>
      <DialogClose asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="relative size-8 shrink-0 rounded-full text-primary-foreground/85 hover:bg-white/20 hover:text-primary-foreground"
        >
          <Minus />
          <span className="sr-only">Minimizar chat</span>
        </Button>
      </DialogClose>
    </div>
  );
}
