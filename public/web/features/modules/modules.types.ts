/**
 * @author HallTech AI
 * Define a estrutura de uma funcionalidade específica dentro de um módulo.
 */
export interface AppFeature {
  id: string;
  label: string;
  description?: string;
  isEnabled: boolean;
  status?: string; // ex.: "Ativo" | "Inativo"
  status_id?: number; // ex.: 1 = Ativo, 2 = Inativo
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
  /** Rota do módulo (module_router_link do backend), ex: /productivity, /finance, /ia */
  route?: string;
  isEnabled: boolean;
  status?: string; // ex.: "Ativo" | "Inativo"
  status_id?: number; // ex.: 1 = Ativo, 2 = Inativo
  features: AppFeature[];
}
