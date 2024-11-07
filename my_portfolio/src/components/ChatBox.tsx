"use client";
import React, { useState, useEffect, useRef } from "react";
import { Smile, Send, X, MessageSquareMore } from "lucide-react";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';

interface Message {
  type: string;
  content: string;
  userId: string;
  userName?: string;
}

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket(WS_URL);

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prev => [...prev, data]);
    };

    return () => {
      wsRef.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && wsRef.current) {
      const messageObj: Message = {
        type: 'message',
        content: message,
        userId: 'self',
      };
      
      setMessages(prev => [...prev, messageObj]);
      
      wsRef.current.send(JSON.stringify({ content: message }));
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-20 flex flex-col items-end">
      {isOpen && (
        <div className="w-96 bg-white rounded-lg shadow-xl flex flex-col mb-4 border">
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">JF</span>
              </div>
              <h2 className="text-xl font-bold">Talk with Jason</h2>
            </div>
          </div>

          {/* Updated Chat Content */}
          <div className="flex-1 p-4 overflow-y-auto h-[400px]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg mb-4 ${
                  msg.type === 'welcome' || msg.type === 'system'
                    ? 'bg-gray-50'
                    : msg.userId === 'self'
                    ? 'bg-emerald-100 ml-auto'
                    : 'bg-gray-100'
                } ${msg.userId === 'self' ? 'max-w-[80%]' : 'max-w-[80%]'}`}
              >
                <p className="mb-2">{msg.content}</p>
              </div>
            ))}
          </div>

          {/* Updated Input Area */}
          <div className="border-t p-4">
            <div className="bg-gray-100 rounded-lg">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Say something..."
                className="w-full p-3 bg-transparent resize-none focus:outline-none"
                rows={1}
              />
              <div className="flex items-center justify-between px-3 pb-3">
                <div className="flex gap-2">
                  <button className="p-1 hover:bg-gray-200 rounded-full">
                    <Smile size={20} />
                  </button>
                </div>
                <button 
                  onClick={sendMessage}
                  className="text-gray-500 hover:text-emerald-600"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-700 transition-colors"
      >
        {isOpen ? (
          <X size={24} color="white" />
        ) : (
            <MessageSquareMore size={24} color="white" />
        )}
      </button>
    </div>
  );
};

export default ChatBox;
