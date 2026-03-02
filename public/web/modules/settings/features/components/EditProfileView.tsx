import React, { useState } from "react";
import FormInput from "@/shared/ui/FormInput";
import { useEditProfile } from '@/modules/settings/features/hooks/useEditProfile';
import { getUserTraitInterests } from '@/modules/auth/domain/constants';

/**
 * @author HallTech AI
 * Formulário completo de edição de perfil.
 */
const EditProfileView: React.FC = () => {
  const { formData, loading, success, isValid, handleChange, handlePreferenceToggle, handleSave, navigate } = useEditProfile();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32 font-sans transition-colors duration-300">
      
      {/* Header Fixo */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
            <i className="fas fa-arrow-left text-sm"></i>
        </button>
        <h1 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">Editar Perfil</h1>
        <div className="w-10"></div> {/* Espaçador */}
      </div>

      <div className="max-w-xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4">
            <div className="relative group cursor-pointer">
                <div className="w-28 h-28 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border-4 border-white dark:border-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-4xl shadow-xl overflow-hidden">
                    <i className="fas fa-user"></i>
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <i className="fas fa-camera text-white text-xl"></i>
                </div>
                <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-indigo-600 text-white border-2 border-white dark:border-slate-900 flex items-center justify-center shadow-lg">
                    <i className="fas fa-pencil-alt text-[10px]"></i>
                </button>
            </div>
            
            <div className="text-center">
                <h2 className="text-xl font-black text-slate-800 dark:text-white">
                    {formData.firstName || formData.lastName 
                        ? `${formData.firstName} ${formData.lastName}`.trim() 
                        : formData.nickname || "Usuário"}
                </h2>
                <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                        Plano Pro
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    <button className="text-[10px] font-bold text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest">
                        Alterar Foto
                    </button>
                </div>
            </div>
        </div>

        {/* Section: Identidade */}
        <div className="space-y-5">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
                <i className="fas fa-id-card text-indigo-500"></i>
                <h2 className="font-bold text-slate-800 dark:text-white uppercase tracking-wide text-sm">Dados Pessoais</h2>
            </div>
            
            <FormInput
                label="Nickname"
                icon="fas fa-at"
                value={formData.nickname}
                onChange={(e) => handleChange("nickname", e.target.value)}
                placeholder="Apelido no App"
            />

            <div className="grid grid-cols-2 gap-4">
                <FormInput
                    label="Nome"
                    icon="fas fa-user"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                />
                <FormInput
                    label="Sobrenome"
                    icon="fas fa-signature"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                />
            </div>

            <FormInput
                label="E-mail"
                icon="fas fa-envelope"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
                 <FormInput
                    label="Nascimento"
                    icon="fas fa-calendar"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleChange("birthDate", e.target.value)}
                />
                <FormInput
                    label="Gênero"
                    icon="fas fa-venus-mars"
                    as="select"
                    value={formData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                >
                    <option value="">Selecione...</option>
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                    <option value="other">Outro</option>
                    <option value="pref_not_say">Prefiro não dizer</option>
                </FormInput>
            </div>
        </div>

        {/* Section: Segurança */}
        <div className="space-y-5">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
                <i className="fas fa-shield-halved text-emerald-500"></i>
                <h2 className="font-bold text-slate-800 dark:text-white uppercase tracking-wide text-sm">Segurança</h2>
            </div>
            
            <div className="relative">
                <FormInput
                    label="Senha Atual / Nova Senha"
                    icon="fas fa-lock"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 mt-1 text-slate-400 hover:text-indigo-500"
                >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
            </div>

            <FormInput
                label="Confirmar Senha"
                icon="fas fa-lock"
                type={showPassword ? "text" : "password"}
                placeholder="Confirme a senha"
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
            />
        </div>

        {/* Section: Interesses */}
        <div className="space-y-5">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
                <i className="fas fa-star text-amber-500"></i>
                <h2 className="font-bold text-slate-800 dark:text-white uppercase tracking-wide text-sm">Interesses</h2>
            </div>
            
            <div className="flex flex-wrap gap-2">
                {getUserTraitInterests().map((interest) => (
                <button
                    key={interest.id}
                    onClick={() => handlePreferenceToggle('interests', interest.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    formData.interests.includes(interest.id)
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20"
                        : "bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-400"
                    }`}
                >
                    {interest.label}
                </button>
                ))}
            </div>
        </div>

        {/* Save Button */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent dark:from-slate-950 dark:via-slate-950/90 z-20">
            <button
                onClick={handleSave}
                disabled={loading || !isValid}
                className={`w-full py-4 rounded-2xl font-black text-white shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${
                    success 
                    ? "bg-emerald-500 shadow-emerald-500/30" 
                    : isValid 
                        ? "bg-indigo-600 shadow-indigo-500/30 hover:bg-indigo-500"
                        : "bg-slate-400 dark:bg-slate-700 cursor-not-allowed opacity-70"
                }`}
            >
                {loading ? (
                    <i className="fas fa-spinner animate-spin"></i>
                ) : success ? (
                    <>
                        <i className="fas fa-check"></i>
                        SALVO COM SUCESSO
                    </>
                ) : (
                    "SALVAR ALTERAÇÕES"
                )}
            </button>
        </div>

      </div>
    </div>
  );
};

export default EditProfileView;
