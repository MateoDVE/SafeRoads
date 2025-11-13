import type { Accident } from '../types';
import type { HistoricalRecord } from '../types';
import type { Sensor } from '../types';
import type { Vehicle } from '../types';


export const mockAccidents: Accident[] = [
  {
    id: 'ACC-001',
    vehiculoId: 'VEH-001',
    placa: 'CBB-4567',
    conductor: 'Juan Carlos Pérez',
    tipo: 'IMPACTO',
    fecha: '28/10/2025',
    hora: '14:23:15',
    coordenadas: { lat: -17.3935, lng: -66.1570 },
    direccion: 'Av. América esquina Av. Heroínas',
    estado: 'PENDIENTE_RESPUESTA',
    criticidad: 'CRITICA',
    tiempoTranscurrido: '2 min',
    contactosNotificados: [
      {
        id: 'C1',
        nombre: 'María Pérez de González',
        telefono: '+591 4 4567890',
        relacion: 'Esposa',
        notificado: true,
        horaNotificacion: '14:23:18'
      },
      {
        id: 'C2',
        nombre: 'Roberto Pérez Mendoza',
        telefono: '+591 70123456',
        relacion: 'Hermano',
        notificado: true,
        horaNotificacion: '14:23:18'
      }
    ]
  },
  {
    id: 'ACC-002',
    vehiculoId: 'VEH-002',
    placa: 'CBB-8923',
    conductor: 'Ana María Rojas',
    tipo: 'DESACELERACION_BRUSCA',
    fecha: '28/10/2025',
    hora: '14:15:42',
    coordenadas: { lat: -17.4139, lng: -66.1653 },
    direccion: 'Av. Blanco Galindo Km 4',
    estado: 'EN_CAMINO',
    criticidad: 'ALTA',
    tiempoTranscurrido: '10 min',
    equipoAsignado: 'Ambulancia-05',
    contactosNotificados: [
      {
        id: 'C3',
        nombre: 'Luis Rojas Fernández',
        telefono: '+591 71234567',
        relacion: 'Padre',
        notificado: true,
        horaNotificacion: '14:15:45'
      }
    ]
  },
  {
    id: 'ACC-003',
    vehiculoId: 'VEH-005',
    placa: 'CBB-2341',
    conductor: 'Miguel Ángel Vargas',
    tipo: 'VOLCADURA',
    fecha: '28/10/2025',
    hora: '13:58:20',
    coordenadas: { lat: -17.3686, lng: -66.1592 },
    direccion: 'Circunvalación altura Cala Cala',
    estado: 'ATENDIDO',
    criticidad: 'CRITICA',
    tiempoTranscurrido: '28 min',
    equipoAsignado: 'Ambulancia-02, Bomberos-03',
    notas: 'Paciente trasladado a Hospital Viedma. Lesiones moderadas.',
    contactosNotificados: [
      {
        id: 'C4',
        nombre: 'Sandra Vargas López',
        telefono: '+591 72345678',
        relacion: 'Esposa',
        notificado: true,
        horaNotificacion: '13:58:22'
      }
    ]
  }
];

export const mockVehicles: Vehicle[] = [
  {
    id: 'VEH-001',
    placa: 'CBB-4567',
    marca: 'Toyota',
    modelo: 'Corolla 2020',
    conductor: 'Juan Carlos Pérez',
    telefonoContacto: '+591 70987654',
    sensorId: 'SNS-001',
    estado: 'activo'
  },
  {
    id: 'VEH-002',
    placa: 'CBB-8923',
    marca: 'Nissan',
    modelo: 'Sentra 2019',
    conductor: 'Ana María Rojas',
    telefonoContacto: '+591 71234567',
    sensorId: 'SNS-002',
    estado: 'activo'
  },
  {
    id: 'VEH-003',
    placa: 'CBB-1122',
    marca: 'Hyundai',
    modelo: 'Accent 2021',
    conductor: 'Carlos Mendoza',
    telefonoContacto: '+591 72456789',
    sensorId: 'SNS-003',
    estado: 'activo'
  },
  {
    id: 'VEH-004',
    placa: 'CBB-5566',
    marca: 'Chevrolet',
    modelo: 'Cruze 2018',
    conductor: 'Patricia Sánchez',
    telefonoContacto: '+591 73567890',
    sensorId: 'SNS-004',
    estado: 'activo'
  },
  {
    id: 'VEH-005',
    placa: 'CBB-2341',
    marca: 'Mazda',
    modelo: 'Mazda3 2022',
    conductor: 'Miguel Ángel Vargas',
    telefonoContacto: '+591 74678901',
    sensorId: 'SNS-005',
    estado: 'activo'
  }
];

