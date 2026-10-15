import React from 'react';
import { CUSTOMER_REVIEWS } from '../data/servicesData';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  return (
    <section id="reviews" className="py-16 lg:py-24 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2 font-mono">
              Uncompromising Standards
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Verified Driver Testimonials
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              Authentic feedback from owners of Porsche, BMW M-division, Mercedes-AMG, Audi RS, and modern electric platforms.
            </p>
          </div>

          <div className="flex items-center gap-4 p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-xs text-neutral-300 font-mono">
              <span className="font-bold text-white">4.92 / 5.0</span> across 1,420+ Services
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                {/* Header: Vehicle & Star Rating */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {review.author}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-400/90 mt-0.5">
                      <span>{review.vehicle}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Service completed tagline */}
                <div className="text-xs text-neutral-400 font-mono mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Work: {review.serviceCompleted}</span>
                </div>

                {/* Body Quote */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Footer: Attributable time & verification */}
              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                <span className="font-mono text-[11px]">{review.date}</span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Workshop Customer
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
