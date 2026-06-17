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
      className="flex flex-wrap gap-2 px-4 pb-2"
    >
      {replies.map((reply) => (
        <Badge
          key={reply}
          variant="outline"
          className="cursor-pointer hover:bg-muted/50 rounded-full py-1.5 px-3 font-normal"
          onClick={() => onSelect(reply)}
        >
          {reply}
        </Badge>
      ))}
    </motion.div>
  );
}
