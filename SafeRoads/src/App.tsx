import { useState } from 'react';
import { LayoutDashboard, Car, FileText, Settings, AlertTriangle, Bell } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { Dashboard } from './components/Dashboard';
import { VehicleManagement } from './components/VehicleManagement';
import { HistoricalLog } from './components/HistoricalLog';
import { Toaster } from './components/ui/sonner';
import { mockAccidents, mockVehicles, mockSensors, mockHistoricalRecords } from './data/mockData';
import type { Accident, Vehicle } from './types';

export default function App() {
  const [accidents, setAccidents] = useState<Accident[]>(mockAccidents);
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleUpdateAccidentStatus = (id: string, status: Accident['estado']) => {
    setAccidents(accidents.map(acc => 
      acc.id === id ? { ...acc, estado: status } : acc
    ));
  };

  const handleAddVehicle = (vehicle: Omit<Vehicle, 'id'>) => {
    const newVehicle: Vehicle = {
      ...vehicle,
      id: `VEH-${String(vehicles.length + 1).padStart(3, '0')}`
    };
    setVehicles([...vehicles, newVehicle]);
  };

  const handleUpdateVehicle = (id: string, updates: Partial<Vehicle>) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  const pendingAccidentsCount = accidents.filter(a => a.estado === 'PENDIENTE_RESPUESTA').length;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">
                Sistema de Detección de Accidentes - Cochabamba
              </h1>
              <p className="text-slate-400 text-sm">Centro de Control de Emergencias</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-slate-300 text-sm">Sistema Activo</span>
            </div>
            {pendingAccidentsCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-red-950 rounded-lg border border-red-800 animate-pulse">
                <Bell className="w-4 h-4 text-red-400" />
                <span className="text-red-400 text-sm">
                  {pendingAccidentsCount} {pendingAccidentsCount === 1 ? 'alerta pendiente' : 'alertas pendientes'}
                </span>
              </div>
            )}
            <div className="text-right">
              <p className="text-white text-sm">Operador: Juan Pérez</p>
              <p className="text-slate-400 text-xs">Turno: 14:00 - 22:00</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[calc(100vh-140px)]">
          <TabsList className="bg-slate-900 border border-slate-800 mb-4">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-400"
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard Principal
              {pendingAccidentsCount > 0 && (
                <Badge className="ml-2 bg-red-600 text-white">{pendingAccidentsCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="vehicles" 
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-400"
            >
              <Car className="w-4 h-4 mr-2" />
              Gestión de Vehículos
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-400"
            >
              <FileText className="w-4 h-4 mr-2" />
              Registro Histórico
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-400"
            >
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </TabsTrigger>
          </TabsList>

          <div className="h-[calc(100%-52px)]">
            <TabsContent value="dashboard" className="h-full m-0">
              <Dashboard
                accidents={accidents}
                sensors={mockSensors}
                onUpdateAccidentStatus={handleUpdateAccidentStatus}
              />
            </TabsContent>

            <TabsContent value="vehicles" className="h-full m-0">
              <VehicleManagement
                vehicles={vehicles}
                onAddVehicle={handleAddVehicle}
                onUpdateVehicle={handleUpdateVehicle}
                onDeleteVehicle={handleDeleteVehicle}
              />
            </TabsContent>

            <TabsContent value="history" className="h-full m-0">
              <HistoricalLog records={mockHistoricalRecords} />
            </TabsContent>

            <TabsContent value="settings" className="h-full m-0">
              <div className="h-full bg-slate-900 rounded-lg border border-slate-700 p-6">
                <h2 className="text-white text-xl mb-4 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-blue-400" />
                  Configuración del Sistema
                </h2>
                <p className="text-slate-400">
                  Configuración de usuarios, notificaciones y parámetros del sistema.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                    <h3 className="text-white mb-2">Gestión de Usuarios</h3>
                    <p className="text-slate-400 text-sm">
                      Administrar cuentas de operadores y personal de emergencia
                    </p>
                  </div>
                  <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                    <h3 className="text-white mb-2">Configuración de Notificaciones</h3>
                    <p className="text-slate-400 text-sm">
                      Personalizar alertas y métodos de notificación automática
                    </p>
                  </div>
                  <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                    <h3 className="text-white mb-2">Parámetros de Sensores</h3>
                    <p className="text-slate-400 text-sm">
                      Ajustar umbrales de detección y sensibilidad de los acelerómetros
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </main>

      {/* Toast Notifications */}
      <Toaster 
        position="top-right" 
        theme="dark"
        richColors
      />
    </div>
  );
}
