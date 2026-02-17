import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../../components/ui/FormInput";
import { getModuleInterests, getUserTraitInterests } from "../constants";
import { useRegister } from "../hooks/useRegister";
import { modulesService } from "../../modules/services/modules.service";
import { AppModule } from "../../modules/modules.types";

/**
 * @author HallTech AI
 * Componente Smart para o fluxo de registro.
 */
const RegisterWizard: React.FC = () => {
  const {
    step,
    loading,
    formData,
    isStepValid,
    updateForm,
    updateProdConfig,
    toggleArrayItem,
    handleNext,
    handleBack,
  } = useRegister();

  const [showPassword, setShowPassword] = useState(false);

  // Estados para carregar os módulos da API
  const [availableModules, setAvailableModules] = useState<AppModule[]>([]);
  const [loadingModules, setLoadingModules] = useState(false);

  // Busca os módulos ao iniciar a tela
  useEffect(() => {
    const fetchModules = async () => {
      setLoadingModules(true);
      try {
        const modules = await modulesService.getModules();
        setAvailableModules(modules);
      } catch (error) {
        console.error("Erro ao buscar módulos", error);
      } finally {
        setLoadingModules(false);
      }
    };

    fetchModules();
  }, []);

  const renderProgressBar = () => (
    <div className="flex gap-2 mb-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${i <= step ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-800"}`}
        ></div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 p-6 relative overflow-x-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none"></div>

      <div className="max-w-md w-full mx-auto relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center active:scale-90 transition-all"
          >
            <i className="fas fa-chevron-left text-sm"></i>
          </button>
          <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">
            Passo {step} de 3
          </span>
        </div>

        {renderProgressBar()}

        {/* --- STEP 1: IDENTIDADE --- */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right duration-500 flex-1 flex flex-col">
            <div className="mb-6 space-y-2">
              <h2 className="text-3xl font-black text-white tracking-tighter">
                Quem é você?
              </h2>
              <p className="text-slate-400 text-sm">
                Precisamos de alguns dados essenciais para criar seu perfil.
              </p>
            </div>

            <div className="space-y-4">
              <FormInput
                label="Nickname"
                icon="fas fa-at"
                placeholder="Como quer ser chamado?"
                value={formData.nickname}
                onChange={(e) => updateForm("nickname", e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Nome"
                  icon="fas fa-user"
                  placeholder="Nome"
                  value={formData.firstName}
                  onChange={(e) => updateForm("firstName", e.target.value)}
                />
                <FormInput
                  label="Sobrenome"
                  icon="fas fa-signature"
                  placeholder="Sobrenome"
                  value={formData.lastName}
                  onChange={(e) => updateForm("lastName", e.target.value)}
                />
              </div>

              <FormInput
                label="Data de Nascimento"
                icon="fas fa-birthday-cake"
                type="date"
                value={formData.birthDate}
                onChange={(e) => updateForm("birthDate", e.target.value)}
              />

              <FormInput
                label="Gênero"
                icon="fas fa-venus-mars"
                as="select"
                value={formData.gender}
                onChange={(e) => updateForm("gender", e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="other">Outro</option>
                <option value="pref_not_say">Prefiro não dizer</option>
              </FormInput>

              <FormInput
                label="E-mail"
                icon="fas fa-envelope"
                type="email"
                placeholder="exemplo@email.com"
                value={formData.email}
                onChange={(e) => updateForm("email", e.target.value)}
              />
              <div style={{ position: "relative" }}>
                <FormInput
                  label="Senha"
                  icon="fas fa-lock"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  value={formData.password}
                  onChange={(e) => updateForm("password", e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 mt-1 text-slate-400 hover:text-indigo-500 transition-colors z-20"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </button>
              </div>

              <FormInput
                label="Confirme a Senha"
                icon="fas fa-lock"
                type={showPassword ? "text" : "password"}
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChange={(e) => updateForm("confirmPassword", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* --- STEP 2: MODULOS --- */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right duration-500 flex-1 flex flex-col">
            <div className="mb-6 space-y-2">
              <h2 className="text-3xl font-black text-white tracking-tighter">
                Seu Foco
              </h2>
              <p className="text-slate-400 text-sm">
                Nosso foco! Selecione o que é importante para você agora.
              </p>
            </div>

            {loadingModules ? (
              <div className="flex justify-center items-center py-10">
                <i className="fas fa-spinner fa-spin text-indigo-500 text-3xl"></i>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {availableModules.map((module) => {
                  const isSelected = formData.selectedModules.includes(
                    module.id,
                  );
                  const isDisabled = !module.isEnabled;

                  return (
                    <button
                      key={module.id}
                      disabled={isDisabled}
                      onClick={() =>
                        !isDisabled &&
                        toggleArrayItem("selectedModules", module.id)
                      }
                      className={`relative p-5 rounded-3xl border text-left transition-all duration-300 group
                        ${
                          isDisabled
                            ? "bg-slate-900/40 border-slate-800/50 cursor-not-allowed opacity-60 grayscale-[0.5]"
                            : isSelected
                              ? "bg-indigo-600 border-indigo-500 shadow-xl shadow-indigo-900/50 scale-[1.02]"
                              : "bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800"
                        }
                      `}
                    >
                      {/* Badge de "Em Breve" para módulos desativados */}
                      {isDisabled && (
                        <span className="absolute top-4 right-4 bg-slate-950 border border-slate-800 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest z-10">
                          Em breve
                        </span>
                      )}

                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-colors ${
                            isDisabled
                              ? "bg-slate-800/50 text-slate-600" // Estilo do ícone desativado
                              : isSelected
                                ? "bg-white/20 text-white"
                                : `bg-slate-800 text-${module.color}-500`
                          }`}
                        >
                          <i className={module.icon}></i>
                        </div>
                        <div className="flex-1">
                          <h3
                            className={`font-black text-lg ${
                              isDisabled
                                ? "text-slate-500"
                                : isSelected
                                  ? "text-white"
                                  : "text-slate-200"
                            }`}
                          >
                            {module.title}
                          </h3>
                          <p
                            className={`text-xs font-medium mt-1 ${
                              isDisabled
                                ? "text-slate-600"
                                : isSelected
                                  ? "text-indigo-200"
                                  : "text-slate-500"
                            }`}
                          >
                            {module.description || "Módulo do sistema"}
                          </p>
                        </div>

                        {/* Checkbox só aparece se estiver ativo */}
                        {!isDisabled && (
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              isSelected
                                ? "bg-white border-white"
                                : "border-slate-700 group-hover:border-slate-500"
                            }`}
                          >
                            {isSelected && (
                              <i className="fas fa-check text-indigo-600 text-[10px]"></i>
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* --- STEP 3: PERSONALIZACAO --- */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right duration-500 flex-1 flex flex-col pb-24">
            <div className="mb-6 space-y-2">
              <h2 className="text-3xl font-black text-white tracking-tighter">
                Personalização
              </h2>
              <p className="text-slate-400 text-sm">
                Ajuste os detalhes dos módulos que você escolheu.
              </p>
            </div>

            <div className="space-y-8">
              {/* LOOP DINÂMICO DOS MÓDULOS SELECIONADOS */}
              {availableModules.map((module) => {
                // 1. Só mostra se o usuário selecionou este módulo no Passo 2
                if (!formData.selectedModules.includes(module.id)) return null;

                // 2. Só mostra se o módulo estiver ativo e tiver funcionalidades
                if (
                  !module.isEnabled ||
                  !module.features ||
                  module.features.length === 0
                )
                  return null;

                return (
                  <div
                    key={module.id}
                    className="bg-slate-900/50 rounded-3xl p-5 border border-slate-800 animate-in fade-in slide-in-from-bottom-4"
                  >
                    {/* Cabeçalho do Card do Módulo */}
                    <div className="flex items-center gap-3 mb-4 border-b border-slate-800/50 pb-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center bg-slate-800 text-${module.color}-500`}
                      >
                        <i className={module.icon}></i>
                      </div>
                      <h3 className="font-bold text-white text-sm uppercase tracking-wide">
                        {module.title}
                      </h3>
                    </div>

                    {/* Lista de Funcionalidades (Features) */}
                    <div className="space-y-3">
                      {module.features.map((feature) => {
                        // Verifica se a funcionalidade está selecionada (usamos o array 'interests' para salvar IDs de features)
                        const isFeatureActive = formData.interests.includes(
                          feature.id,
                        );
                        const isFeatureDisabled = !feature.isEnabled;

                        return (
                          <button
                            key={feature.id}
                            disabled={isFeatureDisabled}
                            onClick={() =>
                              !isFeatureDisabled &&
                              toggleArrayItem("interests", feature.id)
                            }
                            className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all group ${
                              isFeatureDisabled
                                ? "border-slate-800 opacity-50 cursor-not-allowed bg-slate-900/30"
                                : isFeatureActive
                                  ? `bg-${module.color}-500/10 border-${module.color}-500` // Usa a cor do módulo
                                  : "border-slate-800 hover:bg-slate-800"
                            }`}
                            // Fallback de style caso a classe dinâmica do Tailwind não funcione
                            style={
                              isFeatureActive && !isFeatureDisabled
                                ? {
                                    borderColor: `var(--color-${module.color}-500)`,
                                  }
                                : {}
                            }
                          >
                            <div className="text-left flex-1">
                              <div className="flex items-center gap-2">
                                <p
                                  className={`font-black text-sm ${isFeatureActive ? "text-white" : "text-slate-300"}`}
                                >
                                  {feature.label}
                                </p>
                                {isFeatureDisabled && (
                                  <span className="text-[9px] bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded uppercase font-bold">
                                    Em breve
                                  </span>
                                )}
                              </div>
                              <p
                                className={`text-[10px] mt-0.5 ${isFeatureActive ? `text-${module.color}-200` : "text-slate-500"}`}
                              >
                                {feature.description ||
                                  "Funcionalidade do sistema"}
                              </p>
                            </div>

                            {!isFeatureDisabled && (
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                  isFeatureActive
                                    ? `bg-${module.color}-500 border-${module.color}-500`
                                    : "border-slate-600 group-hover:border-slate-500"
                                }`}
                              >
                                {isFeatureActive && (
                                  <i className="fas fa-check text-[10px] text-white"></i>
                                )}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Manteve-se a seção genérica de interesses/hobbies caso ainda faça sentido para o perfil do usuário, 
                  mas agora ela fica no final, separada da configuração técnica dos módulos */}
              <div className="bg-slate-900/50 rounded-3xl p-5 border border-slate-800">
                <h3 className="font-bold text-white text-sm uppercase tracking-wide mb-4 pl-1">
                  Seus Interesses & Hobbies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getUserTraitInterests().map((interest) => {
                    const isActive = formData.interests.includes(interest.id);
                    return (
                      <button
                        key={interest.id}
                        onClick={() =>
                          toggleArrayItem("interests", interest.id)
                        }
                        className={`px-3 py-2 rounded-lg text-[11px] font-bold border transition-all whitespace-nowrap ${
                          isActive
                            ? "bg-white/20 border-white text-white"
                            : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
                        }`}
                      >
                        {interest.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-auto pt-6 bg-slate-950 sticky bottom-0 z-20 pb-4">
          <button
            onClick={handleNext}
            disabled={loading || !isStepValid}
            className={`w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-900/40 transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${
              loading || !isStepValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <i className="fas fa-spinner animate-spin"></i>
            ) : step === 3 ? (
              "FINALIZAR CRIAÇÃO"
            ) : (
              "PRÓXIMO"
            )}
          </button>

          {step === 1 && (
            <p className="text-center mt-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Já tem conta?{" "}
              <Link
                to="/login"
                className="text-indigo-500 hover:text-indigo-400"
              >
                Entrar
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterWizard;
