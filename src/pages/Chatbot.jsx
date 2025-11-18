import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ChatBubble from "@/components/ChatBubble";
import { initWebSocket, sendMessage, closeWebSocket } from "@/websocket/chatSocket";
import { Send, Loader2 } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! I'm your health assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize WebSocket connection
    const handleMessage = (data) => {
      setIsTyping(false);
      const newMessage = {
        id: Date.now().toString(),
        text: data.message || data.text || "I received your message!",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newMessage]);
    };

    const handleError = () => {
      setIsConnected(false);
      toast({
        title: "Connection error",
        description: "Failed to connect to the chat server.",
        variant: "destructive",
      });
    };

    const handleOpen = () => {
      setIsConnected(true);
      toast({
        title: "Connected",
        description: "Chat is ready!",
      });
    };

    initWebSocket(handleMessage, handleError, handleOpen);

    return () => {
      closeWebSocket();
    };
  }, [toast]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    sendMessage(inputText);
    setInputText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 md:p-8 bg-gradient-to-br from-background to-accent/20">
      <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)]">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Health Assistant</h1>
            <p className="text-muted-foreground">Ask me anything about your health and wellness</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success' : 'bg-destructive'}`} />
            <span className="text-sm text-muted-foreground">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        <Card className="flex flex-col h-[calc(100%-5rem)] shadow-lg">
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message.text}
                isBot={message.isBot}
                timestamp={message.timestamp}
              />
            ))}

            {isTyping && (
              <div className="flex gap-3 mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-card text-card-foreground border border-border rounded-2xl px-4 py-2.5">
                  <p className="text-sm text-muted-foreground">Typing...</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-border p-4 bg-card">
            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 transition-all focus:ring-2 focus:ring-primary"
                disabled={!isConnected}
              />
              <Button
                onClick={handleSend}
                disabled={!inputText.trim() || !isConnected}
                size="icon"
                className="shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;
