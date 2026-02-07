import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../../components/ui/FormInput";
import { SYSTEM_MODULES, getModuleInterests, getUserTraitInterests } from "../constants";
import { useRegister } from "../hooks/useRegister";

/**
 * @author HallTech AI
 * Componente Smart para o fluxo de registro.
 */
const RegisterWizard: React.FC = () => {
  const {
    step,
    loading,
    formData,
    updateForm,
    updateProdConfig,
    toggleArrayItem,
    handleNext,
    handleBack,
  } = useRegister();

  const [showPassword, setShowPassword] = useState(false);

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
                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
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

            <div className="grid grid-cols-1 gap-4">
              {SYSTEM_MODULES.map((module) => {
                const isSelected = formData.selectedModules.includes(module.id);
                return (
                  <button
                    key={module.id}
                    onClick={() => toggleArrayItem("selectedModules", module.id)}
                    className={`relative p-5 rounded-3xl border text-left transition-all duration-300 group ${
                      isSelected
                        ? "bg-indigo-600 border-indigo-500 shadow-xl shadow-indigo-900/50"
                        : "bg-slate-900 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-colors ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : `bg-slate-800 ${module.color}`
                        }`}
                      >
                        <i className={module.icon}></i>
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`font-black text-lg ${isSelected ? "text-white" : "text-slate-200"}`}
                        >
                          {module.title}
                        </h3>
                        <p
                          className={`text-xs font-medium mt-1 ${isSelected ? "text-indigo-200" : "text-slate-500"}`}
                        >
                          {module.desc}
                        </p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-white border-white"
                            : "border-slate-700"
                        }`}
                      >
                        {isSelected && (
                          <i className="fas fa-check text-indigo-600 text-[10px]"></i>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
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
                Vamos ajustar os detalhes finais para sua experiência.
              </p>
            </div>

            <div className="space-y-8">
              {/* Productivity Question */}
              {formData.selectedModules.includes("productivity") && (
                <div className="bg-slate-900/50 rounded-3xl p-5 border border-slate-800 animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex items-center gap-3 mb-4">
                    <i className="fas fa-list-check text-indigo-500"></i>
                    <h3 className="font-bold text-white text-sm uppercase tracking-wide">
                      Foco em Produtividade
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={() => updateProdConfig("enableGoals")}
                      className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all ${
                        formData.productivityConfig.enableGoals
                          ? "bg-indigo-500/10 border-indigo-500 text-indigo-400"
                          : "border-slate-800 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      <div className="text-left">
                        <p className="font-black text-sm">Metas & Sonhos</p>
                        <p className="text-[10px] opacity-70">
                          Planejamento a longo prazo e objetivos de vida.
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.productivityConfig.enableGoals ? "bg-indigo-500 border-indigo-500" : "border-slate-600"}`}
                      >
                        {formData.productivityConfig.enableGoals && (
                          <i className="fas fa-check text-[10px] text-white"></i>
                        )}
                      </div>
                    </button>

                    <button
                      onClick={() => updateProdConfig("enableShopping")}
                      className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all ${
                        formData.productivityConfig.enableShopping
                          ? "bg-indigo-500/10 border-indigo-500 text-indigo-400"
                          : "border-slate-800 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      <div className="text-left">
                        <p className="font-black text-sm">Compras & Listas</p>
                        <p className="text-[10px] opacity-70">
                          Listas rápidas, mercado e itens para adquirir.
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.productivityConfig.enableShopping ? "bg-indigo-500 border-indigo-500" : "border-slate-600"}`}
                      >
                        {formData.productivityConfig.enableShopping && (
                          <i className="fas fa-check text-[10px] text-white"></i>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Finance Question */}
              {formData.selectedModules.includes("finance") && (
                <div className="bg-slate-900/50 rounded-3xl p-5 border border-slate-800">
                  <div className="flex items-center gap-3 mb-4">
                    <i className="fas fa-wallet text-emerald-500"></i>
                    <h3 className="font-bold text-white text-sm uppercase tracking-wide">
                      Estilo Financeiro
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => updateForm("financeMode", "simple")}
                      className={`p-4 rounded-2xl border text-center transition-all ${
                        formData.financeMode === "simple"
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                          : "border-slate-800 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      <p className="font-black text-sm mb-1">Simples</p>
                      <p className="text-[10px]">
                        Controle mais simples, apenas entradas, Saídas e Saldo Geral.
                      </p>
                    </button>
                    <button
                      onClick={() => updateForm("financeMode", "advanced")}
                      className={`p-4 rounded-2xl border text-center transition-all ${
                        formData.financeMode === "advanced"
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                          : "border-slate-800 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      <p className="font-black text-sm mb-1">Avançado</p>
                      <p className="text-[10px]">
                        Mais opções de personalização e controle, como: 
                        Categorias, cartões, metas e tags.
                      </p>
                    </button>
                  </div>
                </div>
              )}

              {/* Health Question */}
              {formData.selectedModules.includes("health") && (
                <div className="bg-slate-900/50 rounded-3xl p-5 border border-slate-800">
                  <div className="flex items-center gap-3 mb-4">
                    <i className="fas fa-heartbeat text-rose-500"></i>
                    <h3 className="font-bold text-white text-sm uppercase tracking-wide">
                      Foco na Saúde
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Hidratação",
                      "Medicamentos",
                      "Treinos",
                      "Sono",
                      "Calorias",
                      "Academia",
                    ].map((goal) => (
                      <button
                        key={goal}
                        onClick={() => toggleArrayItem("healthGoals", goal)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          formData.healthGoals.includes(goal)
                            ? "bg-rose-500 text-white border-rose-500"
                            : "bg-transparent text-slate-400 border-slate-700 hover:border-slate-500"
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Module-specific Interests */}
              {formData.selectedModules.length > 0 && (
              <div className="bg-slate-900/50 rounded-3xl p-5 border border-slate-800">
                <h3 className="font-bold text-white text-sm uppercase tracking-wide mb-4 pl-1">
                Funcionalidades de Interesse
                </h3>
                <div className="flex flex-wrap gap-2">
                {getModuleInterests().map((interest) => (
                  <button
                  key={interest.id}
                  onClick={() => toggleArrayItem("interests", interest.id)}
                  className={`px-3 py-2 rounded-lg text-[11px] font-bold border transition-all whitespace-nowrap ${
                    formData.interests.includes(interest.id)
                    ? "bg-indigo-500/20 border-indigo-500 text-indigo-300"
                    : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
                  }`}
                  >
                  {interest.label}
                  </button>
                ))}
                </div>
              </div>
              )}

              {/* User Traits & Preferences */}
              <div className="bg-slate-900/50 rounded-3xl p-5 border border-slate-800">
              <h3 className="font-bold text-white text-sm uppercase tracking-wide mb-4 pl-1">
                Seus Interesses & Hobbies
              </h3>
              <div className="flex flex-wrap gap-2">
                {getUserTraitInterests().map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => toggleArrayItem("interests", interest.id)}
                  className={`px-3 py-2 rounded-lg text-[11px] font-bold border transition-all whitespace-nowrap ${
                  formData.interests.includes(interest.id)
                    ? "bg-white/20 border-white text-white"
                    : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
                  }`}
                >
                  {interest.label}
                </button>
                ))}
              </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-auto pt-6 bg-slate-950 sticky bottom-0 z-20 pb-4">
          <button
            onClick={handleNext}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-900/40 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3"
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