
import React from 'react';
import Layout from '../components/Layout';

const Health: React.FC = () => {
  const medicineList = [
    { id: '1', name: 'Vitamina D', time: '08:00', completed: true },
    { id: '2', name: 'Ômega 3', time: '12:00', completed: false },
    { id: '3', name: 'Magnésio', time: '21:00', completed: false },
  ];

  return (
    <Layout title="Ghz Saúde">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Water Intake Section */}
        <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400"></div>
          <h3 className="font-black text-2xl text-slate-800 dark:text-white mb-8">Hidratação Diária</h3>
          
          <div className="relative inline-flex items-center justify-center mb-8">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-slate-100 dark:text-slate-800"
              />
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 80}
                strokeDashoffset={2 * Math.PI * 80 * (1 - 1.6/2.0)}
                className="text-cyan-500"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter">1.6L</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Meta 2.0L</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button className="bg-cyan-50 dark:bg-cyan-950/30 p-4 rounded-3xl active:scale-95 transition-all">
              <p className="text-[10px] font-black text-cyan-600 dark:text-cyan-400 mb-1">COPO</p>
              <p className="text-lg font-black text-cyan-600 dark:text-cyan-400">200ml</p>
            </button>
            <button className="bg-indigo-600 p-4 rounded-3xl shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95 transition-all text-white">
              <p className="text-[10px] font-black opacity-70 mb-1">GARRAFA</p>
              <p className="text-lg font-black">500ml</p>
            </button>
             <button className="bg-cyan-50 dark:bg-cyan-950/30 p-4 rounded-3xl active:scale-95 transition-all">
              <p className="text-[10px] font-black text-cyan-600 dark:text-cyan-400 mb-1">PERSONAL</p>
              <i className="fas fa-edit text-cyan-600"></i>
            </button>
          </div>
        </section>

        {/* Medication and Appointments */}
        <section className="space-y-6">
          <div className="flex justify-between items-center px-4">
            <h3 className="font-black text-xl text-slate-800 dark:text-white">Lembretes Médicos</h3>
            <button className="w-10 h-10 bg-indigo-600 rounded-2xl text-white shadow-lg active:scale-90 transition-all">
              <i className="fas fa-plus"></i>
            </button>
          </div>
          
          <div className="space-y-4">
            {medicineList.map(med => (
              <div key={med.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between group active:bg-slate-50 dark:active:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all ${
                    med.completed 
                    ? 'bg-emerald-100 text-emerald-600' 
                    : 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400'
                  }`}>
                    <i className={med.completed ? 'fas fa-check-circle' : 'fas fa-pills'}></i>
                  </div>
                  <div>
                    <h4 className={`font-bold text-slate-800 dark:text-white ${med.completed ? 'opacity-50 line-through' : ''}`}>{med.name}</h4>
                    <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">{med.time}</p>
                  </div>
                </div>
                {!med.completed && (
                  <button className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-black text-[10px] py-2 px-4 rounded-xl uppercase tracking-widest active:bg-indigo-600 active:text-white transition-all">
                    Tomar
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden mt-8">
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <i className="fas fa-stethoscope"></i>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase opacity-70 tracking-widest">Próxima Consulta</p>
                <h4 className="font-black">Dra. Jéssica Camargo</h4>
                <p className="text-xs font-medium">05 de Outubro • 14:00</p>
              </div>
              <button className="bg-white text-indigo-600 p-2.5 rounded-xl text-xs font-black shadow-lg">
                MAPA
              </button>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8"></div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Health;
