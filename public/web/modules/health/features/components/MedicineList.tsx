import React from "react";
import { Medicine } from "../health.types";

interface MedicineListProps {
  medicines: Medicine[];
  onToggle: (id: string) => void;
}

/**
 * @author HallTech AI
 * Componente que renderiza a lista de medicamentos do dia.
 */
const MedicineList: React.FC<MedicineListProps> = ({ medicines, onToggle }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-4">
        <h3 className="font-black text-xl text-slate-800 dark:text-white">
          Lembretes Médicos
        </h3>
        <button className="w-10 h-10 bg-indigo-600 rounded-2xl text-white shadow-lg active:scale-90 transition-all hover:bg-indigo-500">
          <i className="fas fa-plus"></i>
        </button>
      </div>

      <div className="space-y-4">
        {medicines.map((med) => (
          <div
            key={med.id}
            onClick={() => !med.completed && onToggle(med.id)}
            className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between group active:bg-slate-50 dark:active:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-5">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all ${
                  med.completed
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
                }`}
              >
                <i
                  className={
                    med.completed ? "fas fa-check-circle" : "fas fa-pills"
                  }
                ></i>
              </div>
              <div>
                <h4
                  className={`font-bold text-slate-800 dark:text-white ${
                    med.completed ? "opacity-50 line-through" : ""
                  }`}
                >
                  {med.name}
                </h4>
                <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">
                  {med.time}
                </p>
              </div>
            </div>
            {!med.completed && (
              <button
                onClick={(e) => {
                    e.stopPropagation();
                    onToggle(med.id);
                }}
                className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-black text-[10px] py-2 px-4 rounded-xl uppercase tracking-widest active:bg-indigo-600 active:text-white transition-all hover:bg-indigo-600 hover:text-white"
              >
                Tomar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicineList;