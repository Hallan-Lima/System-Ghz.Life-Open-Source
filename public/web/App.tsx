import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ModulesProvider } from '@/core/modules/features/modules/context/ModulesContext'; 
import { NotificationsProvider } from '@/core/notifications/features/context/NotificationsContext';

import DashboardPage from '@/core/dashboard/pages/DashboardPage';
import FinancePage from '@/modules/finance/pages/FinancePage';
import TasksPage from '@/modules/tasks/pages/TasksPage';
import TaskCreatorPage from '@/modules/tasks/pages/TaskCreatorPage';
import HealthPage from '@/modules/health/pages/HealthPage';
import AiPage from '@/modules/ai/pages/AiPage';
import ModulesPage from '@/core/modules/pages/ModulesPage';
import SettingsPage from '@/core/settings/pages/SettingsPage';
import EditProfilePage from '@/core/settings/pages/EditProfilePage';
import MenuOrderingPage from '@/core/settings/pages/MenuOrderingPage';
import NotificationsPage from '@/core/notifications/pages/NotificationsPage';
import LoginPage from '@/core/auth/pages/Login';
import RegisterPage from '@/core/auth/pages/Register';
import AuthGuard from '@/shared/router/guards';

const App: React.FC = () => {
  return (
    <ModulesProvider>
      <NotificationsProvider> {/* Wrapper de Notificações */}
        <Router>
          <div className="min-h-screen">
            <Routes>
              {/* Rotas públicas (sem guarda) */}
              <Route path="/" element={<LoginPage />} /> {/* ROTA INICIAL: LoginPage */}
              <Route path="/auth" element={<LoginPage />} /> {/* Rota explícita para login */}
              <Route path="/register" element={<RegisterPage />} />

              {/* Rotas protegidas (com guarda de autenticação) */}
              <Route element={<AuthGuard />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/finance" element={<FinancePage />} />
                <Route path="/health" element={<HealthPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/tasks/new" element={<TaskCreatorPage />} />
                <Route path="/modules" element={<ModulesPage />} />
                <Route path="/modules/order" element={<MenuOrderingPage />} /> 
                <Route path="/ia" element={<AiPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/settings/profile" element={<EditProfilePage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                {/* Fallback para dashboard se acessar qualquer rota não mapeada e estiver autenticado */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </NotificationsProvider>
    </ModulesProvider>
  );
};

export default App;
