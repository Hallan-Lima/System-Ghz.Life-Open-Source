import React from "react";
import { Appointment } from "../health.types";

interface AppointmentCardProps {
  appointment: Appointment | null;
}

/**
 * @author HallTech AI
 * Card estilizado para exibir a próxima consulta médica.
 */
const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  if (!appointment) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden mt-8">
      <div className="relative z-10 flex items-center gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
          <i className="fas fa-stethoscope"></i>
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase opacity-70 tracking-widest">
            Próxima Consulta
          </p>
          <h4 className="font-black">{appointment.doctorName}</h4>
          <p className="text-xs font-medium">
            {appointment.date} • {appointment.time}
          </p>
        </div>
        <button className="bg-white text-indigo-600 p-2.5 rounded-xl text-xs font-black shadow-lg hover:bg-slate-100 transition-colors">
          MAPA
        </button>
      </div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8 pointer-events-none"></div>
    </div>
  );
};

export default AppointmentCard;