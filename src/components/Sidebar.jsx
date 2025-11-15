import React from "react";
import { Search, Trash2, MessageCircle } from "lucide-react";
import { formatTime } from "../utils/chatActions";

export function Sidebar({
  filteredContacts,
  selectedContact,
  onSelectContact,
  onDeleteChat,
  onClearAll,
  searchQuery,
  onSearchChange,
  loading,
}) {
  return (
    <div className="w-96 bg-white border-r border-gray-200 flex flex-col shadow-lg">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-emerald-600 to-teal-600 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <MessageCircle size={22} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">WhatsApp CRM</h1>
        </div>
        <button 
          onClick={onClearAll} 
          className="text-white/90 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200"
          title="Clear all messages"
        >
          <Trash2 size={20} />
        </button>
      </div>

  {/* Search */}
<div className="p-4 bg-gray-50 border-b border-gray-200">
  <div className="relative">
    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    <input
      type="text"
      placeholder="Cari kontak atau pesan..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
    />
  </div>
</div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto bg-white">
        {filteredContacts.length === 0 ? (
          <div className="p-8 text-center">
            <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 font-medium">
              {loading ? "Loading..." : "Belum ada pesan"}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              {loading ? "Memuat kontak..." : "Pesan akan muncul di sini"}
            </p>
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div
              key={contact.phone}
              className={`p-4 border-b border-gray-100 group cursor-pointer transition-all duration-200 flex justify-between items-start hover:bg-gray-50 ${
                selectedContact === contact.phone
                  ? "bg-emerald-50 border-l-4 border-l-emerald-500"
                  : ""
              }`}
            >
              <div
                onClick={() => onSelectContact(contact.phone)}
                className="flex-1 flex gap-3"
              >
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 shadow-sm">
                  {contact.name.charAt(0).toUpperCase()}
                </div>
                
                {/* Contact Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold text-gray-900 truncate">{contact.name}</p>
                    <span className="text-xs text-gray-500 ml-2">
                      {formatTime(contact.lastTime)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {contact.lastMessage}
                  </p>
                </div>
              </div>
              
              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(contact.phone);
                }}
                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 ml-2 p-1 hover:bg-red-50 rounded"
                title="Hapus chat"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}