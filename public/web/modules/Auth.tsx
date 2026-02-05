import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// --- Shared Components & Data ---

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  accentColor: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    category: "Academia",
    title: "Viva",
    description:
      "Transforme sua rotina com monitoramento inteligente de treinos e saúde. O fluxo perfeito para sua evolução.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200",
    accentColor: "from-blue-600 to-indigo-600",
  },
  {
    id: 2,
    category: "Financeiro",
    title: "Domine",
    description:
      "Controle gastos, acompanhe investimentos e alcance suas metas financeiras com o auxílio do Ghz Assistant.",
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1200",
    accentColor: "from-emerald-600 to-teal-600",
  },
  {
    id: 3,
    category: "Saude",
    title: "Seu bem-estar em primeiro lugar.",
    description:
      "Lembretes de hidratação, sono e medicação. Uma vida saudável começa com pequenos hábitos integrados.",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200",
    accentColor: "from-indigo-600 to-purple-600",
  },
  {
    id: 4,
    category: "Agenda",
    title: "Organize",
    description:
      "Lembretes de tarefas, compromissos e metas. Mantenha-se produtivo e organizado com o Ghz Assistant.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
    accentColor: "from-indigo-600 to-purple-600",
  },
  {
    id: 5,
    category: "Social",
    title: "Conecte-se",
    description:
      "Mantenha-se em contato com amigos e familiares. Compartilhe momentos e mantenha sua rede social ativa.",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=1200",
    accentColor: "from-rose-600 to-pink-600",
  },
  {
    id: 6,
    category: "Alimentação",
    title: "Alimentação saudável",
    description:
      "Planeje refeições balanceadas e acompanhe sua dieta. Um estilo de vida saudável começa com o que você come.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200",
    accentColor: "from-emerald-600 to-teal-600",
  },
];

const categories = [
  "Academia",
  "Financeiro",
  "Saude",
  "Agenda",
  "Social",
  "Alimentação",
];

interface FormInputProps extends React.InputHTMLAttributes<
  HTMLInputElement | HTMLSelectElement
