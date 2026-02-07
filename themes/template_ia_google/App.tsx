
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ModulesProvider } from './features/modules/context/ModulesContext'; 
import { NotificationsProvider } from './features/notifications/context/NotificationsContext'; // Importação do Provider de Notificações
import DashboardPage from './pages/DashboardPage';
import FinancePage from './pages/FinancePage';
import TasksPage from './pages/TasksPage';
import TaskCreatorPage from './pages/TaskCreatorPage';
import HealthPage from './pages/HealthPage';
import AiPage from './pages/AiPage';
import ModulesPage from './pages/ModulesPage';
import MenuOrderingPage from './pages/MenuOrderingPage'; 
import SettingsPage from './pages/SettingsPage';
import EditProfilePage from './pages/EditProfilePage';
import NotificationsPage from './pages/NotificationsPage'; // Nova importação
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

const App: React.FC = () => {
  return (
    <ModulesProvider>
      <NotificationsProvider> {/* Wrapper de Notificações */}
        <Router>
          <div className="min-h-screen">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<DashboardPage />} />
              <Route path="/finance" element={<FinancePage />} />
              <Route path="/health" element={<HealthPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/tasks/new" element={<TaskCreatorPage />} />
              <Route path="/modules" element={<ModulesPage />} />
              <Route path="/modules/order" element={<MenuOrderingPage />} /> 
              <Route path="/ia" element={<AiPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/settings/profile" element={<EditProfilePage />} />
              <Route path="/notifications" element={<NotificationsPage />} /> {/* Nova Rota */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </NotificationsProvider>
    </ModulesProvider>
  );
};

export default App;
