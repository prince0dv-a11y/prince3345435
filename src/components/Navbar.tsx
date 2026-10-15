import React, { useState } from 'react';
import { Menu, X, Calendar, Wrench, Shield, Phone } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onNavigate, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Cost Calculator', id: 'estimator' },
    { label: 'Digital Inspection', id: 'inspection' },
    { label: 'Live Bay Tracker', id: 'tracker' },
    { label: 'Client Reviews', id: 'reviews' },
    { label: 'Facility', id: 'facility' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: 3 zones separated by gap-8 */}
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single text element wordmark in display face */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl font-bold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5"
          >
            <span className="w-8 h-8 rounded bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-neutral-950 font-black text-sm tracking-tighter">
              VAW
            </span>
            <span>Veloce Auto Works</span>
          </a>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  activeSection === link.id
                    ? 'text-amber-400 border-amber-400 font-semibold'
                    : 'text-neutral-300 hover:text-white border-transparent'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="tel:4155550198"
              className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>(415) 555-0198</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Service</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-400 hover:text-white lg:hidden rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-900 border-b border-neutral-800 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left text-sm py-2 px-3 rounded font-medium transition-colors ${
                  activeSection === link.id
                    ? 'text-amber-400 bg-neutral-800'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          
          <div className="pt-4 border-t border-neutral-800 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 px-3">
              <Phone className="w-4 h-4 text-amber-500" />
              <span>Emergency Dispatch: (415) 555-0198</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors text-center cursor-pointer"
            >
              Book Service Bay
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
