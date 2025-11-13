import { useState } from 'react';
import { Car, Plus, Edit, Trash2, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Label } from './ui/label';
import type { Vehicle } from '../types';
import { toast } from 'sonner';

interface VehicleManagementProps {
  vehicles: Vehicle[];
  onAddVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  onUpdateVehicle: (id: string, vehicle: Partial<Vehicle>) => void;
  onDeleteVehicle: (id: string) => void;
}

export function VehicleManagement({ 
  vehicles, 
  onAddVehicle, 
  onUpdateVehicle, 
  onDeleteVehicle 
}: VehicleManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState({
    placa: '',
    marca: '',
    modelo: '',
    conductor: '',
    telefonoContacto: '',
    sensorId: '',
    estado: 'activo' as 'activo' | 'inactivo'
  });

  const filteredVehicles = vehicles.filter(v =>
    v.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.conductor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.marca.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = (vehicle?: Vehicle) => {
    if (vehicle) {
      setEditingVehicle(vehicle);
      setFormData({
        placa: vehicle.placa,
        marca: vehicle.marca,
        modelo: vehicle.modelo,
        conductor: vehicle.conductor,
        telefonoContacto: vehicle.telefonoContacto,
        sensorId: vehicle.sensorId,
        estado: vehicle.estado
      });
    } else {
      setEditingVehicle(null);
      setFormData({
        placa: '',
        marca: '',
        modelo: '',
        conductor: '',
        telefonoContacto: '',
        sensorId: '',
        estado: 'activo'
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingVehicle) {
      onUpdateVehicle(editingVehicle.id, formData);
      toast.success('Vehículo actualizado exitosamente');
    } else {
      onAddVehicle(formData);
      toast.success('Vehículo agregado exitosamente');
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string, placa: string) => {
    if (confirm(`¿Está seguro de eliminar el vehículo ${placa}?`)) {
      onDeleteVehicle(id);
      toast.success('Vehículo eliminado exitosamente');
    }
  };

  return (
    <div className="h-full bg-slate-900 rounded-lg border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-xl flex items-center gap-2">
            <Car className="w-6 h-6 text-blue-400" />
            Gestión de Vehículos
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Total de vehículos registrados: {vehicles.length}
          </p>
        </div>
        <Button 
          onClick={() => handleOpenDialog()}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Vehículo
        </Button>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Buscar por placa, conductor o marca..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="border border-slate-700 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-800/50">
              <TableHead className="text-slate-300">Placa</TableHead>
              <TableHead className="text-slate-300">Marca/Modelo</TableHead>
              <TableHead className="text-slate-300">Conductor</TableHead>
              <TableHead className="text-slate-300">Teléfono</TableHead>
              <TableHead className="text-slate-300">Sensor ID</TableHead>
              <TableHead className="text-slate-300">Estado</TableHead>
              <TableHead className="text-slate-300 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.map((vehicle) => (
              <TableRow key={vehicle.id} className="border-slate-700 hover:bg-slate-800/50">
                <TableCell className="text-white">{vehicle.placa}</TableCell>
                <TableCell className="text-slate-300">
                  {vehicle.marca} {vehicle.modelo}
                </TableCell>
                <TableCell className="text-slate-300">{vehicle.conductor}</TableCell>
                <TableCell className="text-slate-300">{vehicle.telefonoContacto}</TableCell>
                <TableCell className="text-slate-300">{vehicle.sensorId}</TableCell>
                <TableCell>
                  <Badge className={
                    vehicle.estado === 'activo' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-600 text-white'
                  }>
                    {vehicle.estado.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenDialog(vehicle)}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(vehicle.id, vehicle.placa)}
                      className="border-red-600 text-red-400 hover:bg-red-950"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>
              {editingVehicle ? 'Editar Vehículo' : 'Agregar Nuevo Vehículo'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="placa" className="text-slate-300">Placa</Label>
                <Input
                  id="placa"
                  value={formData.placa}
                  onChange={(e) => setFormData({ ...formData, placa: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="CBB-1234"
                />
              </div>
              <div>
                <Label htmlFor="sensorId" className="text-slate-300">ID Sensor</Label>
                <Input
                  id="sensorId"
                  value={formData.sensorId}
                  onChange={(e) => setFormData({ ...formData, sensorId: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="SNS-001"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="marca" className="text-slate-300">Marca</Label>
                <Input
                  id="marca"
                  value={formData.marca}
                  onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="Toyota"
                />
              </div>
              <div>
                <Label htmlFor="modelo" className="text-slate-300">Modelo</Label>
                <Input
                  id="modelo"
                  value={formData.modelo}
                  onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="Corolla 2020"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="conductor" className="text-slate-300">Conductor</Label>
              <Input
                id="conductor"
                value={formData.conductor}
                onChange={(e) => setFormData({ ...formData, conductor: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="Nombre completo"
              />
            </div>
            <div>
              <Label htmlFor="telefono" className="text-slate-300">Teléfono de Contacto</Label>
              <Input
                id="telefono"
                value={formData.telefonoContacto}
                onChange={(e) => setFormData({ ...formData, telefonoContacto: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="+591 70123456"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {editingVehicle ? 'Actualizar' : 'Agregar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
