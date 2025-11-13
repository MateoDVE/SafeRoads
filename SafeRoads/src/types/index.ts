export type AccidentStatus = 'PENDIENTE_RESPUESTA' | 'EN_CAMINO' | 'ATENDIDO';
export type AccidentType = 'IMPACTO' | 'VOLCADURA' | 'DESACELERACION_BRUSCA';
export type SensorStatus = 'CONECTADO' | 'DESCONECTADO' | 'ALERTA';

export interface Contact {
  id: string;
  nombre: string;
  telefono: string;
  relacion: string;
  notificado: boolean;
  horaNotificacion?: string;
}

export interface Vehicle {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
  conductor: string;
  telefonoContacto: string;
  sensorId: string;
  estado: 'activo' | 'inactivo';
}

export interface Accident {
  id: string;
  vehiculoId: string;
  placa: string;
  conductor: string;
  tipo: AccidentType;
  fecha: string;
  hora: string;
  coordenadas: {
    lat: number;
    lng: number;
  };
  direccion: string;
  estado: AccidentStatus;
  criticidad: 'CRITICA' | 'ALTA' | 'MEDIA';
  contactosNotificados: Contact[];
  tiempoTranscurrido: string;
  notas?: string;
  equipoAsignado?: string;
}

export interface Sensor {
  id: string;
  nombre: string;
  estado: SensorStatus;
  ultimaConexion: string;
  vehiculoAsociado?: string;
}

export interface HistoricalRecord {
  id: string;
  fecha: string;
  hora: string;
  placa: string;
  conductor: string;
  tipo: AccidentType;
  ubicacion: string;
  tiempoRespuesta: string;
  resultado: string;
}
