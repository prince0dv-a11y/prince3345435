import React, { useState, useEffect } from 'react';
import { VEHICLE_MAKES, VEHICLE_MODELS, SERVICES_CATALOG } from '../data/servicesData';
import { ServiceItem, VehicleSelection, Booking } from '../types';
import { X, Calendar, Clock, Car, Check, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVehicle?: VehicleSelection | null;
  initialServices?: ServiceItem[];
  onBookingCreated: (booking: Booking) => void;
  onNavigateToTracker: (ticketId: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialVehicle,
  initialServices = [],
  onBookingCreated,
  onNavigateToTracker
}) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [year, setYear] = useState<number>(2023);
  const [make, setMake] = useState<string>('Porsche');
  const [model, setModel] = useState<string>('911 (992 / 991)');
  const [mileage, setMileage] = useState<number>(25000);
  const [licensePlate, setLicensePlate] = useState<string>('');

  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [date, setDate] = useState<string>('Tomorrow');
  const [timeSlot, setTimeSlot] = useState<string>('08:30 AM - 10:30 AM');
  const [dropOffType, setDropOffType] = useState<'wait' | 'dropoff' | 'loaner'>('loaner');
  
  const [customerName, setCustomerName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Populate from props when opened
  useEffect(() => {
    if (initialVehicle) {
      setYear(initialVehicle.year);
      setMake(initialVehicle.make);
      setModel(initialVehicle.model);
      setMileage(initialVehicle.mileage);
      if (initialVehicle.licensePlate) setLicensePlate(initialVehicle.licensePlate);
    }
    if (initialServices && initialServices.length > 0) {
      setSelectedServiceIds(initialServices.map((s) => s.id));
    } else if (selectedServiceIds.length === 0) {
      setSelectedServiceIds(['synthetic-oil-care']);
    }
  }, [isOpen, initialVehicle, initialServices]);

  if (!isOpen) return null;

  const availableModels = VEHICLE_MODELS[make] || ['Performance Model'];

  const handleMakeChange = (newMake: string) => {
    setMake(newMake);
    const models = VEHICLE_MODELS[newMake] || [];
    if (models.length > 0) {
      setModel(models[0]);
    }
  };

  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedServices = SERVICES_CATALOG.filter((s) => selectedServiceIds.includes(s.id));
  const totalCost = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0);

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const randomTicketNumber = Math.floor(10000 + Math.random() * 90000);
    const newId = `VAW-${randomTicketNumber}`;

    const newBooking: Booking = {
      id: newId,
      customerName: customerName || 'Valued Client',
      email: email || 'client@example.com',
      phone: phone || '(415) 555-0100',
      vehicle: {
        year,
        make,
        model,
        mileage: Number(mileage) || 30000,
        licensePlate: licensePlate || 'EX-992'
      },
      services: selectedServices,
      date,
      timeSlot,
      dropOffType,
      notes,
      status: 'received',
      bayNumber: Math.floor(1 + Math.random() * 6),
      assignedTechnician: 'Marcus Vance',
      technicianTitle: 'ASE Master Certified L1 Specialist',
      estimatedCompletion: `${date} at 04:30 PM`,
      totalCost,
      createdAt: 'Just now'
    };

    onBookingCreated(newBooking);
    setConfirmedBooking(newBooking);
    setStep(4);
  };

  const timeSlots = [
    '07:30 AM - 09:30 AM (Early Drop)',
    '08:30 AM - 10:30 AM (Morning Bay)',
    '10:30 AM - 12:30 PM (Midday Bay)',
    '01:30 PM - 03:30 PM (Afternoon Bay)',
    '03:30 PM - 05:30 PM (Evening Intake)'
  ];

  const dates = [
    'Today (Urgent Bay)',
    'Tomorrow',
    'In 2 Days',
    'Next Monday',
    'Next Wednesday'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              {step < 4 ? `Step 0${step} of 03` : 'Booking Confirmed'}
            </div>
            <h3 className="text-xl font-bold text-white">
              {step === 1 && 'Vehicle Identification'}
              {step === 2 && 'Service Package Selection'}
              {step === 3 && 'Schedule & Contact Details'}
              {step === 4 && 'Vehicle Bay Intake Scheduled'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: Vehicle Information */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-400">
                Provide your vehicle details so our master technicians can prepare the correct factory diagnostics and fluids prior to your arrival.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">Model Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2012, 2010].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">Vehicle Make</label>
                  <select
                    value={make}
                    onChange={(e) => handleMakeChange(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    {VEHICLE_MAKES.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">Model / Trim</label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    {availableModels.map((mod) => (
                      <option key={mod} value={mod}>{mod}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">Current Odometer (Miles)</label>
                  <input
                    type="number"
                    value={mileage}
                    onChange={(e) => setMileage(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                    placeholder="e.g. 35,000"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">License Plate (Optional)</label>
                  <input
                    type="text"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white font-mono uppercase focus:outline-none focus:border-amber-400"
                    placeholder="e.g. 7BMWM49"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Service Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-400">
                  Select the services needed for your vehicle. (You can add multiple items).
                </p>
                <div className="text-xs font-mono text-amber-400">
                  {selectedServices.length} Selected · ${totalCost}
                </div>
              </div>

              <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
                {SERVICES_CATALOG.map((srv) => {
                  const isChecked = selectedServiceIds.includes(srv.id);
                  return (
                    <div
                      key={srv.id}
                      onClick={() => toggleService(srv.id)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isChecked
                          ? 'bg-neutral-800 border-amber-500/60'
                          : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked
                              ? 'bg-amber-400 border-amber-400 text-neutral-950'
                              : 'border-neutral-600 bg-neutral-900'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-semibold text-white">{srv.name}</div>
                          <div className="text-[11px] text-neutral-400">{srv.tagline}</div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs sm:text-sm font-bold font-mono text-white tabular-nums">${srv.price}</div>
                        <div className="text-[10px] text-neutral-400 font-mono">~{srv.durationMinutes} min</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Scheduling & Contact Details */}
          {step === 3 && (
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              
              {/* Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">Preferred Date</label>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    {dates.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">Time Window</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>{ts}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mobility Options (Wait, Drop-off, Loaner) */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">Drop-off / Mobility Preference</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'wait', label: 'Lounge Wait', desc: 'Espresso & Wi-Fi' },
                    { id: 'dropoff', label: '24/7 Key Drop', desc: 'Contactless Box' },
                    { id: 'loaner', label: 'Loaner Vehicle', desc: 'Complimentary' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setDropOffType(m.id as any)}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        dropOffType === m.id
                          ? 'bg-amber-400/10 border-amber-500/60 text-white'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{m.label}</div>
                      <div className="text-[10px] text-neutral-400">{m.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Marcus Miller"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">Mobile Phone (For SMS DVI) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(415) 555-0199"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">Special Symptoms / Requests</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe any squeaks, vibrations, warning lights, or specific fluids requested..."
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

            </form>
          )}

          {/* STEP 4: Confirmation Pass */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Appointment Registered</span>
                <h3 className="text-2xl font-bold text-white mt-1">We'll See You in Bay #{confirmedBooking.bayNumber}</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  A digital confirmation barcode and check-in link have been generated.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 text-left max-w-md mx-auto">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div>
                    <div className="text-[10px] uppercase font-mono text-neutral-400">Booking Ticket Code</div>
                    <div className="text-xl font-bold font-mono text-amber-400">{confirmedBooking.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-mono text-neutral-400">Date & Window</div>
                    <div className="text-xs font-bold text-white">{confirmedBooking.date}</div>
                  </div>
                </div>

                <div className="py-3 text-xs space-y-1.5 border-b border-neutral-800">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Vehicle:</span>
                    <span className="font-semibold text-white">
                      {confirmedBooking.vehicle.year} {confirmedBooking.vehicle.make} {confirmedBooking.vehicle.model}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Client:</span>
                    <span className="text-neutral-200">{confirmedBooking.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Mobility:</span>
                    <span className="text-amber-400 capitalize">{confirmedBooking.dropOffType} Requested</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Estimated Total:</span>
                    <span className="font-mono font-bold text-white tabular-nums">${confirmedBooking.totalCost}</span>
                  </div>
                </div>

                <div className="pt-3 text-[11px] text-neutral-400 flex items-center justify-between">
                  <span>Assigned Tech: {confirmedBooking.assignedTechnician}</span>
                  <span className="text-emerald-400 font-mono">DVI SMS Enabled</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToTracker(confirmedBooking.id);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-md transition-colors cursor-pointer"
                >
                  Track This Vehicle in Live Bay
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-md transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Controls for Steps 1-3 */}
        {step < 4 && (
          <div className="p-4 sm:p-6 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step === 1 && (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                disabled={selectedServices.length === 0}
                onClick={() => setStep(3)}
                className={`px-5 py-2.5 text-xs font-bold rounded-md transition-colors flex items-center gap-2 ${
                  selectedServices.length > 0
                    ? 'text-neutral-950 bg-amber-400 hover:bg-amber-300 cursor-pointer'
                    : 'text-neutral-500 bg-neutral-800 cursor-not-allowed'
                }`}
              >
                <span>Continue to Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                onClick={handleSubmitBooking}
                className="px-6 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Confirm Service Appointment</span>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
