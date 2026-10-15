import React, { useState } from 'react';
import { DEMO_INSPECTION_SAMPLE } from '../data/servicesData';
import { Camera, CheckCircle, AlertTriangle, AlertOctagon, Smartphone, ShieldCheck, Check } from 'lucide-react';

export const DigitalInspectionShowcase: React.FC = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const [approvedItems, setApprovedItems] = useState<Record<string, boolean>>({
    'Brake Fluid Moisture Content': true
  });

  const activeCategory = DEMO_INSPECTION_SAMPLE.categories[selectedCategoryIndex];

  const toggleApproval = (itemName: string) => {
    setApprovedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  return (
    <section id="inspection" className="py-16 lg:py-24 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2 font-mono">
            Zero Mystery Invoices
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            100% Transparent Digital Vehicle Inspection (DVI)
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Before turning a single wrench, our master technicians photograph your vehicle's components, record micrometer measurements, and deliver an interactive inspection report straight to your phone.
          </p>
        </div>

        {/* Interactive Inspection Terminal */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Top Bar of the Report Viewer */}
          <div className="p-4 sm:p-6 bg-neutral-950 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-400">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-neutral-400">
                  Inspection Ticket #{DEMO_INSPECTION_SAMPLE.ticketId} · 2023 BMW M3 Competition
                </div>
                <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span>Inspector: {DEMO_INSPECTION_SAMPLE.technician}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-[10px] uppercase font-mono text-neutral-400">Vehicle Health Index</div>
                <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
                  {DEMO_INSPECTION_SAMPLE.overallHealthScore} / 100
                </div>
              </div>
            </div>
          </div>

          {/* Sub-navigation categories */}
          <div className="px-4 sm:px-6 pt-4 border-b border-neutral-800 flex overflow-x-auto gap-2">
            {DEMO_INSPECTION_SAMPLE.categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategoryIndex(idx)}
                className={`py-3 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  selectedCategoryIndex === idx
                    ? 'text-amber-400 border-amber-400 font-bold'
                    : 'text-neutral-400 border-transparent hover:text-white'
                }`}
              >
                {cat.title} ({cat.items.length})
              </button>
            ))}
          </div>

          {/* Inspection Items List */}
          <div className="p-6 divide-y divide-neutral-800/80">
            {activeCategory.items.map((item, idx) => {
              const isApproved = approvedItems[item.name];

              return (
                <div key={idx} className="py-5 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-start justify-between gap-4">
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      {item.status === 'pass' && (
                        <span className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400">
                          <CheckCircle className="w-4 h-4" />
                          Passed Factory Spec
                        </span>
                      )}
                      {item.status === 'caution' && (
                        <span className="flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-400">
                          <AlertTriangle className="w-4 h-4" />
                          Future Attention Needed
                        </span>
                      )}
                      {item.status === 'urgent' && (
                        <span className="flex items-center gap-1.5 text-xs font-mono font-semibold text-rose-400">
                          <AlertOctagon className="w-4 h-4" />
                          Immediate Safety Action
                        </span>
                      )}

                      {item.measurement && (
                        <span className="text-xs font-mono text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                          Measurement: {item.measurement}
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-white">{item.name}</h4>
                    
                    <p className="text-xs sm:text-sm text-neutral-300">
                      <span className="text-neutral-400 font-medium">Diagnostic Finding: </span>
                      {item.finding}
                    </p>

                    <p className="text-xs sm:text-sm text-amber-300/90">
                      <span className="text-neutral-400 font-medium">Technician Advice: </span>
                      {item.recommendation}
                    </p>
                  </div>

                  {/* Interactive Client Authorization Button for non-pass items */}
                  {item.status !== 'pass' && (
                    <div className="shrink-0 flex items-center md:flex-col justify-end gap-2 pt-2 md:pt-0">
                      <button
                        type="button"
                        onClick={() => toggleApproval(item.name)}
                        className={`px-4 py-2 text-xs font-semibold rounded-md transition-all flex items-center gap-2 cursor-pointer ${
                          isApproved
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
                        }`}
                      >
                        {isApproved ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Authorized by Client</span>
                          </>
                        ) : (
                          <>
                            <span>Tap to Authorize Work</span>
                          </>
                        )}
                      </button>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {isApproved ? 'Queued in bay schedule' : 'Pending your approval'}
                      </span>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* DVI Guarantee Callout Strip */}
          <div className="bg-neutral-950 px-6 py-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>We never perform or charge for any additional service without explicit digital sign-off from you.</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-neutral-300">
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span>SMS & WhatsApp live link sent upon vehicle intake</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
