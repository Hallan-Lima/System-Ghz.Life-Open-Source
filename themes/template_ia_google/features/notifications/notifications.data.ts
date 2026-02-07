
import { AppNotification } from "./notifications.types";

/**
 * @author HallTech AI
 * Dados iniciais de notificações para demonstração.
 */
export const notificationMocks: AppNotification[] = [
  {
    id: '1',
    title: 'Meta de Água Atingida! 💧',
    message: 'Parabéns! Você atingiu sua meta de hidratação ontem.',
    type: 'success',
    timestamp: 'Há 2 horas',
    read: false,
    actionRoute: '/health'
  },
  {
    id: '2',
    title: 'Fatura Próxima',
    message: 'Sua fatura do cartão vence em 3 dias. Valor: R$ 1.250,00',
    type: 'warning',
    timestamp: 'Há 5 horas',
    read: false,
    actionRoute: '/finance'
  },
  {
    id: '3',
    title: 'Nova Funcionalidade',
    message: 'O módulo de Inteligência Artificial foi atualizado com novas dicas.',
    type: 'info',
    timestamp: 'Ontem',
    read: true,
    actionRoute: '/ia'
  },
  {
    id: '4',
    title: 'Bem-vindo ao Ghz.Life',
    message: 'Configure seu perfil para aproveitar ao máximo a plataforma.',
    type: 'system',
    timestamp: '2 dias atrás',
    read: true,
    actionRoute: '/settings/profile'
  }
];
