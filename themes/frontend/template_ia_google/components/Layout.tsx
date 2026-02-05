import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const hideNav = location.pathname === '/login' || location.pathname === '/register';
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  // Desktop Sidebar Items
  const sidebarItems = [
    { to: '/', icon: 'fas fa-home', label: 'Home' },
    { to: '/finance', icon: 'fas fa-wallet', label: 'Finanças' },
    { to: '/health', icon: 'fas fa-heartbeat', label: 'Saúde' },
    { to: '/tasks', icon: 'fas fa-list-check', label: 'Tarefas' },
    { to: '/settings', icon: 'fas fa-gear', label: 'Ajustes' },
  ];

  // Mobile Bottom Nav Items (Left and Right of FAB)
  // We split them to render around the central button
  const mobileLeftItems = [
    { to: '/', icon: 'fas fa-home', label: 'Home' },
    { to: '/tasks', icon: 'fas fa-bars-staggered', label: 'Tarefas' }, // Representing "A definir" / Menu style
  ];

  const mobileRightItems = [
    { to: '/finance', icon: 'fas fa-wallet', label: 'Finanças' }, // Representing "A definir" / Menu style
    { to: '/health', icon: 'fas fa-chart-line', label: 'Evolução' }, // Representing "Evolução"
  ];

  if (hideNav) return <>{children}</>;

  const handleQuickAction = (action: string) => {
    console.log(`Action triggered: ${action}`);
    setShowQuickMenu(false);
    // Here you can add logic to open modals or navigate
    if (action === 'ai') navigate('/'); // Example: Go to dashboard for AI
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen sticky top-0 p-6 z-40">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
            <i className="fas fa-bolt"></i>
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 dark:text-white tracking-tighter">Ghz.Life</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">by HallTech</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => 
                `flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none' 
                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`
              }
            >
              <i className={`${item.icon} text-lg w-6`}></i>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <i className="fas fa-user text-indigo-600 dark:text-indigo-400"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800 dark:text-white truncate">Usuário HallTech</p>
              <p className="text-[10px] text-slate-400">Plano Premium</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header - Redesigned */}
      <header className="lg:hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 px-5 py-3 sticky top-0 z-30 flex justify-between items-center transition-all">
        
        {/* Left: Avatar (Click to Settings) */}
        <button 
          onClick={() => navigate('/settings')} 
          className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 active:scale-95 transition-all overflow-hidden"
        >
          <div className="w-full h-full flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
             <i className="fas fa-user text-sm"></i>
          </div>
        </button>

        {/* Center: Info Label */}
        <div className="flex flex-col items-center">
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-tight">Bem-vindo de volta</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <h1 className="text-sm font-black text-slate-800 dark:text-white tracking-tight leading-tight">
              Usuário Ghz
            </h1>
            <span className="text-sm animate-pulse">👋</span>
          </div>
        </div>

        {/* Right: Notifications */}
        <button className="w-11 h-11 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm active:scale-95 transition-all relative group">
          <i className="far fa-bell text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 transition-colors text-lg"></i>
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-800"></span>
        </button>

      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 lg:p-10 lg:pb-10 pb-28 transition-all">
        {children}
      </main>

      {/* Quick Menu Overlay (Backdrop) */}
      {showQuickMenu && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          onClick={() => setShowQuickMenu(false)}
        ></div>
      )}

      {/* Quick Menu Content */}
      <div className={`fixed bottom-24 left-4 right-4 z-40 lg:hidden transition-all duration-300 transform ${showQuickMenu ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'}`}>
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-2xl border border-slate-100 dark:border-slate-800 relative">
          
          {/* Triangle Pointer */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-900 rotate-45 border-b border-r border-slate-100 dark:border-slate-800"></div>

          <div className="grid grid-cols-4 gap-2">
            <button onClick={() => handleQuickAction('ai')} className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center text-xl shadow-sm group-active:scale-90 transition-transform">
                <i className="fas fa-heart-pulse"></i>
              </div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 text-center leading-tight">Sugestões IA</span>
            </button>

            <button onClick={() => handleQuickAction('explore')} className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 flex items-center justify-center text-xl shadow-sm group-active:scale-90 transition-transform">
                <i className="far fa-compass"></i>
              </div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 text-center leading-tight">Explorar</span>
            </button>

            <button onClick={() => handleQuickAction('bills')} className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center text-xl shadow-sm group-active:scale-90 transition-transform">
                <i className="fas fa-money-bill-wave"></i>
              </div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 text-center leading-tight">Contas</span>
            </button>

            <button onClick={() => handleQuickAction('calendar')} className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center text-xl shadow-sm group-active:scale-90 transition-transform">
                <i className="far fa-calendar-alt"></i>
              </div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 text-center leading-tight">Agenda</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 safe-bottom z-50 h-20 shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-5 h-full items-center px-2">
          
          {/* Left Items */}
          {mobileLeftItems.map((item) => (
            <NavLink 
              key={item.to}
              to={item.to} 
              className={({ isActive }) => `flex flex-col items-center justify-center h-full transition-all duration-300 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'}`}
            >
              <i className={`${item.icon} text-xl mb-1`}></i>
              <span className="text-[9px] font-bold tracking-wide">{item.label}</span>
            </NavLink>
          ))}

          {/* Central FAB */}
          <div className="relative -top-6 flex justify-center">
            <button 
              onClick={() => setShowQuickMenu(!showQuickMenu)}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-indigo-600/30 transition-all duration-300 transform ${showQuickMenu ? 'bg-slate-800 rotate-45' : 'bg-indigo-600 hover:scale-105 active:scale-95'}`}
            >
              <i className="fas fa-plus text-white text-xl"></i>
            </button>
          </div>

          {/* Right Items */}
          {mobileRightItems.map((item) => (
            <NavLink 
              key={item.to}
              to={item.to} 
              className={({ isActive }) => `flex flex-col items-center justify-center h-full transition-all duration-300 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'}`}
            >
              <i className={`${item.icon} text-xl mb-1`}></i>
              <span className="text-[9px] font-bold tracking-wide">{item.label}</span>
            </NavLink>
          ))}
          
        </div>
      </nav>

    </div>
  );
};

export default Layout;
