
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => 
    document.documentElement.classList.contains('dark')
  );

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Layout title="Ajustes">
      <div className="space-y-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
            <i className="fas fa-user text-2xl text-indigo-600 dark:text-indigo-400"></i>
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-800 dark:text-white">Usuário Exemplo</h3>
            <p className="text-sm text-slate-400">Plano Pro</p>
          </div>
          <button className="ml-auto text-slate-300">
            <i className="fas fa-edit"></i>
          </button>
        </div>

        {/* General Settings */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="p-4 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                <i className="fas fa-moon"></i>
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-200">Modo Escuro</span>
            </div>
            <button 
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${isDarkMode ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>

          <button className="w-full p-4 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between active:bg-slate-50 dark:active:bg-slate-800 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                <i className="fas fa-bell"></i>
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-200">Notificações</span>
            </div>
            <i className="fas fa-chevron-right text-slate-300 text-xs"></i>
          </button>

          <button className="w-full p-4 flex items-center justify-between active:bg-slate-50 dark:active:bg-slate-800 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                <i className="fas fa-shield-halved"></i>
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-200">Segurança</span>
            </div>
            <i className="fas fa-chevron-right text-slate-300 text-xs"></i>
          </button>
        </div>

        {/* Account Settings */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
          <button 
            onClick={() => navigate('/login')}
            className="w-full p-4 flex items-center gap-3 text-rose-500 font-bold active:bg-rose-50 dark:active:bg-rose-950/20 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center">
              <i className="fas fa-sign-out-alt"></i>
            </div>
            Sair da Conta
          </button>
        </div>

        <div className="text-center py-4">
          <p className="text-[10px] font-bold text-slate-300 dark:text-slate-700 uppercase tracking-widest">LifeFlow v1.0.4</p>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
