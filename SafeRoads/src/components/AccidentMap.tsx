import { MapPin, AlertCircle } from 'lucide-react';
import type { Accident } from '../types';

interface AccidentMapProps {
  accidents: Accident[];
  selectedAccident: Accident | null;
  onAccidentClick: (accident: Accident) => void;
}

export function AccidentMap({ accidents, selectedAccident, onAccidentClick }: AccidentMapProps) {
  return (
    <div className="relative w-full h-full bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
      {/* Simulated Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900">
        {/* Grid overlay to simulate map */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Map Label */}
        <div className="absolute top-4 left-4 bg-slate-900/90 px-4 py-2 rounded-lg border border-slate-600">
          <p className="text-slate-300 text-sm">Mapa de Cochabamba - Vista en Tiempo Real</p>
        </div>

        {/* Coordinates display */}
        <div className="absolute bottom-4 left-4 bg-slate-900/90 px-3 py-1.5 rounded border border-slate-600">
          <p className="text-slate-400 text-xs">Lat: -17.3935 | Lng: -66.1570</p>
        </div>

        {/* Active vehicles markers */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        <div className="absolute top-2/3 left-2/3 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        
        {/* Accident markers */}
        {accidents.map((accident, index) => {
          const isSelected = selectedAccident?.id === accident.id;
          const isPending = accident.estado === 'PENDIENTE_RESPUESTA';
          
          // Position based on index for demo
          const positions = [
            { top: '35%', left: '45%' },
            { top: '55%', left: '60%' },
            { top: '25%', left: '70%' }
          ];
          
          const position = positions[index] || positions[0];
          
          return (
            <div
              key={accident.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={position}
              onClick={() => onAccidentClick(accident)}
            >
              {/* Pulsing ring for pending accidents */}
              {isPending && (
                <div className="absolute inset-0 w-16 h-16 -left-6 -top-6">
                  <div className="absolute inset-0 bg-red-500 rounded-full opacity-75 animate-ping" />
                  <div className="absolute inset-0 bg-red-500 rounded-full opacity-50 animate-pulse" />
                </div>
              )}
              
              {/* Main marker */}
              <div className={`relative z-10 ${
                isSelected ? 'scale-125' : 'scale-100'
              } transition-transform`}>
                <div className={`p-3 rounded-full ${
                  accident.estado === 'PENDIENTE_RESPUESTA' ? 'bg-red-600 animate-pulse' :
                  accident.estado === 'EN_CAMINO' ? 'bg-amber-500' :
                  'bg-gray-500'
                } shadow-lg border-2 border-white`}>
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                
                {/* Tooltip */}
                <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-slate-900 px-4 py-3 rounded-lg border border-slate-600 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                  <p className="text-white">{accident.placa}</p>
                  <p className="text-xs text-red-400">{accident.tipo}</p>
                  <p className="text-xs text-slate-400">{accident.direccion}</p>
                  <p className="text-xs text-amber-400">Hace {accident.tiempoTranscurrido}</p>
                </div>
              </div>
              
              {/* Direction indicator line */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1">
                <MapPin className={`w-5 h-5 ${
                  accident.estado === 'PENDIENTE_RESPUESTA' ? 'text-red-600' :
                  accident.estado === 'EN_CAMINO' ? 'text-amber-500' :
                  'text-gray-500'
                }`} />
              </div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-slate-900/95 p-4 rounded-lg border border-slate-600 space-y-2">
          <p className="text-slate-300 text-sm mb-2">Leyenda</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded-full" />
            <span className="text-xs text-slate-400">Pendiente de Respuesta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full" />
            <span className="text-xs text-slate-400">En Camino</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full" />
            <span className="text-xs text-slate-400">Atendido</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-xs text-slate-400">Vehículos Activos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
