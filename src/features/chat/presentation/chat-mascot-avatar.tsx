import Image from "next/image";

import { cn } from "@/lib/utils";

type ChatMascotAvatarProps = {
  size?: "sm" | "md";
  className?: string;
  imageClassName?: string;
};

export function ChatMascotAvatar({
  size = "sm",
  className,
  imageClassName,
}: ChatMascotAvatarProps) {
  const isMedium = size === "md";

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/90 shadow-sm dark:bg-background/20",
        isMedium ? "h-10 w-10 p-1.5" : "h-8 w-8 p-1",
        className
      )}
    >
      <Image
        src="/images/wyatt.svg"
        alt=""
        width={isMedium ? 28 : 22}
        height={isMedium ? 27 : 21}
        className={cn(
          "object-contain",
          isMedium ? "h-7 w-7" : "h-5 w-5",
          imageClassName
        )}
        aria-hidden="true"
        unoptimized
      />
    </div>
  );
}
