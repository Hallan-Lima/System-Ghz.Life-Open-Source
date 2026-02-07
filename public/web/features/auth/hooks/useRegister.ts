import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterState } from "../auth.types";
import { authService } from "../services/auth.service";

const INITIAL_STATE: RegisterState = {
  nickname: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  birthDate: "",
  selectedModules: ["finance", "productivity"],
  financeMode: null,
  healthGoals: [],
  productivityConfig: {
    enableGoals: true,
    enableShopping: false,
    enableHabits: false,
  },
  interests: [],
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

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleFinish();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate("/login");
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      await authService.register(formData);
      navigate("/");
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
    updateForm,
    updateProdConfig,
    toggleArrayItem,
    handleNext,
    handleBack,
  };
};