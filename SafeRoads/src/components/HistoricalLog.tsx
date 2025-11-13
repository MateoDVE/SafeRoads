import { useState } from 'react';
import { FileText, Search, Calendar, Download } from 'lucide-react';
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
import { HistoricalRecord, AccidentType } from '../types';

interface HistoricalLogProps {
  records: HistoricalRecord[];
}

export function HistoricalLog({ records }: HistoricalLogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.conductor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.ubicacion.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = !dateFilter || record.fecha.includes(dateFilter);
    
    return matchesSearch && matchesDate;
  });

  const getTypeColor = (tipo: AccidentType) => {
    switch (tipo) {
      case 'IMPACTO':
        return 'bg-red-600 text-white';
      case 'VOLCADURA':
        return 'bg-orange-600 text-white';
      case 'DESACELERACION_BRUSCA':
        return 'bg-yellow-600 text-white';
    }
  };

  const handleExport = () => {
    // Simulated export functionality
    const dataStr = JSON.stringify(filteredRecords, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `historial-accidentes-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  return (
    <div className="h-full bg-slate-900 rounded-lg border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-xl flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-400" />
            Registro Histórico de Incidentes
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Total de registros: {records.length}
          </p>
        </div>
        <Button 
          onClick={handleExport}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar Datos
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Buscar por placa, conductor o ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Filtrar por fecha (ej: 28/10/2025)..."
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="border border-slate-700 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-800/50">
              <TableHead className="text-slate-300">ID</TableHead>
              <TableHead className="text-slate-300">Fecha/Hora</TableHead>
              <TableHead className="text-slate-300">Placa</TableHead>
              <TableHead className="text-slate-300">Conductor</TableHead>
              <TableHead className="text-slate-300">Tipo</TableHead>
              <TableHead className="text-slate-300">Ubicación</TableHead>
              <TableHead className="text-slate-300">Tiempo Respuesta</TableHead>
              <TableHead className="text-slate-300">Resultado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record.id} className="border-slate-700 hover:bg-slate-800/50">
                <TableCell className="text-slate-300">{record.id}</TableCell>
                <TableCell className="text-white">
                  <div>{record.fecha}</div>
                  <div className="text-xs text-slate-400">{record.hora}</div>
                </TableCell>
                <TableCell className="text-white">{record.placa}</TableCell>
                <TableCell className="text-slate-300">{record.conductor}</TableCell>
                <TableCell>
                  <Badge className={getTypeColor(record.tipo)}>
                    {record.tipo.replace(/_/g, ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-300">{record.ubicacion}</TableCell>
                <TableCell className="text-green-400">{record.tiempoRespuesta}</TableCell>
                <TableCell className="text-slate-300 text-sm">{record.resultado}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <FileText className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <p>No se encontraron registros</p>
            <p className="text-sm text-slate-500 mt-1">Intenta con otros criterios de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}
