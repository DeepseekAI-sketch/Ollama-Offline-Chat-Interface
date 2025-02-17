import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { WifiOff, Wifi, Settings2 } from "lucide-react";
import { Button } from "../ui/button";

interface ChatHeaderProps {
  isOnline?: boolean;
  currentModel?: string;
  availableModels?: string[];
  onModelChange?: (model: string) => void;
  onOpenParameters?: () => void;
}

const ChatHeader = ({
  isOnline = true,
  currentModel = "Llama 3.3",
  availableModels = ["Llama 3.3", "DeepSeek-R1", "Mistral-7B", "Phi-2"],
  onModelChange = () => {},
  onOpenParameters = () => {},
}: ChatHeaderProps) => {
  return (
    <div className="w-full h-16 border-b bg-background flex items-center justify-between px-4 fixed top-0 left-0 right-0">
      <div className="flex items-center gap-2">
        <Select value={currentModel} onValueChange={onModelChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            {availableModels.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onOpenParameters}
                className="h-9 w-9"
              >
                <Settings2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Model Parameters</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="p-0"
              onClick={() => onModelChange(isOnline ? "offline" : "online")}
            >
              <Badge
                variant={isOnline ? "default" : "destructive"}
                className="flex items-center gap-2"
              >
                {isOnline ? (
                  <>
                    <Wifi className="h-3 w-3" />
                    <span>Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-3 w-3" />
                    <span>Offline</span>
                  </>
                )}
              </Badge>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>System Status</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ChatHeader;
