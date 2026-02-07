import React from "react";
import Layout from "../../../components/Layout";
import { useAiChat } from "../hooks/useAiChat";
import ChatMessageBubble from "./ChatMessageBubble";
import ChatInput from "./ChatInput";

/**
 * @author HallTech AI
 * View principal do Assistente IA com UI refinada e responsiva.
 */
const AiView: React.FC = () => {
  const {
    messages,
    isLoading,
    inputText,
    setInputText,
    handleSendMessage,
    messagesEndRef
  } = useAiChat();

  // Sugestões rápidas para iniciar conversa
  const suggestions = [
    { icon: "fas fa-chart-pie", text: "Resumo financeiro" },
    { icon: "fas fa-list-check", text: "O que tenho pendente?" },
    { icon: "fas fa-glass-water", text: "Hidratação de hoje" },
    { icon: "fas fa-coins", text: "Posso gastar hoje?" },
  ];

  return (
    <Layout title="Ghz Assistente">
      {/* 
        Container Principal:
        h-[calc(100dvh-6rem)] para mobile (ajuste fino com a bottom nav)
      */}
      <div className="relative flex flex-col h-[calc(100dvh-6rem)] lg:h-[calc(100vh-6rem)] w-full max-w-full overflow-hidden rounded-[1.5rem] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm transition-all">
        
        {/* Chat Scroll Area 
            flex flex-col: Para permitir posicionamento das sugestões no rodapé
        */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-6 pt-6 pb-24 no-scrollbar relative z-10 scroll-smooth flex flex-col">
          
          {/* Disclaimer Header */}
          <div className="flex justify-center mb-8 opacity-60 flex-shrink-0">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800">
                <i className="fab fa-google text-slate-400 text-xs"></i>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    Gemini AI 3 Flash
                </span>
            </div>
          </div>

          {/* Messages Wrapper (pushes content down/up) */}
          <div className="flex-1 space-y-4">
            {messages.map((msg) => (
                <ChatMessageBubble key={msg.id} message={msg} />
            ))}

            {/* Loading Typing Indicator */}
            {isLoading && (
                <div className="flex justify-start w-full animate-pulse">
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 px-4 py-3 rounded-[1.5rem] rounded-tl-sm border border-slate-200 dark:border-slate-800">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-rose-400 rounded-full animate-bounce delay-150"></span>
                </div>
                </div>
            )}
          </div>

          {/* Quick Suggestions - Empurrados para baixo com mt-auto */}
          {!isLoading && messages.length < 5 && (
              <div className="mt-auto pt-8 pb-2 grid grid-cols-2 gap-2 max-w-lg mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                {suggestions.map((s) => (
                    <button
                        key={s.text}
                        onClick={() => handleSendMessage(s.text)}
                        className="flex items-center gap-3 px-3 py-3 bg-slate-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl text-left transition-all active:scale-95 group"
                    >
                        <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-colors flex-shrink-0">
                            <i className={`${s.icon} text-xs`}></i>
                        </div>
                        <span className="text-[10px] md:text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white leading-tight">
                            {s.text}
                        </span>
                    </button>
                ))}
              </div>
          )}
          
          <div ref={messagesEndRef} className="h-1 flex-shrink-0" />
        </div>

        {/* Input Area */}
        <ChatInput 
            value={inputText}
            onChange={setInputText}
            onSend={() => handleSendMessage()}
            isLoading={isLoading}
        />
        
      </div>
    </Layout>
  );
};

export default AiView;