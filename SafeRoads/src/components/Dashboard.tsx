import { useState } from 'react';
import { AccidentMap } from './AccidentMap';
import { AccidentsList } from './AccidentsList';
import { AccidentDetailsModal } from './AccidentDetailsModal';
import { SensorStatus } from './SensorStatus';
import { Accident } from '../types';

interface DashboardProps {
  accidents: Accident[];
  sensors: any[];
  onUpdateAccidentStatus: (id: string, status: Accident['estado']) => void;
}

export function Dashboard({ accidents, sensors, onUpdateAccidentStatus }: DashboardProps) {
  const [selectedAccident, setSelectedAccident] = useState<Accident | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAccidentSelect = (accident: Accident) => {
    setSelectedAccident(accident);
    setIsModalOpen(true);
  };

  return (
    <div className="h-full grid grid-cols-12 gap-4">
      {/* Main Map Area */}
      <div className="col-span-8 h-full overflow-hidden">
        <div className="h-full">
          <AccidentMap
            accidents={accidents}
            selectedAccident={selectedAccident}
            onAccidentClick={handleAccidentSelect}
          />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="col-span-4 h-full space-y-4 overflow-hidden">
        {/* Sensor Status */}
        <div className="h-[280px] overflow-hidden">
          <SensorStatus sensors={sensors} />
        </div>

        {/* Accidents List */}
        <div className="h-[calc(100%-296px)]">
          <AccidentsList
            accidents={accidents}
            selectedAccident={selectedAccident}
            onAccidentSelect={handleAccidentSelect}
          />
        </div>
      </div>

      {/* Accident Details Modal */}
      <AccidentDetailsModal
        accident={selectedAccident}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdateStatus={onUpdateAccidentStatus}
      />
    </div>
  );
}
