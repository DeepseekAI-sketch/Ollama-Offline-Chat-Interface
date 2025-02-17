import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Mic, Paperclip, Send } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface MessageInputProps {
  onSendMessage?: (message: string) => void;
  onVoiceInput?: () => void;
  onFileAttach?: () => void;
  isProcessing?: boolean;
}

const MessageInput = ({
  onSendMessage = () => {},
  onVoiceInput = () => {},
  onFileAttach = () => {},
  isProcessing = false,
}: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileAttach();
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full p-4 border-t bg-background flex items-center gap-2">
      <div className="flex-1 flex items-center gap-2 rounded-lg bg-muted p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={handleFileClick}
              >
                <Paperclip className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Attach file</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Input
          className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={onVoiceInput}
              >
                <Mic className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Voice input</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Button
        onClick={handleSend}
        disabled={!message.trim() || isProcessing}
        className="h-11 w-11"
        size="icon"
      >
        <Send className="h-5 w-5" />
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default MessageInput;
