import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

const ChatBubble = ({ message, isBot, timestamp }) => {
  return (
    <div
      className={cn(
        "flex gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
        !isBot && "flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isBot
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>

      <div
        className={cn(
          "flex flex-col gap-1 max-w-[70%]",
          !isBot && "items-end"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 shadow-sm",
            isBot
              ? "bg-card text-card-foreground border border-border"
              : "bg-primary text-primary-foreground"
          )}
        >
          <p className="text-sm leading-relaxed">{message}</p>
        </div>

        {timestamp && (
          <span className="text-xs text-muted-foreground px-2">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
