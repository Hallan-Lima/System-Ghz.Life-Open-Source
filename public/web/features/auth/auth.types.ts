/**
 * @author HallTech AI
 * Define a estrutura de um slide do carrossel de onboarding.
 */
export interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  accentColor: string;
}

/**
 * @author HallTech AI
 * Define o estado completo do formulário de registro (Wizard).
 */
export interface RegisterState {
  // Passo 1: Identidade
  nickname: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  birthDate: string;

  // Passo 2: Módulos (IDs)
  selectedModules: string[];

  // Passo 3: Refinamento
  financeMode: "simple" | "advanced" | null;
  healthGoals: string[];

  // Configuração de Produtividade
  productivityConfig: {
    enableGoals: boolean;
    enableShopping: boolean;
    enableHabits: boolean;
  };

  interests: string[];
}

/**
 * @author HallTech AI
 * Define um interesse ou módulo selecionável.
 */
export interface Interest {
  id: string;
  label: string;
  category: "module" | "user_trait";
  relatedModule?: string;
}

/**
 * @author HallTech AI
 * Define a estrutura de um módulo do sistema disponível no registro.
 */
export interface SystemModule {
  id: string;
  title: string;
  icon: string;
  color: string;
  desc: string;
}