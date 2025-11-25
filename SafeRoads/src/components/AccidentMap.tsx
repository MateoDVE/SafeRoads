import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './AccidentMap.css';
import type { Accident } from '../types';

interface AccidentMapProps {
  accidents: Accident[];
  selectedAccident: Accident | null;
  onAccidentClick: (accident: Accident) => void;
}

// Custom marker icons
const createCustomIcon = (color: string, isPending: boolean = false) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative">
        ${isPending ? `
          <div class="absolute inset-0 w-12 h-12 -left-4 -top-4">
            <div class="absolute inset-0 bg-red-500 rounded-full opacity-75 animate-ping"></div>
          </div>
        ` : ''}
        <div class="relative z-10 w-10 h-10 rounded-full ${color} shadow-lg border-2 border-white flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });
};

const vehicleIcon = L.divIcon({
  className: 'custom-marker',
  html: `
    <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
  `,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

// Component to handle map centering when accident is selected
function MapController({ selectedAccident }: { selectedAccident: Accident | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedAccident && selectedAccident.coordenadas) {
      map.setView([selectedAccident.coordenadas.lat, selectedAccident.coordenadas.lng], 15, {
        animate: true
      });
    }
  }, [selectedAccident, map]);
  
  return null;
}

export function AccidentMap({ accidents, selectedAccident, onAccidentClick }: AccidentMapProps) {
  // Cochabamba, Bolivia coordinates
  const centerPosition: [number, number] = [-17.3935, -66.1570];
  
  // Sample vehicle locations
  const activeVehicles = [
    { id: 1, lat: -17.3850, lng: -66.1650 },
    { id: 2, lat: -17.4000, lng: -66.1500 },
    { id: 3, lat: -17.3800, lng: -66.1700 }
  ];

  const getMarkerIcon = (accident: Accident) => {
    const isPending = accident.estado === 'PENDIENTE_RESPUESTA';
    
    switch (accident.estado) {
      case 'PENDIENTE_RESPUESTA':
        return createCustomIcon('bg-red-600', true);
      case 'EN_CAMINO':
        return createCustomIcon('bg-amber-500');
      default:
        return createCustomIcon('bg-gray-500');
    }
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-slate-700">
      <MapContainer
        center={centerPosition}
        zoom={13}
        style={{ height: '100%', width: '100%', minHeight: '400px' }}
        className="z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController selectedAccident={selectedAccident} />
        
        {/* Accident markers */}
        {accidents.map((accident) => {
          if (!accident.coordenadas) return null;
          
          return (
            <Marker
              key={accident.id}
              position={[accident.coordenadas.lat, accident.coordenadas.lng]}
              icon={getMarkerIcon(accident)}
              eventHandlers={{
                click: () => onAccidentClick(accident)
              }}
            >
              <Popup>
                <div className="p-2">
                  <p className="font-semibold text-slate-900">{accident.placa}</p>
                  <p className="text-sm text-red-600">{accident.tipo}</p>
                  <p className="text-sm text-slate-600">{accident.direccion}</p>
                  <p className="text-xs text-amber-600 mt-1">Hace {accident.tiempoTranscurrido}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Estado: <span className="font-medium">{accident.estado.replace('_', ' ')}</span>
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
        
        {/* Active vehicles markers */}
        {activeVehicles.map((vehicle) => (
          <Marker
            key={`vehicle-${vehicle.id}`}
            position={[vehicle.lat, vehicle.lng]}
            icon={vehicleIcon}
          >
            <Popup>
              <div className="p-2">
                <p className="text-sm font-semibold text-slate-900">Vehículo Activo #{vehicle.id}</p>
                <p className="text-xs text-slate-600">Patrullando la zona</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Legend overlay */}
      <div className="absolute bottom-4 right-4 bg-white/95 p-4 rounded-lg shadow-xl border border-slate-300 space-y-2 z-[1000]">
        <p className="text-slate-800 text-sm font-semibold mb-2">Leyenda</p>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-600 rounded-full" />
          <span className="text-xs text-slate-700">Pendiente de Respuesta</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-amber-500 rounded-full" />
          <span className="text-xs text-slate-700">En Camino</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-500 rounded-full" />
          <span className="text-xs text-slate-700">Atendido</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-xs text-slate-700">Vehículos Activos</span>
        </div>
      </div>
    </div>
  );
}
