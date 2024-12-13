'use client';

import { MessageSquareMore, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import getAiMessage from "@/data/open-ai";

type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
}

const Chat = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('')
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const onClick = () => {
    setModalOpen(!modalOpen);
  };

  const handleClear = () => {
    setMessages([]);
    setMessage('');
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setloading(true);
    setError('');

    try {
      const response = await getAiMessage([...messages, {role: 'user', content: message}]);
      if (response?.choices[0].message.content === null || response?.choices[0].message.content === undefined) {
        setError('OOPSIE')
        return;
      };
      setMessages([...messages, {role: 'user', content: message}, {role: 'assistant', content: response?.choices[0].message.content}]);
      console.log(response?.choices[0].message.content)
    } catch (error: any) {
      setError(error)
    } finally {
      setMessage('')
      setloading(false);
    }
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {modalOpen ? (
          <motion.div
            key="chat-modal"
            className="fixed md:w-1/4 w-3/4 h-1/2 bottom-5 right-5 bg-[#2B3A67] rounded-md z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-row items-center justify-between">
              <div 
                onClick={handleClear}
                className=" text-[#F0EDE5] hover:text-[#a19f9a] h-auto m-4 justify-center cursor-pointer transition-all"
                >
                Clear
              </div>
              <h1 className="h-auto text-2xl flex justify-center items-center p-2 text-[#F0EDE5]">
                Chat
              </h1>
              <X
                onClick={onClick}
                className=" text-[#F0EDE5] m-4 cursor-pointer hover:bg-white/10 hover:text-[#a19f9a] rounded-full transition-all"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {messages && (
                <div className="flex flex-col space-y-2 overflow-y-auto h-2/3 p-6 rounded-lg max-h-full">
                  {messages.map((message) => (
                    <div className={`w-full ${message.role === 'user' && 'justify-end'} flex`}>
                      <p className={`flex items-center w-auto h-auto p-4 text-black rounded-lg shadow-sm border ${message.role === 'user' ? 'text-white bg-gradient-to-b from-emerald-400 to-emerald-500 border-emerald-600' : 'text-white bg-gradient-to-b from-gray-600 to-gray-700 border-gray-800'}`}>{message.content}</p>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex items-center w-1/4 h-auto p-4 bg-gray-500 text-black rounded-lg">...</div>
                  )}
                </div>
            )}
            <form onSubmit={handleSubmit} className="fixed flex bottom-0 flex-col space-y-4 p-4 w-full">
              <input 
                type="text"
                value={message}
                onChange={handleInputChange}
                className="p-2 border rounded-md text-black"
                placeholder="Chat with AI..."
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
              >
                {loading ? "Loading..." : "Send"}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.button
            key="chat-button"
            className="fixed bottom-5 right-5 flex items-center justify-center bg-blue-500 hover:bg-blue-600 w-[60px] h-[60px] rounded-full transition-all z-50"
            onClick={onClick}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <MessageSquareMore size={30} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chat;
