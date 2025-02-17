import React, { useState } from "react";
import ModelParameters from "./chat/ModelParameters";
import ChatHeader from "./chat/ChatHeader";
import ChatWindow from "./chat/ChatWindow";
import MessageInput from "./chat/MessageInput";

interface Message {
  id: string;
  content: string;
  isAi: boolean;
  modelName?: string;
  timestamp: string;
}

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      isAi: true,
      modelName: "Llama 3.3",
      timestamp: "12:00 PM",
    },
  ]);

  const [currentModel, setCurrentModel] = useState("Llama 3.3");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleModelChange = (model: string) => {
    if (model === "online" || model === "offline") {
      setIsOnline(model === "online");
    } else {
      setCurrentModel(model);
    }
  };

  // Add network status event listeners
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parametersOpen, setParametersOpen] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);

  const handleSendMessage = (content: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content,
      isAi: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "This is a simulated AI response. The actual implementation would process the message through the selected LLM.",
        isAi: true,
        modelName: currentModel,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1000);
  };

  const handleVoiceInput = () => {
    // Placeholder for voice input functionality
    console.log("Voice input triggered");
  };

  const handleFileAttach = () => {
    // Placeholder for file attachment functionality
    console.log("File attachment triggered");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader
        isOnline={isOnline}
        currentModel={currentModel}
        onModelChange={handleModelChange}
        onOpenParameters={() => setParametersOpen(true)}
      />

      <main className="flex-1 container mx-auto p-4 pt-20 overflow-hidden">
        <div className="h-full flex flex-col gap-4">
          <ChatWindow messages={messages} />
          <MessageInput
            onSendMessage={handleSendMessage}
            onVoiceInput={handleVoiceInput}
            onFileAttach={handleFileAttach}
            isProcessing={isProcessing}
          />
        </div>
      </main>
      <ModelParameters
        open={parametersOpen}
        onOpenChange={setParametersOpen}
        temperature={temperature}
        onTemperatureChange={setTemperature}
        maxTokens={maxTokens}
        onMaxTokensChange={setMaxTokens}
      />
    </div>
  );
};

export default Home;
