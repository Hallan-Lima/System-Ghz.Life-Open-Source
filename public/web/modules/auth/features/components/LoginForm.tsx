import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "@/shared/ui/FormInput";
import { useAuth } from '@/modules/auth/features/hooks/useAuth';

interface LoginFormProps {
  onClose: () => void;
}

/**
 * @author HallTech AI
 * Formulário de Login (Overlay).
 */
const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 justify-center items-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>

      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-2xl relative z-10 border border-white/10 ring-1 ring-black/5 animate-in fade-in zoom-in duration-300">
        <div className="mb-8 text-center relative">
          <button
            onClick={onClose}
            className="absolute left-0 top-1 w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center active:scale-90 transition-all"
          >
            <i className="fas fa-arrow-left text-sm"></i>
          </button>
          <div className="space-y-1 pt-2">
            <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter">
              Login Ghz.Life
            </h3>
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
              Seja bem-vindo
            </p>
          </div>
        </div>

        {error && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-xs font-bold text-center">
                {error}
            </div>
        )}

        <form onSubmit={(e) => login(e, email, password)} className="space-y-5">
          <FormInput
            label="E-mail"
            icon="fas fa-envelope"
            type="email"
            placeholder="seu@ghz.life"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <FormInput
              label="Senha de Acesso"
              icon="fas fa-lock"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="button"
                className="absolute right-4 top-1/2 mt-1 text-slate-400 hover:text-indigo-500 transition-colors z-20"
                onClick={() => setShowPassword(!showPassword)}
            >
                 <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="button"
              className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
            >
              Esqueci minha senha
            </button>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 mt-4"
          >
            {loading ? (
              <i className="fas fa-spinner animate-spin"></i>
            ) : (
              "ACESSAR HUB"
            )}
          </button>
        </form>

        <div className="mt-8 text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 font-bold tracking-widest">
                ou conecte via
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-bold text-xs hover:bg-slate-50 transition-all">
              <i className="fab fa-google text-rose-500"></i> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-bold text-xs hover:bg-slate-50 transition-all">
              <i className="fab fa-apple text-slate-800 dark:text-white"></i>{" "}
              Apple
            </button>
          </div>

          <p className="text-xs text-slate-400 font-medium">
            Novo usuário?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-black hover:underline"
            >
              Criar conta grátis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;