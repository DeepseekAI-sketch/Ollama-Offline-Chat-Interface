import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: string;
  isAi?: boolean;
  modelName?: string;
  timestamp?: string;
}

const MessageBubble = ({
  message = "Hello! How can I help you today?",
  isAi = true,
  modelName = "Llama 3.3",
  timestamp = "12:00 PM",
}: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        "flex gap-4 p-4 w-full bg-background",
        isAi ? "justify-start" : "justify-end",
      )}
    >
      {isAi && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=llm" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "flex flex-col max-w-[70%]",
          isAi ? "items-start" : "items-end",
        )}
      >
        {isAi && (
          <span className="text-xs text-muted-foreground mb-1">
            {modelName}
          </span>
        )}
        <div
          className={cn(
            "rounded-lg p-3",
            isAi ? "bg-secondary" : "bg-primary text-primary-foreground",
          )}
        >
          <p className="text-sm">{message}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1">{timestamp}</span>
      </div>

      {!isAi && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
          <AvatarFallback>Me</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default MessageBubble;
