import React from "react";
import { ChatMessage } from "../ai.types";

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

/**
 * @author HallTech AI
 * Bolha de mensagem refinada (User vs AI).
 */
const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message }) => {
  const isAi = message.sender === 'ai';

  return (
    <div 
      className={`flex w-full mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500 ${isAi ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex max-w-[90%] md:max-w-[75%] gap-3 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar */}
        <div className={`w-9 h-9 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-md ${
            isAi 
              ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' 
              : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
        }`}>
          {isAi ? (
             <i className="fas fa-sparkles text-sm"></i>
          ) : (
             <i className="fas fa-user text-sm"></i>
          )}
        </div>

        {/* Bubble Content */}
        <div className="flex flex-col gap-1">
            <div className={`px-5 py-4 shadow-sm text-sm leading-7 whitespace-pre-wrap relative ${
                isAi 
                ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-200 rounded-[1.5rem] rounded-tl-sm border border-white/50 dark:border-slate-700' 
                : 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-[1.5rem] rounded-tr-sm shadow-indigo-500/20'
            }`}>
            {message.text}
            </div>
            
            {/* Timestamp */}
            <span className={`text-[10px] font-bold text-slate-400 dark:text-slate-600 px-1 ${isAi ? 'text-left' : 'text-right'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
        </div>

      </div>
    </div>
  );
};

export default ChatMessageBubble;