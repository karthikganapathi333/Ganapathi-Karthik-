
import React from 'react';
import { Message, Sender } from '../types';

interface ChatMessageProps {
  message: Message;
}

const UserAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
    You
  </div>
);

const BotAvatar = () => (
    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h.5a1.5 1.5 0 010 3H14a1 1 0 00-1 1v1.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H9a1 1 0 001-1v-.5z" />
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" clipRule="evenodd" />
        </svg>
    </div>
);


export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === Sender.User;

  const messageAlignment = isUser ? 'justify-end' : 'justify-start';
  const bubbleColor = isUser ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-700 dark:text-gray-200 text-gray-800';
  const bubbleOrder = isUser ? 'order-1' : 'order-2';
  const avatarOrder = isUser ? 'order-2 ml-2' : 'order-1 mr-2';

  return (
    <div className={`flex items-start my-4 ${messageAlignment}`}>
      <div className={`${avatarOrder}`}>
        {isUser ? <UserAvatar /> : <BotAvatar />}
      </div>
      <div className={`px-4 py-3 rounded-lg shadow-md max-w-lg lg:max-w-2xl ${bubbleColor} ${bubbleOrder}`}>
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};
