import React, { useState, useEffect } from "react";
import { Send, MessageCircle, Video, Phone, Info, Smile, Paperclip, Mic } from "lucide-react";
import { formatTime } from "../utils/chatActions";

export function ChatArea({
  selectedContact,
  contacts,
  selectedMessages,
  replyText,
  onReplyChange,
  onSendReply,
  messagesEndRef,
}) {
  const [autoScroll, setAutoScroll] = useState(true);

  const handleScroll = (e) => {
    const el = e.target;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
    setAutoScroll(isNearBottom);
  };

  useEffect(() => {
    if (autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedMessages]);

  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      {selectedContact ? (
        <>
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold backdrop-blur-sm">
                {contacts.find((c) => c.phone === selectedContact)?.name.charAt(0).toUpperCase()}
              </div>
              
              {/* Contact Info */}
              <div>
                <p className="font-semibold text-white">
                  {contacts.find((c) => c.phone === selectedContact)?.name}
                </p>
                <p className="text-xs text-white/80">{selectedContact}</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="text-white/90 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200">
                <Video size={20} />
              </button>
              <button className="text-white/90 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200">
                <Phone size={20} />
              </button>
              <button className="text-white/90 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200">
                <Info size={20} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            className="flex-1 overflow-y-auto p-6 chat-wallpaper"
            onScroll={handleScroll}
          >
            <div className="space-y-3">
              {selectedMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.direction === "outgoing"
                      ? "justify-end"
                      : "justify-start"
                  } message-animation`}
                >
                  <div
                    className={`max-w-[75%] ${
                      msg.direction === "outgoing"
                        ? "bubble-out-new"
                        : "bubble-in-new"
                    }`}
                  >
                    <p className="break-words text-sm leading-relaxed">{msg.text}</p>
                    <p className={`text-[10px] text-right mt-1 ${
                      msg.direction === "outgoing" ? "text-white/80" : "text-gray-500"
                    }`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex gap-3 items-center">
              <button className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 p-2 rounded-full transition-all duration-200">
                <Smile size={24} />
              </button>
              <button className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 p-2 rounded-full transition-all duration-200">
                <Paperclip size={24} />
              </button>
              
              <input
                type="text"
                value={replyText}
                onChange={(e) => onReplyChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSendReply()}
                placeholder="Ketik pesan..."
                className="flex-1 px-5 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm shadow-sm"
              />
              
              {replyText.trim() ? (
                <button
                  onClick={onSendReply}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white p-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Send size={20} />
                </button>
              ) : (
                <button className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 p-3 rounded-full transition-all duration-200">
                  <Mic size={20} />
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-2xl">
              <MessageCircle size={64} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">WhatsApp CRM</h2>
            <p className="text-gray-500">Pilih kontak untuk memulai percakapan</p>
          </div>
        </div>
      )}
    </div>
  );
}