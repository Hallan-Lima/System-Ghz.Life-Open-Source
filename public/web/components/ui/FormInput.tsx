import React from "react";

/**
 * @author HallTech AI
 * Props do componente FormInput.
 */
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  label: string;
  icon: string;
  as?: "input" | "select";
  children?: React.ReactNode;
}

/**
 * @author HallTech AI
 * Componente de Input/Select estilizado com ícone e label flutuante.
 * Pertence à camada de UI (Dumb Component).
 */
const FormInput: React.FC<FormInputProps> = ({
  label,
  icon,
  as = "input",
  children,
  ...props
}) => {
  return (
    <div className="space-y-1.5 group w-full">
      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1 transition-colors group-focus-within:text-indigo-500">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none">
          <i className={`${icon} text-sm`}></i>
        </div>
        {as === "select" ? (
          <select
            {...(props as any)}
            className="w-full pl-11 pr-4 py-3.5 bg-white/5 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-800 dark:text-white outline-none transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-300 dark:placeholder:text-slate-700 backdrop-blur-sm appearance-none"
          >
            {children}
          </select>
        ) : (
          <input
            {...(props as any)}
            className="w-full pl-11 pr-4 py-3.5 bg-white/5 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-800 dark:text-white outline-none transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-300 dark:placeholder:text-slate-700 backdrop-blur-sm"
          />
        )}
        {as === "select" && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <i className="fas fa-chevron-down text-xs"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormInput;