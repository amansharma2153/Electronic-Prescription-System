import { useState, useRef, useEffect } from 'react';
import { askAI } from '../../services/aiService';

export default function ChatbotUI() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput('');
    setLoading(true);

    try {
      const res = await askAI(input);

      const botMessage = {
        sender: 'bot',
        text: res.reply || "Sorry, I couldn't understand."
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: "Error connecting to AI" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-blue-500 text-white p-4 text-lg font-semibold">
        AI Health Assistant
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <p className="text-sm text-gray-500">Bot is typing...</p>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <div className="p-4 bg-white flex gap-2 border-t">

        <input
          value={input}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          Send
        </button>

      </div>

    </div>
  );
}