
import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Message, Sender } from './types';
import { sendMessageToGeminiStream } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-bot-message',
      text: "Hello! I'm CricBot, your AI cricket companion. Ask me anything about players, teams, matches, or the rules of the game!",
      sender: Sender.Bot,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
    });
  }, [messages]);

  const handleSendMessage = async (userMessageText: string) => {
    setIsLoading(true);
    setError(null);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: userMessageText,
      sender: Sender.User,
    };
    
    const botMessageId = `bot-${Date.now()}`;
    const botMessagePlaceholder: Message = {
        id: botMessageId,
        text: 'CricBot is thinking...',
        sender: Sender.Bot,
    };

    setMessages(prev => [...prev, userMessage, botMessagePlaceholder]);

    try {
      const stream = await sendMessageToGeminiStream(userMessageText);
      let botResponse = '';

      for await (const chunk of stream) {
        botResponse += chunk.text;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === botMessageId ? { ...msg, text: botResponse.trim() } : msg
          )
        );
      }
      if (botResponse === '') {
        setMessages(prev =>
            prev.map(msg =>
              msg.id === botMessageId ? { ...msg, text: "I'm not sure how to answer that. Could you ask me another cricket question?" } : msg
            )
          );
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      setMessages(prev =>
        prev.map(msg =>
          msg.id === botMessageId ? { ...msg, text: `Sorry, something went wrong. ${err.message}` } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 container mx-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {error && (
            <div className="flex justify-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
          )}
        </div>
      </main>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
