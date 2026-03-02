import React, { useState, useEffect } from "react";
import { healthService } from "../services/health.service";
import { Appointment, Medicine } from "../health.types";

/**
 * @author HallTech AI
 * Hook principal da feature de Saúde.
 */
export const useHealth = () => {
  const [loading, setLoading] = useState(true);
  
  // Estado de Hidratação
  const [waterCurrent, setWaterCurrent] = useState(0); // em ml
  const [waterGoal, setWaterGoal] = useState(2000);    // em ml
  
  // Listas e Objetos
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await healthService.getHealthData();
        setWaterCurrent(data.water.current);
        setWaterGoal(data.water.goal);
        setMedicines(data.medicines);
        setAppointment(data.nextAppointment);
      } catch (error) {
        console.error("Erro ao carregar dados de saúde", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Actions
  const addWater = async (amountMl: number) => {
    const newValue = waterCurrent + amountMl;
    setWaterCurrent(newValue);
    await healthService.addWater(amountMl);
  };

  const toggleMedicine = async (id: string) => {
    setMedicines(prev => prev.map(med => 
      med.id === id ? { ...med, completed: !med.completed } : med
    ));
    await healthService.toggleMedicine(id);
  };

  // Cálculos de UI
  const waterPercentage = Math.min(100, Math.round((waterCurrent / waterGoal) * 100));
  const waterLiters = (waterCurrent / 1000).toFixed(1);
  const goalLiters = (waterGoal / 1000).toFixed(1);

  return {
    loading,
    water: {
      current: waterCurrent,
      goal: waterGoal,
      percentage: waterPercentage,
      displayCurrent: waterLiters,
      displayGoal: goalLiters
    },
    medicines,
    appointment,
    actions: {
      addWater,
      toggleMedicine
    }
  };
};