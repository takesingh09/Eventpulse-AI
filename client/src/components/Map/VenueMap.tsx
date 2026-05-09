import { MapPin, Navigation, ParkingCircle, UtensilsCrossed, Coffee } from 'lucide-react';
import type { VenueZone } from '../../types';

const VENUE_ZONES: VenueZone[] = [
  { id: 'entrance', name: 'Main Entrance', type: 'entrance', lat: 28.6139, lng: 77.2090, capacity: 0, description: 'Main registration and entry point', directions: 'You are here!' },
  { id: 'hall-a', name: 'Hall A - Main Stage', type: 'hall', lat: 28.6145, lng: 77.2095, capacity: 500, description: 'Keynotes and main track sessions', directions: 'From entrance, go straight 100m. Hall A is on your right.' },
  { id: 'hall-b', name: 'Hall B', type: 'hall', lat: 28.6142, lng: 77.2100, capacity: 300, description: 'Parallel track sessions', directions: 'From entrance, go straight then turn right at the info desk.' },
  { id: 'workshop', name: 'Workshop Zone', type: 'workshop', lat: 28.6135, lng: 77.2098, capacity: 80, description: 'Hands-on workshops and labs', directions: 'Take the elevator to Floor 2, Room 201.' },
  { id: 'networking', name: 'Networking Lounge', type: 'networking', lat: 28.6148, lng: 77.2088, capacity: 150, description: 'Open lounge for networking and meetups', directions: 'Ground floor, left of the main entrance.' },
  { id: 'food', name: 'Food Court', type: 'food', lat: 28.6133, lng: 77.2085, capacity: 200, description: 'Restaurants, cafes, and snack bars', directions: 'Basement level, accessible via escalator near entrance.' },
  { id: 'restroom', name: 'Restrooms', type: 'restroom', lat: 28.6140, lng: 77.2093, capacity: 0, description: 'Available on all floors', directions: 'Every floor near the elevators.' },
  { id: 'registration', name: 'Registration Desk', type: 'registration', lat: 28.6139, lng: 77.2091, capacity: 0, description: 'Badge pickup and information', directions: 'Immediately inside the main entrance.' },
];

interface Props {
  selectedZone: string | null;
  onSelectZone: (zoneId: string | null) => void;
}