export const mockSensors: Sensor[] = [
  {
    id: 'SNS-001',
    nombre: 'Sensor Acelerómetro CBB-4567',
    estado: 'ALERTA',
    ultimaConexion: '14:23:15',
    vehiculoAsociado: 'CBB-4567'
  },
  {
    id: 'SNS-002',
    nombre: 'Sensor Acelerómetro CBB-8923',
    estado: 'ALERTA',
    ultimaConexion: '14:15:42',
    vehiculoAsociado: 'CBB-8923'
  },
  {
    id: 'SNS-003',
    nombre: 'Sensor Acelerómetro CBB-1122',
    estado: 'CONECTADO',
    ultimaConexion: '14:25:00',
    vehiculoAsociado: 'CBB-1122'
  },
  {
    id: 'SNS-004',
    nombre: 'Sensor Acelerómetro CBB-5566',
    estado: 'CONECTADO',
    ultimaConexion: '14:24:55',
    vehiculoAsociado: 'CBB-5566'
  },
  {
    id: 'SNS-005',
    nombre: 'Sensor Acelerómetro CBB-2341',
    estado: 'CONECTADO',
    ultimaConexion: '14:24:58',
    vehiculoAsociado: 'CBB-2341'
  }
];

export const mockHistoricalRecords: HistoricalRecord[] = [
  {
    id: 'HIST-001',
    fecha: '28/10/2025',
    hora: '13:58:20',
    placa: 'CBB-2341',
    conductor: 'Miguel Ángel Vargas',
    tipo: 'VOLCADURA',
    ubicacion: 'Circunvalación altura Cala Cala',
    tiempoRespuesta: '5 min 30 seg',
    resultado: 'Atendido - Trasladado a Hospital Viedma'
  },
  {
    id: 'HIST-002',
    fecha: '27/10/2025',
    hora: '18:45:12',
    placa: 'CBB-7788',
    conductor: 'Roberto Guzmán',
    tipo: 'IMPACTO',
    ubicacion: 'Av. Petrolera y Av. Circunvalación',
    tiempoRespuesta: '4 min 15 seg',
    resultado: 'Atendido - Sin lesiones graves'
  },
  {
    id: 'HIST-003',
    fecha: '27/10/2025',
    hora: '11:20:33',
    placa: 'CBB-3344',
    conductor: 'Silvia Torres',
    tipo: 'DESACELERACION_BRUSCA',
    ubicacion: 'Av. América altura Plaza Colón',
    tiempoRespuesta: '6 min 45 seg',
    resultado: 'Falsa alarma - Frenado de emergencia'
  },
  {
    id: 'HIST-004',
    fecha: '26/10/2025',
    hora: '16:30:05',
    placa: 'CBB-9988',
    conductor: 'Fernando Morales',
    tipo: 'IMPACTO',
    ubicacion: 'Av. Blanco Galindo Km 6',
    tiempoRespuesta: '7 min 20 seg',
    resultado: 'Atendido - Lesiones leves'
  },
  {
    id: 'HIST-005',
    fecha: '26/10/2025',
    hora: '09:15:48',
    placa: 'CBB-5544',
    conductor: 'Laura Jiménez',
    tipo: 'VOLCADURA',
    ubicacion: 'Av. Circunvalación altura Quillacollo',
    tiempoRespuesta: '8 min 10 seg',
    resultado: 'Atendido - Trasladado a Hospital Germán Urquidi'
  }
];
