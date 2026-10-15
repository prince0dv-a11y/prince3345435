import { ServiceItem, Booking, Review, DigitalInspectionReport } from '../types';

export const VEHICLE_MAKES = [
  'Porsche',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Lexus',
  'Tesla',
  'Toyota',
  'Honda',
  'Ford',
  'Subaru',
  'Volvo',
  'Volkswagen',
  'Land Rover'
];

export const VEHICLE_MODELS: Record<string, string[]> = {
  'Porsche': ['911 (992 / 991)', 'Taycan', 'Cayenne', 'Macan', 'Panamera', '718 Cayman / Boxster'],
  'BMW': ['M3 / M4', 'M5', '3-Series / 4-Series', '5-Series', 'X5 / X6', 'X3', 'i4 / iX'],
  'Mercedes-Benz': ['C-Class / C63 AMG', 'E-Class / E63 AMG', 'S-Class', 'GLC / GLE SUV', 'G-Wagon (G63)', 'EQS / EQE'],
  'Audi': ['RS6 / RS7', 'S4 / S5 / RS5', 'A6 / A7', 'Q7 / Q8', 'e-tron GT', 'R8'],
  'Lexus': ['GX 460 / 550', 'RX 350 / 500h', 'LC 500', 'IS 500 F SPORT', 'ES 350', 'LX 600'],
  'Tesla': ['Model S Plaid', 'Model 3 Performance', 'Model X', 'Model Y', 'Cybertruck'],
  'Toyota': ['GR Supra', 'GR Corolla', 'Land Cruiser / 4Runner', 'Camry Hybrid', 'RAV4 Prime', 'Tundra'],
  'Honda': ['Civic Type R', 'Accord Hybrid', 'CR-V Hybrid', 'Pilot', 'S2000'],
  'Ford': ['Mustang GT / Dark Horse', 'F-150 / Raptor', 'Bronco Badlands', 'Explorer ST', 'Mach-E'],
  'Subaru': ['WRX STI', 'Outback Wilderness', 'Forester', 'BRZ', 'Crosstrek'],
  'Volvo': ['XC90 Recharge', 'XC60', 'V90 Cross Country', 'S60 Polestar', 'EX90'],
  'Volkswagen': ['Golf R / GTI', 'Tiguan', 'Atlas', 'Arteon', 'ID.4'],
  'Land Rover': ['Range Rover Sport', 'Defender 110 / 90', 'Velar', 'Discovery']
};

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: 'synthetic-oil-care',
    name: 'Precision Synthetic Oil & Filter Service',
    category: 'maintenance',
    price: 139,
    durationMinutes: 45,
    tagline: 'High-shear European synthetic fluids with OEM micron filtration',
    description: 'Factory-specified Motul 300V or Mobil 1 synthetic formulation paired with German OEM filtration. Includes a complimentary 40-point visual health inspection and tire pressure leveling.',
    recommendedInterval: 'Every 5,000 - 7,500 miles',
    includedChecklist: [
      'Up to 7 quarts of factory-certified synthetic oil',
      'OEM fleece / paper micro-filter replacement',
      'Crush washer and drain plug torque check',
      'Underbody tray and drain plug torque inspection',
      'Battery terminal and charging voltage test',
      'Fluid top-off (coolant, windshield washer, power steering)'
    ],
    oemParts: ['OEM Spec Micro-filter', 'Motul / Mobil 1 Fully Synthetic', 'Copper/Aluminum Crush Seal']
  },
  {
    id: 'precision-brake-overhaul',
    name: 'Ceramic Brake Service & Rotor Calibration',
    category: 'brakes',
    price: 369,
    durationMinutes: 90,
    tagline: 'Zero-dust ceramic compound installation with laser runout verification',
    description: 'High-performance Brembo or Akebono ceramic brake pads installed with rotor micrometer runout check, caliper pin ultrasonic cleaning, high-temp silicone lubrication, and DOT 4/5.1 fluid moisture analysis.',
    recommendedInterval: 'Every 25,000 - 35,000 miles',
    includedChecklist: [
      'Front or rear ceramic brake pad installation',
      'Rotor thickness micrometer and runout measurement',
      'Caliper sliding pins degreased and silicone greased',
      'Anti-rattle clips & wear sensor replacement',
      'Brake fluid boiling point & copper moisture test',
      'Brake bedding road test sequence'
    ],
    oemParts: ['Low-Dust Ceramic Brake Pads', 'Electronic Wear Sensors', 'High-Temp Caliper Hardware'],
    image: '/src/assets/images/service_brake_mechanic_1792052413143.jpg',
    badge: 'Popular Service'
  },
  {
    id: 'master-ecu-diagnostics',
    name: 'Computerized ECU Diagnostics & Live CAN Telemetry',
    category: 'diagnostics',
    price: 169,
    durationMinutes: 60,
    tagline: 'Dealer-level OBD-II scan, freeze-frame analysis & module resets',
    description: 'Pinpoint electrical faults, rough idling, transmission shudder, and check engine lights using genuine factory diagnostic software (PIWIS, ISTA+, ODIS, Xentry). Includes live graph data and component activation.',
    recommendedInterval: 'Upon warning lamp or annual checkup',
    includedChecklist: [
      'Full vehicle scan across 40+ onboard control units',
      'Live fuel trim (STFT/LTFT) and O2 sensor logging',
      'Turbo boost pressure & manifold vacuum testing',
      'Ignition misfire cylinder counter monitoring',
      'Module adaptation reset and firmware health audit',
      'Itemized digital report sent directly to your phone'
    ],
    oemParts: ['Factory Protocol Software Report', 'CAN-Bus Module Log Export'],
    image: '/src/assets/images/service_engine_diagnostics_1792052412767.jpg',
    badge: 'Master Diagnostic'
  },
  {
    id: 'laser-alignment-suspension',
    name: 'Hunter Hawkeye Elite 4-Wheel Laser Alignment',
    category: 'suspension',
    price: 189,
    durationMinutes: 60,
    tagline: 'Sub-millimeter camber, caster & toe calibration for high-speed tracking',
    description: 'High-definition 3D laser target cameras calibrate caster, camber, and individual toe angles to exact manufacturer tolerances. Eliminates uneven tire wear, steering pull, and unstable highway tramlining.',
    recommendedInterval: 'Every 12,000 miles or post-tire replacement',
    includedChecklist: [
      'Four-wheel optical laser sensor alignment',
      'Steering angle sensor (SAS) electronic zero-calibration',
      'Tie rod ends and ball joint play inspection',
      'Subframe centering check and sway bar link test',
      'Before-and-after digital printout with angle tolerances',
      'Dynamic road test evaluation'
    ],
    oemParts: ['Hunter Elite Calibration Specsheet', 'Hardware Fasteners as needed']
  },
  {
    id: 'factory-milestone-service',
    name: 'Major Milestone Service (30k / 60k / 90k)',
    category: 'maintenance',
    price: 495,
    durationMinutes: 180,
    tagline: 'Comprehensive factory service maintaining all manufacturer warranty conditions',
    description: 'Thorough bumper-to-bumper factory maintenance schedule. Includes spark plug replacement, engine air filters, cabin HEPA filters, serpentine accessory belt check, cooling loop flush, and full drivetrain inspection.',
    recommendedInterval: 'At 30,000 / 60,000 / 90,000 miles',
    includedChecklist: [
      'Iridium spark plug replacement (if applicable)',
      'Dual engine air intake filter refresh',
      'Activated charcoal cabin pollen filter replacement',
      'Serpentine belt tensioner and pulley stethoscope check',
      'Radiator & heater core coolant freeze protection test',
      'Differential fluid check and suspension bushing torque'
    ],
    oemParts: ['OEM Laser Iridium Spark Plugs', 'Engine Air Filters', 'Charcoal Cabin Micro-filter']
  },
  {
    id: 'transmission-drivetrain-fluid',
    name: 'Transmission & Differential Fluid Exchange',
    category: 'transmission',
    price: 320,
    durationMinutes: 120,
    tagline: 'OEM fluid flush preventing clutch slip, valve body wear & overheating',
    description: 'Complete drain, filter pan replacement, and precision temperature-monitored fill of dual-clutch (PDK/DCT), automatic (ZF 8HP), or manual gearboxes. Protects gear sets and hydraulic solenoids.',
    recommendedInterval: 'Every 40,000 - 60,000 miles',
    includedChecklist: [
      'Transmission pan and integrated magnetic filter replacement',
      'OEM specific fluid replenishment at exact operating temp (40-50°C)',
      'Clutch adaptation relearn procedure via diagnostic tool',
      'Rear differential and transfer case fluid level audit',
      'Driveshaft giubo flex disc and center support bearing check'
    ],
    oemParts: ['OEM Transmission Filter Pan Gasket', 'ZF / Pentosin / OEM Fluid', 'Drain & Fill Plug Crush Seals']
  },
  {
    id: 'ev-hybrid-system-audit',
    name: 'EV & Hybrid High-Voltage System Audit',
    category: 'hybrid-ev',
    price: 219,
    durationMinutes: 75,
    tagline: 'Certified Level-3 high-voltage safety check and battery cell balancing',
    description: 'Certified EV master technicians conduct high-voltage insulation tests, check thermal management glycol loops, assess individual lithium cell voltages and delta degradation, and inspect regenerative brake calipers.',
    recommendedInterval: 'Every 15,000 miles or bi-annually',
    includedChecklist: [
      'High-voltage pack state-of-health (SoH) diagnostics',
      'Cell-to-cell millivolt variance and thermal profile check',
      'Dielectric coolant loop specific gravity test',
      '12V auxiliary AGM/Lithium battery load analysis',
      'Regenerative braking caliper slide servicing (rust mitigation)',
      'High-voltage cable orange harness physical insulation audit'
    ],
    oemParts: ['High-Voltage Diagnostic Health Certificate', 'Dielectric Loop Sealant']
  },
  {
    id: 'climate-ac-sterilization',
    name: 'Climate Control R1234yf / R134a Recharge & Sanitization',
    category: 'maintenance',
    price: 195,
    durationMinutes: 60,
    tagline: 'Ultra-low vent temps with microbiological evaporator sanitization',
    description: 'Automated refrigerant recovery, deep vacuum decay moisture test, precise gram-for-gram refrigerant recharge with UV dye, and ultrasonic evaporator misting to eradicate mold and odors.',
    recommendedInterval: 'Every 2 years or before summer',
    includedChecklist: [
      'Electronic evacuation and vacuum leak hold test (15 min)',
      'Factory gram weight refrigerant refill (R1234yf or R134a)',
      'PAG compressor oil replacement and UV leak dye injection',
      'Vent output temperature digital probe test (<42°F at idle)',
      'Cabin air intake ultrasonic antibacterial treatment'
    ],
    oemParts: ['OEM Refrigerant Spec', 'PAG Synthetic Lubricant', 'UV Fluorescent Dye']
  }
];