export default function VenueMap({ selectedZone, onSelectZone }: Props) {
  const selected = VENUE_ZONES.find(z => z.id === selectedZone);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map Area */}
      <div className="lg:col-span-2 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden">
        <div className="relative w-full h-[500px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
          {/* Interactive venue SVG map */}
          <svg viewBox="0 0 800 500" className="w-full h-full p-8" xmlns="http://www.w3.org/2000/svg">
            {/* Building outline */}
            <rect x="100" y="50" width="600" height="400" rx="20" fill="none" stroke="currentColor" className="text-slate-300 dark:text-slate-600" strokeWidth="2" />
            
            {/* Zones */}
            <g className="cursor-pointer" onClick={() => onSelectZone('entrance')}>
              <rect x="320" y="380" width="160" height="60" rx="8" className={`transition-all ${selectedZone === 'entrance' ? 'fill-indigo-500/40 stroke-indigo-500' : 'fill-emerald-500/20 stroke-emerald-500/50'}`} strokeWidth="2" />
              <text x="400" y="415" textAnchor="middle" className="fill-slate-700 dark:fill-slate-300 text-xs font-medium">Main Entrance</text>
            </g>
            
            <g className="cursor-pointer" onClick={() => onSelectZone('hall-a')}>
              <rect x="130" y="80" width="250" height="130" rx="10" className={`transition-all ${selectedZone === 'hall-a' ? 'fill-indigo-500/40 stroke-indigo-500' : 'fill-purple-500/20 stroke-purple-500/50'}`} strokeWidth="2" />
              <text x="255" y="140" textAnchor="middle" className="fill-slate-700 dark:fill-slate-300 text-sm font-semibold">Hall A</text>
              <text x="255" y="160" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 text-[10px]">Main Stage · 500 seats</text>
            </g>
            
            <g className="cursor-pointer" onClick={() => onSelectZone('hall-b')}>
              <rect x="420" y="80" width="250" height="130" rx="10" className={`transition-all ${selectedZone === 'hall-b' ? 'fill-indigo-500/40 stroke-indigo-500' : 'fill-blue-500/20 stroke-blue-500/50'}`} strokeWidth="2" />
              <text x="545" y="140" textAnchor="middle" className="fill-slate-700 dark:fill-slate-300 text-sm font-semibold">Hall B</text>
              <text x="545" y="160" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 text-[10px]">300 seats</text>
            </g>
            
            <g className="cursor-pointer" onClick={() => onSelectZone('workshop')}>
              <rect x="130" y="240" width="200" height="100" rx="10" className={`transition-all ${selectedZone === 'workshop' ? 'fill-indigo-500/40 stroke-indigo-500' : 'fill-orange-500/20 stroke-orange-500/50'}`} strokeWidth="2" />
              <text x="230" y="290" textAnchor="middle" className="fill-slate-700 dark:fill-slate-300 text-xs font-semibold">Workshop Zone</text>
              <text x="230" y="308" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 text-[10px]">Floor 2 · 80 seats</text>
            </g>
            
            <g className="cursor-pointer" onClick={() => onSelectZone('networking')}>
              <rect x="370" y="240" width="180" height="100" rx="10" className={`transition-all ${selectedZone === 'networking' ? 'fill-indigo-500/40 stroke-indigo-500' : 'fill-cyan-500/20 stroke-cyan-500/50'}`} strokeWidth="2" />
              <text x="460" y="290" textAnchor="middle" className="fill-slate-700 dark:fill-slate-300 text-xs font-semibold">Networking</text>
              <text x="460" y="308" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 text-[10px]">Lounge · 150 seats</text>
            </g>
            
            <g className="cursor-pointer" onClick={() => onSelectZone('food')}>
              <rect x="590" y="240" width="80" height="100" rx="10" className={`transition-all ${selectedZone === 'food' ? 'fill-indigo-500/40 stroke-indigo-500' : 'fill-amber-500/20 stroke-amber-500/50'}`} strokeWidth="2" />
              <text x="630" y="295" textAnchor="middle" className="fill-slate-700 dark:fill-slate-300 text-[10px] font-semibold">Food</text>
            </g>

            {/* You are here indicator */}
            <circle cx="400" cy="460" r="6" className="fill-red-500 animate-pulse" />
            <text x="400" y="480" textAnchor="middle" className="fill-red-500 text-[10px] font-medium">📍 You are here</text>
          </svg>
        </div>
      </div>

      {/* Zone Info Sidebar */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-indigo-500" /> Venue Zones
        </h3>

        {selected ? (
          <div className="bg-white dark:bg-white/5 rounded-xl border border-indigo-500/30 p-4 animate-fade-in">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{selected.name}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{selected.description}</p>
            {selected.capacity > 0 && (
              <p className="text-xs text-slate-400 mb-2">Capacity: {selected.capacity} people</p>
            )}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/30">
              <Navigation className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
              <p className="text-xs text-indigo-700 dark:text-indigo-300">{selected.directions}</p>
            </div>
            <button onClick={() => onSelectZone(null)} className="mt-3 text-xs text-slate-400 hover:text-indigo-500 transition">
              ← Back to all zones
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {VENUE_ZONES.map(zone => (
              <button
                key={zone.id}
                onClick={() => onSelectZone(zone.id)}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-indigo-500/30 transition text-left"
              >
                <span className="text-lg">
                  {zone.type === 'hall' && '🏛️'}
                  {zone.type === 'workshop' && '🔧'}
                  {zone.type === 'food' && '🍽️'}
                  {zone.type === 'networking' && '🤝'}
                  {zone.type === 'entrance' && '🚪'}
                  {zone.type === 'registration' && '📋'}
                  {zone.type === 'restroom' && '🚻'}
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{zone.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{zone.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Nearby Facilities */}
        <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-4">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Nearby Facilities</h4>
          <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2"><ParkingCircle className="w-4 h-4" /> Parking: 200m south</div>
            <div className="flex items-center gap-2"><UtensilsCrossed className="w-4 h-4" /> Restaurants: 3 within 500m</div>
            <div className="flex items-center gap-2"><Coffee className="w-4 h-4" /> Café: Ground floor lobby</div>
          </div>
        </div>
      </div>
    </div>
  );
}
