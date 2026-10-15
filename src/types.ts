export interface ServiceItem {
  id: string;
  name: string;
  category: 'maintenance' | 'diagnostics' | 'brakes' | 'suspension' | 'transmission' | 'hybrid-ev';
  price: number;
  durationMinutes: number;
  tagline: string;
  description: string;
  recommendedInterval: string;
  includedChecklist: string[];
  oemParts: string[];
  badge?: string;
  image?: string;
}

export interface VehicleSelection {
  year: number;
  make: string;
  model: string;
  mileage: number;
  licensePlate?: string;
}

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  vehicle: VehicleSelection;
  services: ServiceItem[];
  date: string;
  timeSlot: string;
  dropOffType: 'wait' | 'dropoff' | 'loaner';
  notes?: string;
  status: 'received' | 'inspection' | 'authorized' | 'in_progress' | 'ready';
  bayNumber: number;
  assignedTechnician: string;
  technicianTitle: string;
  estimatedCompletion: string;
  totalCost: number;
  createdAt: string;
  inspectionReport?: DigitalInspectionReport;
}

export interface InspectionCheckItem {
  name: string;
  status: 'pass' | 'caution' | 'urgent';
  finding: string;
  recommendation: string;
  measurement?: string;
}

export interface InspectionCategory {
  title: string;
  items: InspectionCheckItem[];
}

export interface DigitalInspectionReport {
  ticketId: string;
  date: string;
  technician: string;
  overallHealthScore: number;
  categories: InspectionCategory[];
}

export interface Review {
  id: string;
  author: string;
  vehicle: string;
  rating: number;
  date: string;
  serviceCompleted: string;
  comment: string;
  verified: boolean;
}
