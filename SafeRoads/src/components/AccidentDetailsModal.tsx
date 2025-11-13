import { X, AlertTriangle, Car, MapPin, Clock, Phone, User, CheckCircle2, Ambulance, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import type { Accident } from '../types';
import { useState } from 'react';
import { toast } from 'sonner';

interface AccidentDetailsModalProps {
  accident: Accident | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: Accident['estado']) => void;
}

export function AccidentDetailsModal({ accident, isOpen, onClose, onUpdateStatus }: AccidentDetailsModalProps) {
  const [notes, setNotes] = useState(accident?.notas || '');

  if (!accident) return null;

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

  const handleAssignTeam = () => {
    toast.success('Equipo de respuesta asignado', {
      description: 'Ambulancia-06 ha sido notificada y está en camino'
    });
    onUpdateStatus(accident.id, 'EN_CAMINO');
  };

  const handleNotifyPolice = () => {
    toast.success('Policía notificada', {
      description: 'La unidad policial más cercana ha sido alertada'
    });
  };

  const handleMarkAttended = () => {
    toast.success('Accidente marcado como atendido', {
      description: 'El incidente ha sido resuelto exitosamente'
    });
    onUpdateStatus(accident.id, 'ATENDIDO');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-600 rounded-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <p>Detalles del Accidente</p>
                <p className="text-sm text-slate-400 mt-1">ID: {accident.id}</p>
              </div>
            </div>
            <Badge className={getCriticalityColor(accident.criticidad)}>
              {accident.criticidad}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Critical Information */}
          <div className="bg-red-950/30 border border-red-800 rounded-lg p-4">
            <h3 className="text-red-400 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Información Crítica del Evento
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-slate-400 text-sm">Tipo de Condición</p>
                <p className="text-white mt-1">{accident.tipo.replace(/_/g, ' ')}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Fecha y Hora</p>
                <p className="text-white mt-1">{accident.fecha} - {accident.hora}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Tiempo Transcurrido</p>
                <p className="text-amber-400 mt-1">Hace {accident.tiempoTranscurrido}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Estado Actual</p>
                <p className="text-white mt-1">{accident.estado.replace(/_/g, ' ')}</p>
              </div>
            </div>
          </div>

          {/* Vehicle and Driver Information */}
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-white mb-3 flex items-center gap-2">
              <Car className="w-4 h-4 text-blue-400" />
              Datos del Vehículo y Conductor
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-slate-400 text-sm">Placa del Vehículo</p>
                <p className="text-white mt-1">{accident.placa}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">ID del Vehículo</p>
                <p className="text-white mt-1">{accident.vehiculoId}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Conductor</p>
                <p className="text-white mt-1">{accident.conductor}</p>
              </div>
              {accident.equipoAsignado && (
                <div>
                  <p className="text-slate-400 text-sm">Equipo Asignado</p>
                  <p className="text-green-400 mt-1">{accident.equipoAsignado}</p>
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-white mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-400" />
              Ubicación del Incidente
            </h3>
            <p className="text-white mb-2">{accident.direccion}</p>
            <div className="flex gap-4 text-sm text-slate-400">
              <span>Latitud: {accident.coordenadas.lat}</span>
              <span>Longitud: {accident.coordenadas.lng}</span>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-white mb-3 flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-400" />
              Contactos de Emergencia Notificados
            </h3>
            <div className="space-y-3">
              {accident.contactosNotificados.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 bg-slate-900 rounded border border-slate-700">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-white">{contact.nombre}</p>
                      <p className="text-slate-400 text-sm">{contact.relacion}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white">{contact.telefono}</p>
                    {contact.notificado && (
                      <div className="flex items-center gap-1 text-green-400 text-sm mt-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Notificado {contact.horaNotificacion}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-white mb-3 flex items-center gap-2">
              <Ambulance className="w-4 h-4 text-blue-400" />
              Acciones de Respuesta
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <Button 
                onClick={handleAssignTeam}
                disabled={accident.estado !== 'PENDIENTE_RESPUESTA'}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Ambulance className="w-4 h-4 mr-2" />
                Asignar Equipo
              </Button>
              <Button 
                onClick={handleNotifyPolice}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Shield className="w-4 h-4 mr-2" />
                Notificar Policía
              </Button>
              <Button 
                onClick={handleMarkAttended}
                disabled={accident.estado === 'ATENDIDO'}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Marcar Atendido
              </Button>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-white mb-3">Notas de Respuesta</h3>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Agregar notas sobre el incidente, estado del paciente, acciones tomadas..."
              className="min-h-[100px] bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
            />
            <div className="flex justify-end mt-3">
              <Button 
                onClick={() => toast.success('Notas guardadas exitosamente')}
                variant="outline" 
                className="border-slate-600 text-white hover:bg-slate-700"
              >
                Guardar Notas
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
