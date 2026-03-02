import React from "react";
import Layout from "@/shared/ui/layout/Layout";
import { useSettings } from "../hooks/useSettings";
import UserProfileCard from "./UserProfileCard";
import SettingsMenu from "./SettingsMenu";
import LogoutSection from "./LogoutSection";

/**
 * @author HallTech AI
 * View principal de Ajustes/Configurações.
 * Orquestra os componentes de perfil e menu.
 */
const SettingsView: React.FC = () => {
  const { user, isDarkMode, toggleDarkMode, handleLogout } = useSettings();

  return (
    <Layout title="Ajustes">
      <div className="space-y-6">
        <UserProfileCard user={user} />
        
        <SettingsMenu 
          isDarkMode={isDarkMode} 
          onToggleTheme={toggleDarkMode} 
        />
        
        <LogoutSection onLogout={handleLogout} />

        <div className="text-center py-4">
          <p className="text-[10px] font-bold text-slate-300 dark:text-slate-700 uppercase tracking-widest">
            LifeFlow v1.0.4
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsView;