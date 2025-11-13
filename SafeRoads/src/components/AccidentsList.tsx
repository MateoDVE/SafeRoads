import { AlertTriangle, Clock, Car } from 'lucide-react';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Accident } from '../types';

interface AccidentsListProps {
  accidents: Accident[];
  selectedAccident: Accident | null;
  onAccidentSelect: (accident: Accident) => void;
}

export function AccidentsList({ accidents, selectedAccident, onAccidentSelect }: AccidentsListProps) {
  const getStatusColor = (estado: Accident['estado']) => {
    switch (estado) {
      case 'PENDIENTE_RESPUESTA':
        return 'bg-red-600 text-white hover:bg-red-700';
      case 'EN_CAMINO':
        return 'bg-amber-500 text-white hover:bg-amber-600';
      case 'ATENDIDO':
        return 'bg-gray-600 text-white hover:bg-gray-700';
    }
  };

  const getCriticalityColor = (criticidad: Accident['criticidad']) => {
    switch (criticidad) {
      case 'CRITICA':
        return 'bg-red-600 text-white';
      case 'ALTA':
        return 'bg-amber-600 text-white';
      case 'MEDIA':
        return 'bg-yellow-600 text-white';
    }
  };

  const getTypeIcon = (tipo: Accident['tipo']) => {
    return <AlertTriangle className="w-4 h-4" />;
  };

  const sortedAccidents = [...accidents].sort((a, b) => {
    const criticalityOrder = { 'CRITICA': 0, 'ALTA': 1, 'MEDIA': 2 };
    const statusOrder = { 'PENDIENTE_RESPUESTA': 0, 'EN_CAMINO': 1, 'ATENDIDO': 2 };
    
    if (criticalityOrder[a.criticidad] !== criticalityOrder[b.criticidad]) {
      return criticalityOrder[a.criticidad] - criticalityOrder[b.criticidad];
    }
    return statusOrder[a.estado] - statusOrder[b.estado];
  });

  return (
    <div className="h-full bg-slate-900 rounded-lg border border-slate-700">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Alertas Activas
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          {accidents.filter(a => a.estado === 'PENDIENTE_RESPUESTA').length} pendientes de respuesta
        </p>
      </div>

      <ScrollArea className="h-[calc(100%-80px)]">
        <div className="p-2 space-y-2">
          {sortedAccidents.map((accident) => (
            <div
              key={accident.id}
              onClick={() => onAccidentSelect(accident)}
              className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
                selectedAccident?.id === accident.id
                  ? 'bg-slate-800 border-blue-500'
                  : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
              } ${
                accident.estado === 'PENDIENTE_RESPUESTA' ? 'ring-2 ring-red-500/50 animate-pulse' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className={getCriticalityColor(accident.criticidad)}>
                    {accident.criticidad}
                  </Badge>
                  <Badge variant="outline" className="text-slate-300 border-slate-600">
                    {accident.id}
                  </Badge>
                </div>
                <Badge className={getStatusColor(accident.estado)}>
                  {accident.estado.replace(/_/g, ' ')}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white">
                  <Car className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">{accident.placa}</span>
                  <span className="text-slate-400 text-sm">- {accident.conductor}</span>
                </div>

                <div className="flex items-start gap-2">
                  {getTypeIcon(accident.tipo)}
                  <div className="flex-1">
                    <p className="text-red-400 text-sm">
                      {accident.tipo.replace(/_/g, ' ')}
                    </p>
                    <p className="text-slate-400 text-xs mt-0.5">
                      {accident.direccion}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{accident.hora}</span>
                  </div>
                  <span className="text-amber-400 text-xs">
                    Hace {accident.tiempoTranscurrido}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {accidents.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">No hay alertas activas</p>
              <p className="text-slate-500 text-sm mt-1">El sistema está monitoreando</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