export const DEMO_INSPECTION_SAMPLE: DigitalInspectionReport = {
  ticketId: 'VAW-49210',
  date: 'Today, 09:30 AM',
  technician: 'Marcus Vance (ASE Master Tech #L1)',
  overallHealthScore: 88,
  categories: [
    {
      title: 'Braking & Safety Systems',
      items: [
        {
          name: 'Front Brake Pads',
          status: 'caution',
          measurement: '3.8 mm remaining',
          finding: 'Pads are worn within 1.8mm of wear indicator. Friction surface is slightly glazed.',
          recommendation: 'Recommend ceramic pad replacement within the next 2,000 miles.'
        },
        {
          name: 'Rear Brake Pads & Rotors',
          status: 'pass',
          measurement: '7.5 mm remaining',
          finding: 'Brembo friction lining is healthy, zero grooving on rotor surface.',
          recommendation: 'Good condition, no action required.'
        },
        {
          name: 'Brake Fluid Moisture Content',
          status: 'urgent',
          measurement: '3.8% water content',
          finding: 'Fluid boiling point severely depressed. Test strip indicates high moisture contamination.',
          recommendation: 'Requires immediate hydraulic flush with high-temp DOT 4 fluid to prevent vapor lock.'
        }
      ]
    },
    {
      title: 'Powertrain & Underhood Fluids',
      items: [
        {
          name: 'Engine Oil Level & Clarity',
          status: 'pass',
          measurement: 'Full (100% capacity)',
          finding: 'Motul 5W-40 freshly filled, zero particulates, filter seal dry.',
          recommendation: 'Next service due in 6,500 miles.'
        },
        {
          name: 'Engine Accessory Drive Belt',
          status: 'pass',
          measurement: 'Zero micro-cracks',
          finding: 'EPDM serpentine belt ribs are supple, tensioner damping is within factory spec.',
          recommendation: 'Passed all tension benchmarks.'
        },
        {
          name: 'Coolant Glycol Protection',
          status: 'pass',
          measurement: '-38°F protection',
          finding: 'Refractometer confirms 50/50 mix ratio, zero electrolysis in expansion tank.',
          recommendation: 'Optimal thermal capacity.'
        }
      ]
    },
    {
      title: 'Suspension, Tires & Undercarriage',
      items: [
        {
          name: 'Front Lower Control Arm Bushings',
          status: 'caution',
          measurement: 'Minor surface micro-tearing',
          finding: 'Hydraulic fluid bushing starting to weep dampness on passenger side.',
          recommendation: 'Monitor at next 30k interval or replace with solid monoball units.'
        },
        {
          name: 'Tire Tread Depth & Uniformity',
          status: 'pass',
          measurement: '6/32" across all four',
          finding: 'Michelin Pilot Sport 4S tires wearing evenly across tread face.',
          recommendation: 'Rotate front-to-rear if square fitment.'
        }
      ]
    }
  ]
};

