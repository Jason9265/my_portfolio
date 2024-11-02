"use client";
import React, { useState } from "react";
import { MapPin, Paperclip, Smile, Send, X } from "lucide-react";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="fixed bottom-4 right-4 z-20 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[400px] h-[600px] bg-white rounded-lg shadow-xl flex flex-col mb-4 border">
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">TJ</span>
              </div>
              <h2 className="text-xl font-bold">Talk with Jason</h2>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="mb-2">
                👋 How can we help? We're usually online during office hours
                (CEST), but please feel free to write your message anytime.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p>
                Also consider checking our{" "}
                <span className="underline">Docs</span> and{" "}
                <span className="underline">Knowledge Base</span>.
              </p>
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="bg-gray-100 rounded-lg">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Say something..."
                className="w-full p-3 bg-transparent resize-none focus:outline-none"
                rows={1}
              />
              <div className="flex items-center justify-between px-3 pb-3">
                <div className="flex gap-2">
                  <button className="p-1 hover:bg-gray-200 rounded-full">
                    <MapPin size={20} />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded-full">
                    <Paperclip size={20} />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded-full">
                    <Smile size={20} />
                  </button>
                </div>
                <button className="text-gray-500">
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
          <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
            <span className="text-sm">JF</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatBox;
