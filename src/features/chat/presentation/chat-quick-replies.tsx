import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { useCurrentLocale } from "@/hooks/use-current-locale";
import * as m from "@/paraglide/messages";

type ChatQuickRepliesProps = {
  onSelect: (value: string) => void;
};

export function ChatQuickReplies({ onSelect }: ChatQuickRepliesProps) {
  const { locale } = useCurrentLocale();

  const replies = [
    m.chat_quick_reply_about({}, { locale }),
    m.chat_quick_reply_services({}, { locale }),
    m.chat_quick_reply_contact({}, { locale }),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex flex-wrap gap-2 px-2 pb-2 sm:px-4"
    >
      {replies.map((reply) => (
        <Badge
          key={reply}
          variant="outline"
          className="cursor-pointer rounded-full border-primary/14 bg-white/62 px-3 py-1.5 font-normal text-foreground shadow-sm backdrop-blur-xl transition-colors hover:bg-primary/8 hover:text-primary dark:border-white/10 dark:bg-white/7 dark:text-white/78 dark:hover:bg-white/12 dark:hover:text-white"
          onClick={() => onSelect(reply)}
        >
          {reply}
        </Badge>
      ))}
    </motion.div>
  );
}
