import React, { useState, useMemo } from 'react';
import { VEHICLE_MAKES, VEHICLE_MODELS, SERVICES_CATALOG } from '../data/servicesData';
import { ServiceItem, VehicleSelection } from '../types';
import { Calculator, Check, Clock, Wrench, Shield, ArrowRight, Sparkles } from 'lucide-react';

interface CostEstimatorProps {
  onBookWithEstimate: (vehicle: VehicleSelection, selectedServices: ServiceItem[]) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onBookWithEstimate }) => {
  const [selectedMake, setSelectedMake] = useState<string>('Porsche');
  const [selectedModel, setSelectedModel] = useState<string>('911 (992 / 991)');
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [mileage, setMileage] = useState<number>(32000);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([
    'synthetic-oil-care',
    'precision-brake-overhaul'
  ]);

  // Available models based on make
  const availableModels = useMemo(() => {
    return VEHICLE_MODELS[selectedMake] || ['General Performance Model'];
  }, [selectedMake]);

  // Keep model synced if make changes
  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMake = e.target.value;
    setSelectedMake(newMake);
    const models = VEHICLE_MODELS[newMake] || [];
    if (models.length > 0) {
      setSelectedModel(models[0]);
    }
  };

  const toggleService = (serviceId: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const selectedServices = useMemo(() => {
    return SERVICES_CATALOG.filter((s) => selectedServiceIds.includes(s.id));
  }, [selectedServiceIds]);

  // Calculation logic
  const { totalCost, totalDuration, partsTotal, laborTotal, recommendedAdvice } = useMemo(() => {
    // Premium multiplier for certain exotic/high-performance platforms
    const isExotic = ['Porsche', 'Mercedes-Benz', 'Audi'].includes(selectedMake);
    const premiumRate = isExotic ? 1.15 : 1.0;

    let baseParts = 0;
    let baseLabor = 0;
    let duration = 0;

    selectedServices.forEach((s) => {
      // Split roughly 45% parts, 55% labor
      const parts = Math.round(s.price * 0.45 * premiumRate);
      const labor = Math.round(s.price * 0.55 * premiumRate);
      baseParts += parts;
      baseLabor += labor;
      duration += s.durationMinutes;
    });

    // Milestone insight based on mileage
    let advice = 'Standard factory service cadence maintained.';
    if (mileage >= 90000) {
      advice = 'At 90k+ miles, we inspect timing belt/chain guides, water pump impeller, and shock dampener seals.';
    } else if (mileage >= 60000) {
      advice = 'At 60k miles, transmission fluid, spark plugs, and brake fluid hydration audit are strongly recommended.';
    } else if (mileage >= 30000) {
      advice = 'At 30k miles, differential gear fluid check, cabin micro-filters, and alignment calibration are key.';
    }

    return {
      totalCost: baseParts + baseLabor,
      totalDuration: duration,
      partsTotal: baseParts,
      laborTotal: baseLabor,
      recommendedAdvice: advice
    };
  }, [selectedServices, selectedMake, mileage]);

  const handleProceedToBooking = () => {
    onBookWithEstimate(
      {
        year: selectedYear,
        make: selectedMake,
        model: selectedModel,
        mileage: mileage
      },
      selectedServices
    );
  };

  return (
    <section id="estimator" className="py-16 lg:py-24 bg-neutral-900/50 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2 font-mono">
            Transparent Upfront Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive Service & Maintenance Cost Calculator
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Select your vehicle parameters and desired services for an instant, transparent itemized estimate. Zero hidden shop fees or surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls: Vehicle & Service Selector */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Vehicle Configuration Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center text-xs font-bold">1</span>
                <span>Select Your Vehicle Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Year */}
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1.5">Model Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2012, 2010].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                {/* Make */}
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1.5">Vehicle Make</label>
                  <select
                    value={selectedMake}
                    onChange={handleMakeChange}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    {VEHICLE_MAKES.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* Model */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-neutral-400 mb-1.5">Model / Trim</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    {availableModels.map((mod) => (
                      <option key={mod} value={mod}>{mod}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mileage Slider */}
              <div className="mt-5 pt-4 border-t border-neutral-800">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-neutral-400">Current Odometer:</span>
                  <span className="font-mono text-amber-400 font-semibold tabular-nums text-sm">
                    {mileage.toLocaleString()} miles
                  </span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={150000}
                  step={2500}
                  value={mileage}
                  onChange={(e) => setMileage(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-1">
                  <span>5,000 mi</span>
                  <span>75,000 mi</span>
                  <span>150,000+ mi</span>
                </div>
              </div>
            </div>

            {/* Step 2: Choose Services Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center text-xs font-bold">2</span>
                  <span>Select Desired Services ({selectedServiceIds.length} selected)</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    if (selectedServiceIds.length === SERVICES_CATALOG.length) {
                      setSelectedServiceIds([]);
                    } else {
                      setSelectedServiceIds(SERVICES_CATALOG.map((s) => s.id));
                    }
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
                >
                  {selectedServiceIds.length === SERVICES_CATALOG.length ? 'Clear All' : 'Select All'}
                </button>
              </div>

              <div className="space-y-3">
                {SERVICES_CATALOG.map((service) => {
                  const isSelected = selectedServiceIds.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-neutral-800/90 border-amber-500/60 shadow-sm'
                          : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isSelected
                              ? 'bg-amber-400 border-amber-400 text-neutral-950'
                              : 'border-neutral-600 bg-neutral-900'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white flex items-center gap-2">
                            <span>{service.name}</span>
                            {service.badge && (
                              <span className="text-[10px] text-amber-400 font-mono">[{service.badge}]</span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-400 mt-0.5">{service.tagline}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-white font-mono tabular-nums">
                          ${service.price}
                        </div>
                        <div className="text-[11px] text-neutral-400 font-mono">
                          ~{service.durationMinutes} min
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Live Estimate Quotation Summary */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
              
              {/* Gold subtle top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-300" />

              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block">Instant Service Quote</span>
                  <h4 className="text-lg font-bold text-white">
                    {selectedYear} {selectedMake} {selectedModel}
                  </h4>
                </div>
                <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-400">
                  <Calculator className="w-5 h-5" />
                </div>
              </div>

              {/* Itemized Line Items */}
              <div className="py-4 space-y-2.5 border-b border-neutral-800">
                {selectedServices.length === 0 ? (
                  <div className="py-6 text-center text-sm text-neutral-400">
                    No services selected yet. Pick one or more items from the checklist to calculate cost.
                  </div>
                ) : (
                  selectedServices.map((service) => (
                    <div key={service.id} className="flex items-center justify-between text-xs">
                      <span className="text-neutral-300 truncate max-w-[240px]">{service.name}</span>
                      <span className="font-mono text-white tabular-nums">${service.price}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Cost Sub-breakdown */}
              <div className="py-4 space-y-2 text-xs border-b border-neutral-800">
                <div className="flex justify-between text-neutral-400">
                  <span>OEM Specification Parts & Fluids:</span>
                  <span className="font-mono text-neutral-200 tabular-nums">${partsTotal}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Certified ASE Master Bay Labor:</span>
                  <span className="font-mono text-neutral-200 tabular-nums">${laborTotal}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Estimated Shop Bay Time:</span>
                  <span className="font-mono text-neutral-200 tabular-nums">
                    {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Nationwide Warranty Protection:</span>
                  <span className="text-emerald-400 font-medium">Included (24 Mo)</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>40-Point Digital Photo Inspection:</span>
                  <span className="text-emerald-400 font-medium">Free ($95 value)</span>
                </div>
              </div>

              {/* Total & Action */}
              <div className="pt-4">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-xs text-neutral-400 block">Estimated Total</span>
                    <span className="text-[11px] text-neutral-400">Taxes calculated at checkout</span>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
                      ${totalCost}
                    </div>
                  </div>
                </div>

                {/* Milestone Recommendation Pill-free notice */}
                <div className="mb-5 p-3 rounded-md bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Technician Milestone Note:</span>
                    <span className="text-neutral-400">{recommendedAdvice}</span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={selectedServices.length === 0}
                  onClick={handleProceedToBooking}
                  className={`w-full py-3.5 px-4 text-sm font-bold rounded-md transition-all flex items-center justify-center gap-2 ${
                    selectedServices.length > 0
                      ? 'bg-amber-400 hover:bg-amber-300 text-neutral-950 cursor-pointer shadow-md'
                      : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  <span>Book This Service Package</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-neutral-400 mt-3">
                  No payment required today. You pay upon satisfactory completion.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
