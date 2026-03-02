/**
 * @author HallTech AI
 * Mapeamento entre paths do frontend e module_router_link retornado pela API (vw_system_modules / sp_get_user_modules).
 * Garante reconhecimento de permissão por rota sem depender de ID numérico vs slug.
 */

/** Path da app (ex: /tasks) -> route do módulo no backend (ex: /productivity) */
//TODO: Refatorar para usar o route do módulo diretamente na API, evitando esse mapeamento hardcoded. Por ora, mantém a flexibilidade de ter rotas frontend diferentes do route do módulo.
export const PATH_TO_MODULE_ROUTE: Record<string, string> = {
  '/tasks': '/productivity',
  '/finance': '/finance',
  '/health': '/health',
  '/ia': '/ai_assistant',
  '/social': '/social',
};

/**
 * Retorna o module_router_link correspondente ao pathname, ou null se for rota "core" (dashboard, módulos, settings).
 */
export function getModuleRouteForPath(pathname: string): string | null {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const basePath = '/' + (normalized.split('/').filter(Boolean)[0] || '');
  return PATH_TO_MODULE_ROUTE[basePath] ?? null;
}
