import { Activity, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Sensor } from '../types';

interface SensorStatusProps {
  sensors: Sensor[];
}

export function SensorStatus({ sensors }: SensorStatusProps) {
  const getStatusIcon = (estado: Sensor['estado']) => {
    switch (estado) {
      case 'CONECTADO':
        return <Wifi className="w-4 h-4 text-green-500" />;
      case 'DESCONECTADO':
        return <WifiOff className="w-4 h-4 text-red-500" />;
      case 'ALERTA':
        return <AlertTriangle className="w-4 h-4 text-amber-500 animate-pulse" />;
    }
  };

  const getStatusColor = (estado: Sensor['estado']) => {
    switch (estado) {
      case 'CONECTADO':
        return 'bg-green-600 text-white';
      case 'DESCONECTADO':
        return 'bg-red-600 text-white';
      case 'ALERTA':
        return 'bg-amber-600 text-white';
    }
  };

  const connectedCount = sensors.filter(s => s.estado === 'CONECTADO').length;
  const alertCount = sensors.filter(s => s.estado === 'ALERTA').length;
  const disconnectedCount = sensors.filter(s => s.estado === 'DESCONECTADO').length;

  return (
    <div className="h-full bg-slate-900 rounded-lg border border-slate-700">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          Estado de Sensores
        </h2>
        <div className="flex gap-3 mt-3">
          <div className="text-center">
            <p className="text-2xl text-green-500">{connectedCount}</p>
            <p className="text-xs text-slate-400">Conectados</p>
          </div>
          <div className="text-center">
            <p className="text-2xl text-amber-500">{alertCount}</p>
            <p className="text-xs text-slate-400">En Alerta</p>
          </div>
          <div className="text-center">
            <p className="text-2xl text-red-500">{disconnectedCount}</p>
            <p className="text-xs text-slate-400">Desconectados</p>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100%-140px)]">
        <div className="p-2 space-y-2">
          {sensors.map((sensor) => (
            <div
              key={sensor.id}
              className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(sensor.estado)}
                  <span className="text-white text-sm">{sensor.id}</span>
                </div>
                <Badge className={getStatusColor(sensor.estado)}>
                  {sensor.estado}
                </Badge>
              </div>
              <p className="text-slate-400 text-xs mb-1">{sensor.nombre}</p>
              {sensor.vehiculoAsociado && (
                <p className="text-blue-400 text-xs">Vehículo: {sensor.vehiculoAsociado}</p>
              )}
              <p className="text-slate-500 text-xs mt-1">
                Última conexión: {sensor.ultimaConexion}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
