import { useState, useRef, useEffect } from "react";
import { ONBOARDING_SLIDES } from "../constants";

/**
 * @author HallTech AI
 * Hook para gerenciar a lógica do carrossel de onboarding.
 */
export const useOnboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Map<string, HTMLSpanElement | null>>(new Map());
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const slide = ONBOARDING_SLIDES[currentSlide];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % ONBOARDING_SLIDES.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + ONBOARDING_SLIDES.length) % ONBOARDING_SLIDES.length);

  const handleCategoryClick = (cat: string) => {
    if (isDragging) return;
    const index = ONBOARDING_SLIDES.findIndex((s) => s.category === cat);
    if (index !== -1) setCurrentSlide(index);
  };

  // Scroll Drag Logic
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
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Auto-scroll to active category
  useEffect(() => {
    const activeCat = slide.category;
    const element = categoryRefs.current.get(activeCat);
    const container = scrollRef.current;

    if (element && container) {
      const containerWidth = container.offsetWidth;
      const elementLeft = element.offsetLeft;
      const elementWidth = element.offsetWidth;
      const scrollTo = elementLeft - containerWidth / 2 + elementWidth / 2;

      container.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  }, [slide.category]);

  return {
    currentSlide,
    slide,
    scrollRef,
    categoryRefs,
    nextSlide,
    prevSlide,
    handleCategoryClick,
    dragEvents: {
      onMouseDown: handleMouseDown,
      onMouseLeave: handleMouseLeave,
      onMouseUp: handleMouseUp,
      onMouseMove: handleMouseMove,
    },
  };
};