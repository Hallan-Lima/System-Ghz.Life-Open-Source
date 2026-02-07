import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterState } from "../../auth/auth.types";

/**
 * @author HallTech AI
 * Hook para gerenciar a edição do perfil.
 * Carrega dados do localStorage (simulando backend) e permite atualização.
 */
export const useEditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Estado inicial vazio, será populado pelo useEffect
  const [formData, setFormData] = useState<RegisterState>({
    nickname: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "", // Usado apenas para validação de nova senha se preenchido
    gender: "",
    birthDate: "",
    selectedModules: [],
    financeMode: null,
    healthGoals: [],
    productivityConfig: {
      enableGoals: false,
      enableShopping: false,
      enableHabits: false,
    },
    interests: [],
  });

  // Carrega dados do usuário
  useEffect(() => {
    const loadUserData = () => {
      try {
        const storedConfig = localStorage.getItem("userConfig");
        if (storedConfig) {
          const parsed = JSON.parse(storedConfig);
          // Mescla com o estado inicial para garantir que todos os campos existam
          setFormData(prev => ({ ...prev, ...parsed, confirmPassword: parsed.password }));
        }
      } catch (e) {
        console.error("Erro ao carregar perfil", e);
      }
    };
    loadUserData();
  }, []);

  const handleChange = (field: keyof RegisterState, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceToggle = (arrayField: 'interests' | 'healthGoals', item: string) => {
    setFormData(prev => {
        const currentList = prev[arrayField] || [];
        if (currentList.includes(item)) {
            return { ...prev, [arrayField]: currentList.filter(i => i !== item) };
        }
        return { ...prev, [arrayField]: [...currentList, item] };
    });
  };

  // Validação dos dados obrigatórios
  const isValid = useMemo(() => {
    const { nickname, firstName, lastName, email, birthDate, gender, password, confirmPassword } = formData;
    
    // Verifica se os campos de texto obrigatórios estão preenchidos
    if (!nickname?.trim() || !firstName?.trim() || !lastName?.trim() || !email?.trim()) {
      return false;
    }

    // Verifica seleções obrigatórias
    if (!birthDate || !gender) {
      return false;
    }

    // Validação de senha (como carregamos a senha atual, ela não deve estar vazia)
    // Se o usuário estiver alterando, a confirmação deve bater
    if (!password || password.trim() === '') {
        return false;
    }
    
    if (password !== confirmPassword) {
      return false;
    }

    return true;
  }, [formData]);

  const handleSave = async () => {
    if (!isValid) return;

    setLoading(true);
    setSuccess(false);

    // Simulação de delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
        // Salva no LocalStorage
        localStorage.setItem("userConfig", JSON.stringify(formData));
        
        setSuccess(true);
        setTimeout(() => {
            navigate(-1); // Volta para a tela anterior após salvar
        }, 1000);

    } catch (e) {
        console.error("Erro ao salvar perfil", e);
        alert("Erro ao salvar alterações.");
    } finally {
        setLoading(false);
    }
  };

  return {
    formData,
    loading,
    success,
    isValid,
    handleChange,
    handlePreferenceToggle,
    handleSave,
    navigate
  };
};
