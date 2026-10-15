import React, { useState } from 'react';
import { Booking } from '../types';
import { Search, CheckCircle2, Clock, Wrench, Shield, Car, PhoneCall, AlertCircle } from 'lucide-react';

interface LiveVehicleTrackerProps {
  bookings: Booking[];
}

export const LiveVehicleTracker: React.FC<LiveVehicleTrackerProps> = ({ bookings }) => {
  const [searchQuery, setSearchQuery] = useState<string>('VAW-49210');
  const [selectedTicketId, setSelectedTicketId] = useState<string>('VAW-49210');

  const currentBooking = bookings.find(
    (b) => b.id.toUpperCase() === selectedTicketId.toUpperCase()
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const found = bookings.find(
      (b) => b.id.toUpperCase() === searchQuery.trim().toUpperCase()
    );
    if (found) {
      setSelectedTicketId(found.id);
    }
  };

  const steps = [
    { key: 'received', label: '1. Vehicle Received & Key Tagged' },
    { key: 'inspection', label: '2. Multi-Point Digital Inspection' },
    { key: 'authorized', label: '3. Scope & Client Authorization' },
    { key: 'in_progress', label: '4. Precision Service in Progress' },
    { key: 'ready', label: '5. Quality Road Test & Ready' }
  ];

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const order = ['received', 'inspection', 'authorized', 'in_progress', 'ready'];
    const currentIndex = order.indexOf(currentStatus);
    const stepIndex = order.indexOf(stepKey);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'upcoming';
  };

  return (
    <section id="tracker" className="py-16 lg:py-24 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2 font-mono">
            Real-Time Workshop Telemetry
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Live Vehicle Service & Bay Progress Tracker
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Track your car's exact status in our workshop bays in real-time. Enter your booking ticket code or test the demo vehicles currently in service.
          </p>
        </div>

        {/* Search Bar & Demo Ticket Switchers */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Form */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                  placeholder="Enter Ticket ID (e.g. VAW-49210)"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-md pl-10 pr-3 py-2.5 text-sm text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-amber-400 uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-md transition-colors whitespace-nowrap cursor-pointer"
              >
                Track Vehicle
              </button>
            </form>

            {/* Quick Demo Switchers */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-neutral-400 font-mono text-[11px]">Active Bay Demos:</span>
              {bookings.slice(0, 3).map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    setSelectedTicketId(b.id);
                    setSearchQuery(b.id);
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer border ${
                    selectedTicketId === b.id
                      ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400'
                      : 'bg-neutral-950 text-neutral-300 border-neutral-700 hover:border-neutral-500'
                  }`}
                >
                  {b.id} ({b.vehicle.make})
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Current Vehicle Status Card */}
        {currentBooking ? (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
            
            {/* Header Strip */}
            <div className="p-6 bg-neutral-950/80 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center text-amber-400">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <span className="text-amber-400 font-bold">{currentBooking.id}</span>
                    <span aria-hidden="true">·</span>
                    <span>License: {currentBooking.vehicle.licensePlate || 'N/A'}</span>
                    <span aria-hidden="true">·</span>
                    <span>Odometer: {currentBooking.vehicle.mileage.toLocaleString()} mi</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    {currentBooking.vehicle.year} {currentBooking.vehicle.make} {currentBooking.vehicle.model}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-6 text-right">
                <div>
                  <div className="text-[10px] uppercase font-mono text-neutral-400">Assigned Bay</div>
                  <div className="text-sm font-bold text-white font-mono">
                    Bay #{currentBooking.bayNumber} (Performance Lift)
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono text-neutral-400">Est. Completion</div>
                  <div className="text-sm font-bold text-amber-400 font-mono tabular-nums">
                    {currentBooking.estimatedCompletion}
                  </div>
                </div>
              </div>
            </div>

            {/* Visual 5-Stage Step Timeline */}
            <div className="p-6 lg:p-8 border-b border-neutral-800">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-6">
                Active Service Progression Timeline
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {steps.map((st, i) => {
                  const status = getStepStatus(st.key, currentBooking.status);

                  return (
                    <div
                      key={st.key}
                      className={`p-4 rounded-xl border transition-all ${
                        status === 'completed'
                          ? 'bg-neutral-950 border-emerald-500/30'
                          : status === 'active'
                          ? 'bg-amber-950/20 border-amber-500/60 ring-1 ring-amber-500/40'
                          : 'bg-neutral-950/40 border-neutral-800 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-semibold text-neutral-400">
                          Step 0{i + 1}
                        </span>
                        {status === 'completed' && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                        {status === 'active' && (
                          <span className="text-[10px] font-mono font-bold text-amber-400 px-1.5 py-0.5 bg-amber-400/10 rounded">
                            IN BAY
                          </span>
                        )}
                        {status === 'upcoming' && (
                          <Clock className="w-4 h-4 text-neutral-600" />
                        )}
                      </div>

                      <div
                        className={`text-xs font-semibold leading-tight ${
                          status === 'active'
                            ? 'text-white'
                            : status === 'completed'
                            ? 'text-neutral-200'
                            : 'text-neutral-400'
                        }`}
                      >
                        {st.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Technician Details & Job Scope */}
            <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left: Lead Master Technician */}
              <div className="lg:col-span-5 bg-neutral-950 p-5 rounded-xl border border-neutral-800">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                  Assigned Master Lead Technician
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                    {currentBooking.assignedTechnician.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{currentBooking.assignedTechnician}</h4>
                    <p className="text-xs text-neutral-400">{currentBooking.technicianTitle}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-800 text-xs text-neutral-300 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Intake Notes:</span>
                    <span className="text-right text-neutral-200 max-w-[220px]">{currentBooking.notes || 'None noted'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Mobility Option:</span>
                    <span className="text-amber-400 capitalize">{currentBooking.dropOffType} Service</span>
                  </div>
                </div>
              </div>

              {/* Right: Itemized Work Packages */}
              <div className="lg:col-span-7 space-y-3">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                  Authorized Work In Progress ({currentBooking.services.length} items)
                </span>

                <div className="space-y-2">
                  {currentBooking.services.map((srv, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <Wrench className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <div className="font-semibold text-white">{srv.name}</div>
                          <div className="text-neutral-400 text-[11px]">{srv.tagline}</div>
                        </div>
                      </div>
                      <div className="font-mono text-neutral-200 tabular-nums font-semibold shrink-0">
                        ${srv.price}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Approved Service Bay Total:</span>
                  <span className="font-mono text-lg font-bold text-amber-400 tabular-nums">
                    ${currentBooking.totalCost}
                  </span>
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="p-12 text-center bg-neutral-900 border border-neutral-800 rounded-2xl">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">Ticket Not Found</h3>
            <p className="text-sm text-neutral-400 mt-1 max-w-md mx-auto">
              No active vehicle was found matching ticket ID "{searchQuery}". Please check your 8-digit confirmation code or select one of the active demo tickets above.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
