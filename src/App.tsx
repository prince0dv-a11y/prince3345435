import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { CostEstimator } from './components/CostEstimator';
import { DigitalInspectionShowcase } from './components/DigitalInspectionShowcase';
import { LiveVehicleTracker } from './components/LiveVehicleTracker';
import { CustomerReviews } from './components/CustomerReviews';
import { WorkshopFacility } from './components/WorkshopFacility';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { INITIAL_ACTIVE_BOOKINGS } from './data/servicesData';
import { ServiceItem, VehicleSelection, Booking } from './types';

export default function App() {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_ACTIVE_BOOKINGS);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingVehiclePreset, setBookingVehiclePreset] = useState<VehicleSelection | null>(null);
  const [bookingServicesPreset, setBookingServicesPreset] = useState<ServiceItem[]>([]);
  const [selectedDetailService, setSelectedDetailService] = useState<ServiceItem | null>(null);
  const [activeSection, setActiveSection] = useState<string>('services');

  const handleOpenBooking = (vehicle?: VehicleSelection, services?: ServiceItem[]) => {
    if (vehicle) {
      setBookingVehiclePreset(vehicle);
    }
    if (services) {
      setBookingServicesPreset(services);
    }
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleSelectServiceForBooking = (service: ServiceItem) => {
    setBookingServicesPreset([service]);
    setIsBookingOpen(true);
  };

  const handleBookWithEstimate = (vehicle: VehicleSelection, selectedServices: ServiceItem[]) => {
    setBookingVehiclePreset(vehicle);
    setBookingServicesPreset(selectedServices);
    setIsBookingOpen(true);
  };

  const handleBookingCreated = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleNavigateToTracker = (ticketId: string) => {
    const el = document.getElementById('tracker');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection('tracker');
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      
      {/* Top Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onNavigate={scrollToSection}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onScrollToEstimator={() => scrollToSection('estimator')}
        />

        {/* Services Bento Grid */}
        <ServicesSection
          onSelectServiceForBooking={handleSelectServiceForBooking}
          onOpenServiceDetails={(service) => setSelectedDetailService(service)}
        />

        {/* Interactive Cost Calculator */}
        <CostEstimator onBookWithEstimate={handleBookWithEstimate} />

        {/* 100% Transparent Digital Vehicle Inspection (DVI) Showcase */}
        <DigitalInspectionShowcase />

        {/* Live Bay & Vehicle Progress Tracker */}
        <LiveVehicleTracker bookings={bookings} />

        {/* Customer Testimonials & Case Studies */}
        <CustomerReviews />

        {/* Workshop Facility, Hours & Key Drop */}
        <WorkshopFacility onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Clean Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialVehicle={bookingVehiclePreset}
        initialServices={bookingServicesPreset}
        onBookingCreated={handleBookingCreated}
        onNavigateToTracker={handleNavigateToTracker}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedDetailService}
        onClose={() => setSelectedDetailService(null)}
        onBookService={(service) => {
          handleSelectServiceForBooking(service);
        }}
      />

    </div>
  );
}
