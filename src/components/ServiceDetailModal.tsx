import React from 'react';
import { ServiceItem } from '../types';
import { X, Clock, ShieldCheck, CheckCircle2, Wrench, Calendar, ArrowRight } from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (service: ServiceItem) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-neutral-950 border-b border-neutral-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
              <span className="uppercase tracking-wider">{service.category}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {service.durationMinutes} min bay time
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">{service.name}</h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-neutral-300">
          
          {/* Description */}
          <div>
            <h4 className="text-xs uppercase font-mono font-semibold text-neutral-400 tracking-wider mb-2">
              Engineering Scope
            </h4>
            <p className="text-neutral-300 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Interval */}
          <div className="p-3.5 bg-neutral-950 rounded-lg border border-neutral-800 flex items-center justify-between text-xs">
            <span className="text-neutral-400">Recommended Factory Interval:</span>
            <span className="font-semibold text-white">{service.recommendedInterval}</span>
          </div>

          {/* Full Checklist */}
          <div>
            <h4 className="text-xs uppercase font-mono font-semibold text-neutral-400 tracking-wider mb-3">
              Comprehensive Service Checklist
            </h4>
            <div className="space-y-2">
              {service.includedChecklist.map((check, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{check}</span>
                </div>
              ))}
            </div>
          </div>

          {/* OEM Parts Used */}
          {service.oemParts && service.oemParts.length > 0 && (
            <div>
              <h4 className="text-xs uppercase font-mono font-semibold text-neutral-400 tracking-wider mb-3">
                Factory OEM Parts & Fluids Provided
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.oemParts.map((part, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-mono bg-neutral-950 text-neutral-300 rounded border border-neutral-800"
                  >
                    {part}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Warranty reassurance */}
          <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center gap-3 text-xs text-neutral-300">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <span>Backed by our 24-Month / 24,000-Mile Nationwide Parts & Labor Warranty.</span>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-6 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase font-mono text-neutral-400">Base Price</div>
            <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
              ${service.price}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onBookService(service);
                onClose();
              }}
              className="px-5 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Book This Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
