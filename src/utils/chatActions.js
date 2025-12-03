export async function handleSendReply(
  replyText,
  selectedContact,
  setReplyText
) {
  if (!replyText.trim() || !selectedContact) return;

  try {
    const response = await fetch(
      "https://whatsapp-webhook-vercel-two.vercel.app/api/send-message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_API_KEY_SECRET,
        },
        body: JSON.stringify({
          to: selectedContact,
          message: replyText,
        }),
      }
    );

    if (!response.ok) {
      alert("Gagal mengirim pesan");
      return;
    }

    setReplyText(""); // Clear input
    console.log("✅ Pesan terkirim!");
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan");
  }
}

export function clearAllMessages(
  setMessages,
  setContacts,
  setSelectedContact,
  selectedContactRef
) {
  if (window.confirm("Hapus semua pesan?")) {
    setMessages([]);
    setContacts([]);
    setSelectedContact(null);
    selectedContactRef.current = null;
    localStorage.removeItem("whatsapp-messages");
  }
}

export function deleteChat(
  phone,
  contacts,
  selectedContact,
  messages,
  setMessages,
  setContacts,
  setSelectedContact,
  selectedContactRef
) {
  if (
    window.confirm(
      `Hapus chat dengan ${contacts.find((c) => c.phone === phone)?.name}?`
    )
  ) {
    const updatedMessages = messages.filter((m) => m.from !== phone);
    setMessages(updatedMessages);
    localStorage.setItem("whatsapp-messages", JSON.stringify(updatedMessages));

    const updatedContacts = contacts.filter((c) => c.phone !== phone);
    setContacts(updatedContacts);

    if (selectedContact === phone) {
      const newSelected =
        updatedContacts.length > 0 ? updatedContacts[0].phone : null;
      setSelectedContact(newSelected);
      selectedContactRef.current = newSelected;
    }
  }
}

export function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