> {
  label: string;
  icon: string;
  as?: "input" | "select";
  children?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  icon,
  as = "input",
  children,
  ...props
}) => {
  return (
    <div className="space-y-1.5 group w-full">
      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1 transition-colors group-focus-within:text-indigo-500">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none">
          <i className={`${icon} text-sm`}></i>
        </div>
        {as === "select" ? (
          <select
            {...(props as any)}
            className="w-full pl-11 pr-4 py-3.5 bg-white/5 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-800 dark:text-white outline-none transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-300 dark:placeholder:text-slate-700 backdrop-blur-sm appearance-none"
          >
            {children}
          </select>
        ) : (
          <input
            {...(props as any)}
            className="w-full pl-11 pr-4 py-3.5 bg-white/5 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-800 dark:text-white outline-none transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-300 dark:placeholder:text-slate-700 backdrop-blur-sm"
          />
        )}
        {as === "select" && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <i className="fas fa-chevron-down text-xs"></i>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Login Page ---

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const slide = slides[currentSlide];

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocidade do scroll
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Função para clicar e ir para o slide da categoria
  const handleCategoryClick = (cat: string) => {
    if (isDragging) return; // Não ativa se estiver arrastando
    const index = slides.findIndex((s) => s.category === cat);
    if (index !== -1) setCurrentSlide(index);
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1200);
  };

  const categoryRefs = useRef<Map<string, HTMLSpanElement | null>>(new Map());

  useEffect(() => {
    const activeCat = slide.category;
    const element = categoryRefs.current.get(activeCat);
    const container = scrollRef.current;

    if (element && container) {
      // Cálculo para centralizar o elemento no container
      const containerWidth = container.offsetWidth;
      const elementLeft = element.offsetLeft;
      const elementWidth = element.offsetWidth;

      const scrollTo = elementLeft - containerWidth / 2 + elementWidth / 2;

      container.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  }, [slide.category]); // Executa sempre que a categoria do slide mudar

  if (showLoginForm) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-950 justify-center items-center p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>

        <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-2xl relative z-10 border border-white/10 ring-1 ring-black/5 animate-in fade-in zoom-in duration-300">
          <div className="mb-8 text-center relative">
            <button
              onClick={() => setShowLoginForm(false)}
              className="absolute left-0 top-1 w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center active:scale-90 transition-all"
            >
              <i className="fas fa-arrow-left text-sm"></i>
            </button>
            <div className="space-y-1 pt-2">
              <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter">
                Login Ghz.Life
              </h3>
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
                Seja bem-vindo
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <FormInput
              label="E-mail"
              icon="fas fa-envelope"
              type="email"
              placeholder="seu@ghz.life"
              required
            />
            <FormInput
              label="Senha de Acesso"
              icon="fas fa-lock"
              type="password"
              placeholder="••••••••"
              required
            />

            <div className="flex justify-end pt-1">
              <button
                type="button"
                className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
              >
                Esqueci minha senha
              </button>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 mt-4"
            >
              {loading ? (
                <i className="fas fa-spinner animate-spin"></i>
              ) : (
                "ACESSAR HUB"
              )}
            </button>
          </form>

          <div className="mt-8 text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 font-bold tracking-widest">
                  ou conecte via
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-bold text-xs hover:bg-slate-50 transition-all">
                <i className="fab fa-google text-rose-500"></i> Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-bold text-xs hover:bg-slate-50 transition-all">
                <i className="fab fa-apple text-slate-800 dark:text-white"></i>{" "}
                Apple
              </button>
            </div>

            <p className="text-xs text-slate-400 font-medium">
              Novo usuário?{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-black hover:underline"
              >
                Criar conta grátis
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full flex flex-col bg-slate-950 overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <img
          src={slide.image}
          alt="bg"
          className="w-full h-full object-cover transition-all duration-1000 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-20 p-8 pt-12 flex justify-between items-start">
        <div className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl shadow-white/10 ring-4 ring-white/10">
          <div className="relative">
            <span className="text-indigo-600 font-black text-2xl italic tracking-tighter">
              H
            </span>
            <span className="absolute -bottom-1 -right-2 text-cyan-500 font-black text-xs">
              t
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white flex items-center justify-center active:scale-90 transition-all hover:bg-black/30"
          >
            <i className="fas fa-chevron-left text-sm"></i>
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white flex items-center justify-center active:scale-90 transition-all hover:bg-black/30"
          >
            <i className="fas fa-chevron-right text-sm"></i>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="relative z-20 mt-4 px-8 flex gap-2 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {categories.map((cat) => (
          <span
            key={cat}
            ref={(el) => categoryRefs.current.set(cat, el)}
            onClick={() => handleCategoryClick(cat)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md transition-all duration-500 cursor-pointer ${
              cat === slide.category
                ? "bg-white text-indigo-600 border-white shadow-xl scale-105"
                : "bg-black/20 text-white/60 border-white/10 hover:bg-black/30"
            }`}
          >
            {cat}
          </span>
        ))}
      </div>

      <div className="relative z-20 mt-auto p-8 pb-12 w-full max-w-xl mx-auto flex flex-col items-center">
        <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-white leading-tight tracking-tight drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="text-white/70 text-sm font-medium leading-relaxed max-w-sm">
              {slide.description}
            </p>
          </div>

          <div className="flex gap-1.5">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 rounded-full transition-all duration-500 ${idx === currentSlide ? "w-8 bg-white" : "w-2 bg-white/20"}`}
              ></div>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <button
              onClick={() => navigate("/register")}
              className="w-full bg-white text-slate-900 font-black py-4 rounded-3xl shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              CADASTRAR
            </button>
            <button
              onClick={() => setShowLoginForm(true)}
              className="w-full bg-black/40 backdrop-blur-xl text-white font-black py-4 rounded-3xl border border-white/20 active:scale-[0.98] transition-all"
            >
              ENTRAR
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};

// --- Register Wizard ---

interface RegisterState {
  // Step 1: Basic
  nickname: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  birthDate: string;

  // Step 2: Modules (IDs)
  selectedModules: string[];

  // Step 3: Refinement
  financeMode: "simple" | "advanced" | null;
  healthGoals: string[];

  // Productivity Config
  productivityConfig: {
    enableGoals: boolean;
    enableShopping: boolean;
    enableHabits: boolean;
  };

  interests: string[];
}

const MODULES = [
  {
    id: "finance",
    title: "Financeiro",
    icon: "fas fa-wallet",
    color: "text-emerald-500",
    desc: "Controle gastos e metas.",
  },
  {
    id: "health",
    title: "Saúde",
    icon: "fas fa-heartbeat",
    color: "text-rose-500",
    desc: "Monitore água, sono e treino.",
  },
  {
    id: "productivity",
    title: "Produtividade",
    icon: "fas fa-list-check",
    color: "text-indigo-500",
    desc: "Tarefas e agenda inteligente.",
  },
];

const INTERESTS = [
  "Conta conjunta",                   // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Tecnologia",                   // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Investimentos",                // TODO: Funcionalidade futura, modulo financeiro
  "Musculação",                   // TODO: Funcionalidade futura, modulo saúde
  "Yoga",                         // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Leitura",                      // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Viagens",                      // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Culinária",                    // TODO: Funcionalidade futura, modulo saúde
  "Meditação",                    // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Artes",                        // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Games",                        // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Música",                       // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Estudos",                      // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Rede Social",                  // TODO: Funcionalidade futura, modulo social
  "Criação de enquetes",          // TODO: Funcionalidade futura, modulo social
  "Encontrar serviços",           // TODO: Funcionalidade futura, modulo social
  "Prestar serviços",             // TODO: Funcionalidade futura, modulo social
  "Encontrar pessoas",            // TODO: Funcionalidade futura, modulo social
  "Participar de comunidades",    // TODO: Funcionalidade futura, modulo social
  "Chat aleatorio",               // TODO: Funcionalidade futura, modulo social
  "Dicas Personalizadas",                // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Agenda",                       // TODO: Funcionalidade futura, modulo Agenda
  "Eventos",                       // TODO: Funcionalidade futura, modulo Agenda
  "Tarefas",                       // TODO: Funcionalidade futura, modulo Agenda
  "Lembretes",                       // TODO: Funcionalidade futura, modulo Agenda
  "Dispertador",                       // TODO: Funcionalidade futura, modulo Agenda
  "Metas Pessoais",                       // TODO: Funcionalidade futura, modulo Agenda
  "Cronômetro",                       // TODO: Funcionalidade futura, modulo Agenda
  "Pomodoro",                       // TODO: Funcionalidade futura, modulo Agenda
  "Alimentação",                       // TODO: Funcionalidade futura, modulo Alimentação
  "Plano Alimentar",                       // TODO: Funcionalidade futura, modulo Alimentação
  "Controle de nutrientes",                       // TODO: Funcionalidade futura, modulo Alimentação
  "Personal trainer",                       // TODO: Funcionalidade futura, modulo Alimentação
  "Atividades Fisicas",                       // TODO: Funcionalidade futura, modulo Esportes
  "Montar treinos",                       // TODO: Funcionalidade futura, modulo Esportes
  "Acompanhar Academia",                       // TODO: Funcionalidade futura, modulo Esportes
  "Acompanhar progresso",                       // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Lembrete de beber água",                       // TODO: Funcionalidade futura, modulo saúde
  "Lembrete médico",                       // TODO: Funcionalidade futura, modulo saúde
  "Acompanhamento médico",                       // TODO: Funcionalidade futura, modulo saúde
  "Ciclo Menstrual",                       // TODO: Funcionalidade futura, modulo saúde
  "Monitoramento de Peso",                       // TODO: Funcionalidade futura, modulo saúde
  "Monitoramento de Sono",                       // TODO: Funcionalidade futura, modulo saúde
  "Monitoramento de Cardiaco",                       // TODO: Funcionalidade futura, modulo saúde
  "Monitoramento de pressão cardiaca",                       // TODO: Funcionalidade futura, modulo saúde
  "Monitoramento de temperatura corporal",                       // TODO: Funcionalidade futura, modulo saúde
  "Estilo de vida Saudavel",                       // TODO: Funcionalidade futura, modulo saúde
  "Dispositivos inteligentes",                       // TODO: Funcionalidade futura, modulo saúde
  "Contas a Pagar",                       // TODO: Funcionalidade futura, modulo financeiro
  "Contas a Receber",                       // TODO: Funcionalidade futura, modulo financeiro
  "Controle de movimentações Financeira",                       // TODO: Funcionalidade futura, modulo financeiro
  "Objetivo Financeiro",                       // TODO: Funcionalidade futura, modulo financeiro
  "Cartão de Crédito",                       // TODO: Funcionalidade futura, modulo financeiro
  "Importação de movimentações",                       // TODO: Funcionalidade futura, modulo financeiro
  "Investimentos",                       // TODO: Funcionalidade futura, modulo financeiro
  "Integração com bancos",                       // TODO: Funcionalidade futura, modulo financeiro
  "Lista de compra",                       // TODO: Funcionalidade futura, modulo financeiro
  "Calculadora Basica",                       // TODO: Funcionalidade futura, modulo financeiro
  "Calculadora Cientifica",                       // TODO: Funcionalidade futura, modulo financeiro
  "Calculadora Financeira",                       // TODO: Funcionalidade futura, modulo financeiro
  "Planejamento e Orçamento",                       // TODO: Funcionalidade futura, modulo financeiro
  "Calculadora de Conversões",                       // TODO: Funcionalidade futura, modulo financeiro
  "Noticias",                       // TODO: Funcionalidade futura, modulo social
  "Rock",                       // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "POP",                       // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Eletronica",                       // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Comedia",                       // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Terror",                       // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Drama",                       // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Serie",                       // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Filmes",                       // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Animes",                       // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Valores e crenças",                       // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Experiencias",                       // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Cultura e Ambiente",                       // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Habilidades e talentos",                       // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Hobbies",                       // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Esportes",                       // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Livros",                       // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Jogos",                       // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
  "Eventos",                       // TODO: Funcionalidade futura, modulo agente IA, perfil de usuario
];

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterState>({
    nickname: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthDate: "",
    selectedModules: ["finance", "productivity"], // Default
    financeMode: null,
    healthGoals: [],
    productivityConfig: {
      enableGoals: true,
      enableShopping: false,
      enableHabits: false,
    },
    interests: [],
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const toggleModule = (id: string) => {
    setFormData((prev) => {
      const current = prev.selectedModules;
      if (current.includes(id))
        return { ...prev, selectedModules: current.filter((m) => m !== id) };
      return { ...prev, selectedModules: [...current, id] };
    });
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => {
      const current = prev.interests;
      if (current.includes(interest))
        return { ...prev, interests: current.filter((i) => i !== interest) };
      return { ...prev, interests: [...current, interest] };
    });
  };

  const toggleHealthGoal = (goal: string) => {
    setFormData((prev) => {
      const current = prev.healthGoals;
      if (current.includes(goal))
        return { ...prev, healthGoals: current.filter((g) => g !== goal) };
      return { ...prev, healthGoals: [...current, goal] };
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

  const handleFinish = () => {
    setLoading(true);
    // Simulate API Call & save config to localstorage for demo
    localStorage.setItem("userConfig", JSON.stringify(formData));
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 2000);
  };

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
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "45px",
                    cursor: "pointer",
                    zIndex: 10,
                  }}
                />
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
                Liberaremos as funcionalidades conforme sua escolha.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {MODULES.map((module) => {
                const isSelected = formData.selectedModules.includes(module.id);
                return (
                  <button
                    key={module.id}
                    onClick={() => toggleModule(module.id)}
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
              {/* Productivity Question (New) */}
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
                        onClick={() => toggleHealthGoal(goal)}
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

              {/* General Interests */}
              <div>
                <h3 className="font-bold text-white text-sm uppercase tracking-wide mb-4 pl-1">
                  Interesses Gerais
                </h3>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all ${
                        formData.interests.includes(interest)
                          ? "bg-white text-indigo-600 scale-105 shadow-lg shadow-white/10"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      {interest}
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
