import React from 'react';
import { Phone, MapPin, ShieldCheck, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-lg font-bold tracking-tight text-white hover:text-amber-400 transition-colors flex items-center gap-2"
            >
              <span className="w-7 h-7 rounded bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-neutral-950 font-black text-xs tracking-tighter">
                VAW
              </span>
              <span>Veloce Auto Works</span>
            </a>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Premier automotive service and precision maintenance center for European sports cars, luxury SUVs, and high-performance electric vehicles. Certified ASE Master L1 engineering.
            </p>

            <div className="pt-2 text-[11px] text-neutral-400 font-mono space-y-1">
              <div>CA Bureau of Automotive Repair License: #BAR294012</div>
              <div>EPA Section 609 Certified Mobile Refrigerant Handling</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-white font-semibold">Service Links</div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors"
                >
                  Factory Maintenance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors"
                >
                  Brembo Ceramic Brakes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors"
                >
                  ECU & CAN Diagnostics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors"
                >
                  Hunter 4-Wheel Laser Align
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors"
                >
                  EV / Hybrid High-Voltage
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Tools */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-white font-semibold">Client Portals</div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('estimator')}
                  className="hover:text-white transition-colors"
                >
                  Cost Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('inspection')}
                  className="hover:text-white transition-colors"
                >
                  Digital Vehicle Inspection (DVI)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tracker')}
                  className="hover:text-white transition-colors"
                >
                  Live Bay Progress Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-white transition-colors"
                >
                  Verified Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('facility')}
                  className="hover:text-white transition-colors"
                >
                  24/7 Key Drop Box
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Dispatch */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-white font-semibold">Workshop Bay Dispatch</div>
            <div className="space-y-2">
              <div>
                <span className="text-[11px] text-neutral-400 block font-mono">Direct Workshop Line:</span>
                <a href="tel:4155550198" className="text-amber-400 font-mono font-bold hover:underline">
                  (415) 555-0198
                </a>
              </div>
              <div>
                <span className="text-[11px] text-neutral-400 block font-mono">Email Advisory:</span>
                <a href="mailto:service@veloceautoworks.com" className="text-neutral-300 hover:underline">
                  service@veloceautoworks.com
                </a>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white rounded text-xs font-semibold transition-colors"
                >
                  Schedule Appointment
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Veloce Auto Works LLC. All rights reserved. Precision engineering & maintenance.
          </div>
          <div className="flex items-center gap-6">
            <span>24-Month / 24,000-Mile Nationwide Warranty</span>
            <span aria-hidden="true">·</span>
            <span>ASE Master Certified</span>
            <span aria-hidden="true">·</span>
            <span>Bosch Service Partner</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
