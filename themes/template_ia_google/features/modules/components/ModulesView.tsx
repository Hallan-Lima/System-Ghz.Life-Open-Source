import React from "react";
import Layout from "../../../components/Layout";
import { useModules } from "../hooks/useModules";
import ModuleConfigCard from "./ModuleConfigCard";

/**
 * @author HallTech AI
 * Página de gerenciamento de módulos e features.
 */
const ModulesView: React.FC = () => {
  const { modules, loading, toggleModule, toggleFeature } = useModules();

  return (
    <Layout title="Módulos">
      <div className="pb-24 space-y-6">
        
        {/* Header Descritivo */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-xl font-black mb-2">Personalize seu Hub</h2>
                <p className="text-sm text-indigo-100 leading-relaxed opacity-90">
                    Ative ou desative funcionalidades conforme sua necessidade. 
                    O Ghz.Life se adapta ao seu estilo de vida.
                </p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10">
                <i className="fas fa-cubes-stacked text-8xl -mb-4 -mr-4"></i>
            </div>
        </div>

        {/* Lista de Módulos */}
        {loading ? (
           <div className="flex justify-center py-20">
             <i className="fas fa-spinner animate-spin text-indigo-600 text-3xl"></i>
           </div>
        ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {modules.map(module => (
                    <ModuleConfigCard 
                        key={module.id} 
                        module={module}
                        onToggleModule={toggleModule}
                        onToggleFeature={toggleFeature}
                    />
                ))}
            </div>
        )}
        
        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-4">
            Alterações são salvas automaticamente
        </p>
      </div>
    </Layout>
  );
};

export default ModulesView;
