import React from "react";
import Layout from "../../../components/Layout";
import { useHealth } from "../hooks/useHealth";
import WaterTracker from "./WaterTracker";
import MedicineList from "./MedicineList";
import AppointmentCard from "./AppointmentCard";

/**
 * @author HallTech AI
 * View container para a feature de Saúde.
 */
const HealthView: React.FC = () => {
  const { water, medicines, appointment, actions, loading } = useHealth();

  if (loading) {
      return (
        <Layout title="Ghz Saúde">
            <div className="flex justify-center py-20">
                <i className="fas fa-spinner animate-spin text-indigo-600 text-3xl"></i>
            </div>
        </Layout>
      );
  }

  return (
    <Layout title="Ghz Saúde">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Seção de Hidratação */}
        <WaterTracker
          currentDisplay={water.displayCurrent}
          goalDisplay={water.displayGoal}
          percentage={water.percentage}
          onAddWater={actions.addWater}
        />

        {/* Seção de Medicamentos e Consultas */}
        <section className="space-y-6">
          <MedicineList 
            medicines={medicines} 
            onToggle={actions.toggleMedicine} 
          />
          
          <AppointmentCard appointment={appointment} />
        </section>
      </div>
    </Layout>
  );
};

export default HealthView;