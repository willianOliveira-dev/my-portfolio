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
        "flex shrink-0 items-center justify-center rounded-full border border-primary/15 bg-white/85 shadow-[0_0.75rem_2rem_rgb(193_0_7/12%),inset_0_1px_0_rgb(255_255_255/85%)] backdrop-blur-xl dark:border-white/12 dark:bg-white/8 dark:shadow-[0_0.75rem_2rem_rgb(0_0_0/35%),inset_0_1px_0_rgb(255_255_255/8%)]",
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
          "object-contain [filter:brightness(0)_saturate(100%)_invert(15%)_sepia(95%)_saturate(5430%)_hue-rotate(354deg)_brightness(88%)_contrast(112%)] dark:[filter:brightness(0)_invert(1)]",
          isMedium ? "h-7 w-7" : "h-5 w-5",
          imageClassName
        )}
        aria-hidden="true"
        unoptimized
      />
    </div>
  );
}
