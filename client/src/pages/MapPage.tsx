import { useState } from 'react';
import VenueMap from '../components/Map/VenueMap';
import MapControls from '../components/Map/MapControls';
import { Map as MapIcon } from 'lucide-react';

export default function MapPage() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  return (
    <div className="pb-20 lg:pb-0">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-emerald-500/20">
          <MapIcon className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Venue Map</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Pragati Maidan, New Delhi · Interactive floor plan</p>
        </div>
      </div>

      <MapControls
        onSearch={(q) => console.log('Search:', q)}
        onLocateMe={() => setSelectedZone('entrance')}
      />

      <VenueMap selectedZone={selectedZone} onSelectZone={setSelectedZone} />
    </div>
  );
}
