/**
 * @author HallTech AI
 * Define a estrutura de uma funcionalidade específica dentro de um módulo.
 */
export interface AppFeature {
  id: string;
  label: string;
  description?: string;
  isEnabled: boolean;
  // Campos para o Menu de Ação Rápida
  quickAccessIcon?: string;
  route?: string;
}

/**
 * @author HallTech AI
 * Define a estrutura de um módulo macro do sistema.
 */
export interface AppModule {
  id: string;
  title: string;
  icon: string;
  color: string; // Ex: 'indigo', 'emerald', 'rose'
  description: string;
  isEnabled: boolean;
  features: AppFeature[];
}
