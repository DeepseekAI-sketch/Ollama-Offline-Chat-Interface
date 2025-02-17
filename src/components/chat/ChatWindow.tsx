import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import MessageBubble from "./MessageBubble";

interface Message {
  id: string;
  content: string;
  isAi: boolean;
  modelName?: string;
  timestamp: string;
}

interface ChatWindowProps {
  messages?: Message[];
}

const ChatWindow = ({ messages = defaultMessages }: ChatWindowProps) => {
  return (
    <div className="h-full w-full bg-background border rounded-md">
      <ScrollArea className="h-full w-full p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.content}
              isAi={message.isAi}
              modelName={message.modelName}
              timestamp={message.timestamp}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

// Default messages for demonstration
const defaultMessages: Message[] = [
  {
    id: "1",
    content: "Hello! How can I help you today?",
    isAi: true,
    modelName: "Llama 3.3",
    timestamp: "12:00 PM",
  },
  {
    id: "2",
    content: "I'd like to learn about machine learning.",
    isAi: false,
    timestamp: "12:01 PM",
  },
  {
    id: "3",
    content:
      "Machine learning is a fascinating field of artificial intelligence that focuses on developing systems that can learn from and make decisions based on data. What specific aspects would you like to know about?",
    isAi: true,
    modelName: "Llama 3.3",
    timestamp: "12:02 PM",
  },
  {
    id: "4",
    content: "Can you explain neural networks?",
    isAi: false,
    timestamp: "12:03 PM",
  },
  {
    id: "5",
    content:
      "Neural networks are computing systems inspired by biological neural networks in human brains. They consist of layers of interconnected nodes (neurons) that process and transmit information. Would you like me to explain more about their architecture and how they work?",
    isAi: true,
    modelName: "Llama 3.3",
    timestamp: "12:04 PM",
  },
];

export default ChatWindow;
