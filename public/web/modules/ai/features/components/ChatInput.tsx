import React from "react";

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: (e?: React.FormEvent) => void;
  isLoading: boolean;
}

/**
 * @author HallTech AI
 * Área de input fixada na parte inferior do container de chat.
 */
const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend, isLoading }) => {
  return (
    <div className="absolute bottom-2 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="w-[90%] md:w-[75%] max-w-4xl pointer-events-auto">
        <form 
          onSubmit={onSend}
          className="relative flex items-end gap-2"
        >
          {/* Input Container */}
          <div className="flex-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.2rem] p-1.5 flex items-center transition-all focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500/50 shadow-sm">
            
            {/* Botão de Anexo */}
            <button type="button" className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-500 transition-colors">
                <i className="fas fa-plus text-sm"></i>
            </button>

            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-transparent px-2 py-3 outline-none text-slate-800 dark:text-white placeholder:text-slate-400 text-sm min-h-[44px]"
              disabled={isLoading}
            />
            
            {/* Send Button */}
            <button
                type="submit"
                disabled={!value.trim() || isLoading}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95 flex-shrink-0 ml-1 ${
                    !value.trim() || isLoading
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md'
                }`}
            >
                {isLoading ? (
                    <i className="fas fa-circle-notch animate-spin text-xs"></i>
                ) : (
                    <i className="fas fa-paper-plane text-xs"></i>
                )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;