export const INITIAL_ACTIVE_BOOKINGS: Booking[] = [
  {
    id: 'VAW-49210',
    customerName: 'Alexander Hayes',
    email: 'alex.hayes@precision.io',
    phone: '(415) 890-4421',
    vehicle: {
      year: 2023,
      make: 'BMW',
      model: 'M3 / M4',
      mileage: 24150,
      licensePlate: '7BMWM49'
    },
    services: [
      SERVICES_CATALOG[1], // Brake service
      SERVICES_CATALOG[2]  // Diagnostics
    ],
    date: 'Today',
    timeSlot: '09:00 AM - 11:30 AM',
    dropOffType: 'loaner',
    notes: 'Customer reported slight pedal softness during spirited braking and requested full brake fluid flush.',
    status: 'in_progress',
    bayNumber: 4,
    assignedTechnician: 'Marcus Vance',
    technicianTitle: 'ASE Master Certified L1 Specialist',
    estimatedCompletion: 'Today at 02:45 PM',
    totalCost: 538,
    createdAt: '2026-10-15 08:45 AM',
    inspectionReport: DEMO_INSPECTION_SAMPLE
  },
  {
    id: 'VAW-58133',
    customerName: 'Elena Rostova',
    email: 'elena.rostova@designworks.com',
    phone: '(415) 341-9982',
    vehicle: {
      year: 2024,
      make: 'Porsche',
      model: '911 (992 / 991)',
      mileage: 18200,
      licensePlate: '911PRSH'
    },
    services: [
      SERVICES_CATALOG[0], // Oil care
      SERVICES_CATALOG[3]  // Laser alignment
    ],
    date: 'Today',
    timeSlot: '11:00 AM - 01:30 PM',
    dropOffType: 'wait',
    notes: 'Requested Hunter Hawkeye track-spec camber alignment (-1.8 deg front) and Motul 300V oil change.',
    status: 'inspection',
    bayNumber: 2,
    assignedTechnician: 'Soren Lindqvist',
    technicianTitle: 'Porsche Factory Gold Certified Tech',
    estimatedCompletion: 'Today at 01:30 PM',
    totalCost: 328,
    createdAt: '2026-10-15 10:15 AM'
  },
  {
    id: 'VAW-61902',
    customerName: 'David Chen',
    email: 'd.chen@novacapital.com',
    phone: '(415) 672-0019',
    vehicle: {
      year: 2022,
      make: 'Audi',
      model: 'RS6 / RS7',
      mileage: 42800,
      licensePlate: '6V8TWIN'
    },
    services: [
      SERVICES_CATALOG[4], // Milestone 30k/60k
      SERVICES_CATALOG[5]  // Transmission fluid
    ],
    date: 'Yesterday',
    timeSlot: '08:30 AM',
    dropOffType: 'dropoff',
    notes: 'Full 40k major service including twin-scroll turbo intake cleaning and ZF 8HP trans service.',
    status: 'ready',
    bayNumber: 6,
    assignedTechnician: 'Sarah Jenkins',
    technicianTitle: 'Audi Master Guild Certified Tech',
    estimatedCompletion: 'Ready for Collection',
    totalCost: 815,
    createdAt: '2026-10-14 08:30 AM'
  }
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Julian Mercer',
    vehicle: '2022 Porsche 911 GT3 Touring',
    rating: 5,
    date: '3 days ago',
    serviceCompleted: 'Laser Wheel Alignment & Motul 300V Synthetic Care',
    comment: 'The transparency at Veloce is unmatched. Before touching a bolt, Marcus texted me a high-definition video of the underside showing minor sway bar link play and laser alignment angles before/after. The car tracks dead center at 130mph at Laguna Seca.',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Dr. Kimberly Vance',
    vehicle: '2023 BMW M5 Competition',
    rating: 5,
    date: '1 week ago',
    serviceCompleted: 'Ceramic Brake Overhaul & Brake Fluid Flush',
    comment: 'The dealership quoted me an absurd $2,400 for front brakes alone. Veloce installed superior Brembo ceramic pads with lifetime warranty hardware, resurfaced the floating rotors, and flushed with DOT 5.1 fluid for less than half the cost. Zero dust, zero squeal.',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Carlos Mendez',
    vehicle: '2021 Mercedes-AMG E63 S Wagon',
    rating: 5,
    date: '2 weeks ago',
    serviceCompleted: 'Computerized ECU Diagnostics & Boost Leak Fix',
    comment: 'Had an intermittent cylinder 3 misfire that stumped two local European shops. Veloce hooked up live CAN-bus telemetry, identified a micro-crack in the direct injection wiring harness in under 45 minutes, and solved it same-day. Absolute masters of modern electronics.',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Sophie Lauren',
    vehicle: '2023 Tesla Model S Plaid',
    rating: 5,
    date: '3 weeks ago',
    serviceCompleted: 'EV High-Voltage Health Audit & Caliper Lubrication',
    comment: 'Most independent shops are afraid of EVs. Veloce has certified Level-3 technicians who gave me a comprehensive cell-by-cell degradation analysis and lubed my Brembo regen sliders. Loaner vehicle was a brand new Polestar. Seamless experience.',
    verified: true
  }
];

export const WORKSHOP_AMENITIES = [
  {
    title: 'Executive Client Lounge',
    description: 'High-speed 1Gbps fiber Wi-Fi, private quiet phone booths, artisan espresso bar, and USB-C workstations while you wait.'
  },
  {
    title: 'Complimentary Luxury Loaner Fleet',
    description: 'Complimentary current-model loaner vehicles available for all services exceeding two hours.'
  },
  {
    title: '24/7 Contactless Key Drop Box',
    description: 'Drop off early morning or pick up after hours with secure, tamper-proof electronic lockboxes and SMS passcodes.'
  },
  {
    title: '24-Month / 24,000-Mile Warranty',
    description: 'Every part and labor hour is backed by our comprehensive nationwide warranty for total peace of mind.'
  }
];
