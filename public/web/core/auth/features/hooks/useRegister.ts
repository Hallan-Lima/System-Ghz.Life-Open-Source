import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterState } from '@/core/auth/domain/auth.types';
import { authService } from "@/core/auth/features/services/auth.service";

const INITIAL_STATE: RegisterState = {
  nickname: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  birthDate: "",
  selectedModules: [],
  financeMode: null,
  healthGoals: [],
  productivityConfig: {
    enableGoals: true,
    enableShopping: false,
    enableHabits: false,
  },
  interests: [],
  experienceMode: "SIMPLE",
};

/**
 * @author HallTech AI
 * Hook para gerenciar o estado e navegação do Wizard de Registro.
 */
export const useRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterState>(INITIAL_STATE);

  const updateForm = (key: keyof RegisterState, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const updateProdConfig = (key: keyof RegisterState["productivityConfig"]) => {
    setFormData((prev) => ({
      ...prev,
      productivityConfig: {
        ...prev.productivityConfig,
        [key]: !prev.productivityConfig[key],
      },
    }));
  };

  const toggleArrayItem = (key: keyof RegisterState, item: string) => {
    setFormData((prev) => {
      const currentArray = prev[key] as string[];
      if (currentArray.includes(item)) {
        return { ...prev, [key]: currentArray.filter((i) => i !== item) };
      }
      return { ...prev, [key]: [...currentArray, item] };
    });
  };

  // Validação em tempo real para cada etapa
  const isStepValid = useMemo(() => {
    if (step === 1) {
      const { nickname, firstName, lastName, email, birthDate, gender, password, confirmPassword } = formData;
      return (
        !!nickname?.trim() &&
        !!firstName?.trim() &&
        !!lastName?.trim() &&
        !!email?.trim() &&
        email.includes("@") &&
        !!birthDate &&
        birthDate <= new Date().toISOString().split("T")[0] && 
        !!gender &&
        !!password &&
        password === confirmPassword
      );
    }
    if (step === 2) {
      // Exige pelo menos um módulo selecionado
      return formData.selectedModules.length > 0;
    }
    // Etapa 3 é de personalização opcional
    return true;
  }, [step, formData]);

  const handleNext = () => {
    if (!isStepValid) return;
    if (step < 3) setStep(step + 1);
    else handleFinish();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate("/login");
  };

  const handleFinish = async () => {
    if (!isStepValid) return;
    
    setLoading(true);
    try {
      await authService.register(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro no registro", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    loading,
    formData,
    isStepValid,
    updateForm,
    updateProdConfig,
    toggleArrayItem,
    handleNext,
    handleBack,
  };
};
