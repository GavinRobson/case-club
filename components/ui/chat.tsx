'use client';

import { Divide, MessageSquareMore, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense, useState } from "react";
import getAiMessage from "@/data/open-ai";

const Chat = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('')
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

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
      const response = await getAiMessage(message);
      if (response?.choices[0].message.content === null || response?.choices[0].message.content === undefined) {
        setError('OOPSIE')
        return;
      };
      setMessages([...messages, message, response?.choices[0].message.content]);
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
            className="fixed w-1/4 h-1/2 bottom-5 right-5 bg-gray-600 rounded-md z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <X
              onClick={onClick}
              className="absolute text-black top-2 right-2 cursor-pointer hover:bg-white rounded-full transition-all"
            />
            <div 
              onClick={handleClear}
              className="absolute text-black top-2 left-2 h-auto p-2 rounded-full justify-center hover:bg-white cursor-pointer transition-all"
            >
              Clear
            </div>
            <h1 className="w-full h-auto text-2xl flex justify-center items-center p-2">Chat</h1>
            {error && <p className="text-red-500">{error}</p>}
            {messages && (
                <div className="flex flex-col space-y-2 overflow-y-auto h-2/3 p-6 rounded-lg max-h-full">
                  {messages.map((message, i) => (
                    <div className={`w-full ${i % 2 === 0 && 'justify-end'} flex`}>
                      <p className={`flex items-center w-auto h-auto p-4 text-black rounded-lg ${i % 2 === 0 ? 'text-white bg-gradient-to-b from-blue-400 to-blue-500' : 'text-white bg-gradient-to-b from-teal-400 to-teal-500'}`}>{message}</p>
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
