import React from "react";
import { useNavigate } from "react-router-dom";
import { ONBOARDING_CATEGORIES, ONBOARDING_SLIDES } from '@/modules/auth/domain/constants';
import { useOnboarding } from "../hooks/useOnboarding";

interface OnboardingSliderProps {
  onLoginClick: () => void;
}

/**
 * @author HallTech AI
 * Carrossel de apresentação do App (Hero Section).
 */
const OnboardingSlider: React.FC<OnboardingSliderProps> = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const {
    currentSlide,
    slide,
    scrollRef,
    categoryRefs,
    nextSlide,
    prevSlide,
    handleCategoryClick,
    dragEvents,
  } = useOnboarding();

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
        {...dragEvents}
      >
        {ONBOARDING_CATEGORIES.map((cat) => (
          <span
            key={cat}
            ref={(el) => { categoryRefs.current.set(cat, el); }}
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
            {ONBOARDING_SLIDES.map((_, idx) => (
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
              onClick={onLoginClick}
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

export default OnboardingSlider;