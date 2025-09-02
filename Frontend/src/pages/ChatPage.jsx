import React, { useEffect, useState } from 'react';
import ChatInterface from '../components/ChatInterface';
<<<<<<< HEAD
<<<<<<< HEAD
import { sendMessageToAI } from '../api/chatApi'; 
=======
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)
=======
import { sendMessageToAI } from '../api/chatApi'; // ✅ Make sure this exists
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
import '../index.css';

const ChatPage = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [chats, setChats] = useState([{ id: 1, messages: [] }]);
  const [currentChatId, setCurrentChatId] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleNewChat = () => {
    const newId = chats.length + 1;
    setChats(prev => [...prev, { id: newId, messages: [] }]);
    setCurrentChatId(newId);
  };

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
  const handleSendMessage = async (userText) => {
    const newUserMessage = { role: 'user', content: userText };
    const currentMessages = currentChat.messages;
    const updatedMessages = [...currentMessages, newUserMessage];

    updateMessages(updatedMessages);

    try {
      const aiReply = await sendMessageToAI(userText);
      const newAiMessage = { role: 'assistant', content: aiReply };
      updateMessages([...updatedMessages, newAiMessage]);
    } catch (err) {
      updateMessages([
        ...updatedMessages,
<<<<<<< HEAD
        { role: 'assistant', content: ' Error connecting to AI. Please try again.' },
=======
        { role: 'assistant', content: '⚠️ Error connecting to AI. Please try again.' },
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
      ]);
    }
  };

<<<<<<< HEAD
=======
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)
=======
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
  const updateMessages = (updatedMessages) => {
    setChats(prev =>
      prev.map(chat =>
        chat.id === currentChatId ? { ...chat, messages: updatedMessages } : chat
      )
    );
  };

  const currentChat = chats.find(chat => chat.id === currentChatId);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
<<<<<<< HEAD
      {/*  Background */}
      <div className="stars absolute top-0 left-0 w-full h-full z-0"></div>
      <div className="twinkling absolute top-0 left-0 w-full h-full z-0"></div>

      {/*  Welcome  */}
=======
      {/* ⭐ Background */}
      <div className="stars absolute top-0 left-0 w-full h-full z-0"></div>
      <div className="twinkling absolute top-0 left-0 w-full h-full z-0"></div>

      {/* 🌠 Welcome Text */}
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)
      {showIntro && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-4xl md:text-6xl font-extrabold z-20 animate-welcome text-transparent bg-clip-text bg-gradient-to-r from-[#FFB200] via-[#EB5B00] to-[#E52020]">
          WELCOME TO COSMICO
        </div>
      )}

<<<<<<< HEAD
      {/*   Chat Layout */}
=======
      {/* 💬 Main Chat Layout */}
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)
      {!showIntro && (
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 animate-fade-in">
          <div className="w-full max-w-6xl h-[90vh] rounded-3xl border border-white/10 bg-black/50 backdrop-blur-md shadow-xl flex overflow-hidden">
            
<<<<<<< HEAD
            {/*  Sidebar */}
=======
            {/* 🚀 Sidebar */}
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)
            <div className="w-[260px] bg-gradient-to-b from-[#1f1f1f]/80 to-[#2c2c2c]/60 border-r border-white/10 p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold mb-4 text-[#FFB200]">CosmicoBot</h2>
                <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                  {chats.map(chat => (
                    <div
                      key={chat.id}
                      onClick={() => setCurrentChatId(chat.id)}
                      className={`cursor-pointer text-sm px-3 py-2 rounded-lg ${
                        chat.id === currentChatId
                          ? "bg-[#3a3a3a] text-white font-medium"
                          : "hover:bg-[#2a2a2a] text-white/70"
                      }`}
                    >
                      Chat {chat.id}
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleNewChat}
                  className="mt-4 w-full text-sm py-1 rounded-md bg-[#FFB200]/10 hover:bg-[#FFB200]/20 text-[#FFB200] border border-[#FFB200]/50"
                >
                  + New Chat
                </button>
              </div>
              <div className="text-xs text-white/60 text-center mt-4">Log In</div>
            </div>

<<<<<<< HEAD
            {/*  Interface */}
=======
            {/* 💬 ChatInterface */}
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)
            <div className="flex-1 flex flex-col">
              <ChatInterface
                key={currentChat.id}
                messages={currentChat.messages}
                onUpdateMessages={updateMessages}
<<<<<<< HEAD
<<<<<<< HEAD
                onSendMessage={handleSendMessage} //   active
=======
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)
=======
                onSendMessage={handleSendMessage} // ✅ now active
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
