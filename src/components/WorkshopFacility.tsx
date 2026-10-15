import React from 'react';
import { WORKSHOP_AMENITIES } from '../data/servicesData';
import { MapPin, Clock, Phone, Mail, Shield, Coffee, Wifi, KeyRound, Check } from 'lucide-react';

interface WorkshopFacilityProps {
  onOpenBooking: () => void;
}

export const WorkshopFacility: React.FC<WorkshopFacilityProps> = ({ onOpenBooking }) => {
  return (
    <section id="facility" className="py-16 lg:py-24 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2 font-mono">
            State-of-the-Art Operations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our San Francisco Service Facility
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            A pristine 12,000 sq ft automotive facility featuring eight computerized lifts, Hunter Hawkeye alignment rack, cleanroom engine assembly room, and an executive client lounge.
          </p>
        </div>

        {/* 2-Column Grid: Amenities vs Location / Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Amenities Bento */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WORKSHOP_AMENITIES.map((amenity, idx) => (
              <div
                key={idx}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-800 text-amber-400 flex items-center justify-center mb-3">
                  {idx === 0 && <Coffee className="w-4 h-4" />}
                  {idx === 1 && <Wifi className="w-4 h-4" />}
                  {idx === 2 && <KeyRound className="w-4 h-4" />}
                  {idx === 3 && <Shield className="w-4 h-4" />}
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">{amenity.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{amenity.description}</p>
              </div>
            ))}
          </div>

          {/* Location & Hours Card */}
          <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-7 shadow-lg">
            <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Workshop Location & Hours</span>
            </h3>

            {/* Address */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-white">Veloce Auto Works Flagship</div>
                  <div className="text-neutral-400">740 Bryant Street, SOMA Design District</div>
                  <div className="text-neutral-400">San Francisco, CA 94107</div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3 pt-3 border-t border-neutral-800">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <div className="space-y-1">
                  <div className="font-semibold text-white">Workshop Operating Hours</div>
                  <div className="flex justify-between gap-6 text-neutral-300 font-mono text-xs">
                    <span>Monday - Friday:</span>
                    <span className="text-white">7:30 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between gap-6 text-neutral-300 font-mono text-xs">
                    <span>Saturday:</span>
                    <span className="text-white">8:30 AM - 3:00 PM</span>
                  </div>
                  <div className="flex justify-between gap-6 text-neutral-300 font-mono text-xs">
                    <span>Sunday:</span>
                    <span className="text-neutral-500">Closed (Key Drop Active)</span>
                  </div>
                </div>
              </div>

              {/* Direct Phone lines */}
              <div className="flex items-start gap-3 pt-3 border-t border-neutral-800">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-white">Direct Service Bay Advisory</div>
                  <a href="tel:4155550198" className="font-mono text-amber-400 hover:underline">
                    (415) 555-0198
                  </a>
                  <div className="text-[11px] text-neutral-400">24/7 Flatbed Towing Concierge Available</div>
                </div>
              </div>
            </div>

            {/* Book CTA inside facility box */}
            <div className="mt-6 pt-5 border-t border-neutral-800">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-md transition-colors text-center cursor-pointer"
              >
                Schedule Vehicle Drop-Off
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
