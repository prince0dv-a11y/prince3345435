import React from 'react';
import { Calendar, Calculator, ShieldCheck, Award, Clock, Camera } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onScrollToEstimator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onScrollToEstimator
}) => {
  return (
    <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unboxed editorial trust kicker (No pill enclosures) */}
        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium text-neutral-400 mb-6">
          <span className="text-amber-400 font-semibold">ASE Master Certified</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>24-Month / 24,000-Mile Nationwide Warranty</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>100% Digital Photo Health Inspection</span>
        </div>

        {/* 2-Column Desktop Grid with balanced heights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column: Headline, Proposition & Direct Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
              style={{ textWrap: 'balance' }}
            >
              Precision Auto Care & Master Engineering for Discerning Drivers.
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8 max-w-xl">
              Factory-level computerized diagnostics, warranty-approved scheduled maintenance, and performance calibration for Porsche, BMW, Mercedes, Audi, Lexus, and domestic performance vehicles. Every job documented with transparent photo and video evidence before repair.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-all duration-150 shadow-md flex items-center gap-2.5 cursor-pointer active:scale-98"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Service Bay</span>
              </button>

              <button
                onClick={onScrollToEstimator}
                className="px-6 py-3.5 text-sm font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-600 rounded-md transition-colors flex items-center gap-2.5 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Estimate Service Cost</span>
              </button>
            </div>

            {/* Quiet trust markers */}
            <div className="pt-6 border-t border-neutral-800/80 flex items-center gap-6 text-xs text-neutral-400">
              <div>
                <span className="text-white font-medium block">OEM Genuine Parts</span>
                <span>Brembo, Motul, Bilstein, Bosch</span>
              </div>
              <div className="h-8 w-px bg-neutral-800" />
              <div>
                <span className="text-white font-medium block">Loaner Vehicles Available</span>
                <span>Complimentary for 2+ hr services</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Visual Asset */}
          <div className="lg:col-span-6 flex items-stretch">
            <div className="relative w-full rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 group shadow-2xl min-h-[380px] lg:min-h-[460px]">
              
              {/* Fallback container with gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 flex items-center justify-center">
                <span className="text-neutral-700 font-mono text-sm">Veloce Precision Service Bay</span>
              </div>

              {/* Verified generated asset */}
              <img
                src="/src/assets/images/hero_car_service_workshop_1792052411313.jpg"
                alt="Ultra-clean modern automotive workshop with luxury vehicle on hydraulic lift and computerized diagnostics"
                className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
                loading="eager"
              />

              {/* Measured contrast scrim */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent pointer-events-none" />

              {/* Subtle overlay caption badge */}
              <div className="absolute bottom-4 left-4 right-4 z-30 p-3.5 bg-neutral-950/90 backdrop-blur-md rounded-lg border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">Cleanroom Bay Standard</div>
                  <div className="text-[11px] text-neutral-400">Rotary lifts, PIWIS / ISTA diagnostic terminals, Motul lab oil dispense</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-semibold text-amber-400 tabular-nums">Bay 1 - 8</div>
                  <div className="text-[10px] text-neutral-400 font-mono">Active Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI / Trust Strip below the Hero Split */}
        <div className="mt-14 pt-10 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Award className="w-4 h-4 shrink-0" />
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">4.9 / 5.0</span>
            </div>
            <span className="text-xs font-semibold text-neutral-300">Client Satisfaction</span>
            <span className="text-xs text-neutral-400 mt-0.5">1,420+ verified vehicle owner reviews</span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">35+</span>
            </div>
            <span className="text-xs font-semibold text-neutral-300">Master Technicians</span>
            <span className="text-xs text-neutral-400 mt-0.5">ASE Master L1 & European brand certified</span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Camera className="w-4 h-4 shrink-0" />
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">100%</span>
            </div>
            <span className="text-xs font-semibold text-neutral-300">Digital Transparency</span>
            <span className="text-xs text-neutral-400 mt-0.5">High-definition photo/video evidence on every job</span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Clock className="w-4 h-4 shrink-0" />
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">85%</span>
            </div>
            <span className="text-xs font-semibold text-neutral-300">Same-Day Return</span>
            <span className="text-xs text-neutral-400 mt-0.5">Standard scheduled service completed same day</span>
          </div>

        </div>

      </div>
    </section>
  );
};
