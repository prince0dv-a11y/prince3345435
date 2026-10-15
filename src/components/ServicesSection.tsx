import React, { useState } from 'react';
import { SERVICES_CATALOG } from '../data/servicesData';
import { ServiceItem } from '../types';
import { Wrench, Clock, CheckCircle2, ArrowUpRight, Check, Eye } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForBooking: (service: ServiceItem) => void;
  onOpenServiceDetails: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
  onOpenServiceDetails
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'maintenance', label: 'Factory Maintenance' },
    { id: 'diagnostics', label: 'ECU Diagnostics' },
    { id: 'brakes', label: 'Brakes & Calipers' },
    { id: 'suspension', label: 'Suspension & Alignment' },
    { id: 'transmission', label: 'Drivetrain & Gearbox' },
    { id: 'hybrid-ev', label: 'EV & Hybrid Systems' }
  ];

  const filteredServices = SERVICES_CATALOG.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <section id="services" className="py-16 lg:py-24 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2 font-mono">
              Certified Master Craftsmanship
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Precision Automotive Services & Systems
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              Engineered according to strict factory repair instructions. OEM diagnostic tools, genuine fluids, and transparent digital documentation.
            </p>
          </div>

          {/* Interactive Filter Tabs (Button Segmented Control) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-lg shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === cat.id
                    ? 'bg-amber-400 text-neutral-950 font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Marquee Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const hasCustomImage = Boolean(service.image);

            return (
              <div
                key={service.id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-neutral-700 transition-all duration-200"
              >
                {/* Image header if available */}
                {hasCustomImage && (
                  <div className="relative h-48 w-full overflow-hidden bg-neutral-950">
                    <img
                      src={service.image}
                      alt={service.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent pointer-events-none" />
                    {service.badge && (
                      <span className="absolute top-3 right-3 text-[11px] font-mono font-medium px-2.5 py-1 bg-neutral-950/80 backdrop-blur-md text-amber-400 border border-neutral-700 rounded">
                        {service.badge}
                      </span>
                    )}
                  </div>
                )}

                {/* Content body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata Header */}
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
                      <span className="text-amber-400 uppercase tracking-wider">{service.category}</span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {service.durationMinutes} min bay time
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {service.name}
                    </h3>

                    <p className="mt-2 text-xs text-neutral-300 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Quick Checklist Sample */}
                    <div className="mt-4 pt-4 border-t border-neutral-800/80 space-y-1.5">
                      <div className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 font-mono">
                        Included Key Highlights:
                      </div>
                      {service.includedChecklist.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono">Starting At</div>
                      <div className="text-xl font-extrabold text-white font-mono tabular-nums">
                        ${service.price}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenServiceDetails(service)}
                        className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
                        title="View Detailed Checklist"
                        aria-label="View service details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectServiceForBooking(service)}
                        className="px-3.5 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Book Bay</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
