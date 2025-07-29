export interface User {
  id: string;
  email: string;
  phone?: string;
  isPremium: boolean;
  createdAt: Date;
}

export interface Car {
  id: string;
  userId: string;
  brand: string;
  model: string;
  year: number;
  mileage?: number;
  lastOilChange?: Date;
  lastTireBalancing?: Date;
  createdAt: Date;
}

export interface MaintenanceReminder {
  id: string;
  carId: string;
  type: 'oil_change' | 'tire_balancing' | 'insurance' | 'tax' | 'predictive';
  dueDate: Date;
  isPremium: boolean;
  isCompleted: boolean;
}

export interface Service {
  id: string;
  name: string;
  address: string;
  phone: string;
  type: 'service_center' | 'gas_station';
  rating: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface RideShare {
  id: string;
  userId: string;
  driverName: string;
  from: string;
  to: string;
  date: Date;
  time: string;
  price: number;
  availableSeats: number;
  description?: string;
  status: 'active' | 'completed' | 'cancelled';
  passengers: RidePassenger[];
  createdAt: Date;
}

export interface RidePassenger {
  id: string;
  userId: string;
  passengerName: string;
  seats: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  joinedAt: Date;
}

export interface TrafficFine {
  id: string;
  userId: string;
  fineNumber: string;
  violation: string;
  amount: number;
  location: string;
  date: Date;
  status: 'unpaid' | 'paid' | 'disputed';
  dueDate: Date;
  vehiclePlate: string;
}

export interface PaymentCard {
  id: string;
  userId: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  createdAt: Date;
}

export interface RideShare {
  id: string;
  userId: string;
  driverName: string;
  from: string;
  to: string;
  date: Date;
  time: string;
  price: number;
  availableSeats: number;
  description?: string;
  status: 'active' | 'completed' | 'cancelled';
  passengers: RidePassenger[];
  createdAt: Date;
}

export interface RidePassenger {
  id: string;
  userId: string;
  passengerName: string;
  seats: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  joinedAt: Date;
}

export interface TrafficFine {
  id: string;
  userId: string;
  fineNumber: string;
  violation: string;
  amount: number;
  location: string;
  date: Date;
  status: 'unpaid' | 'paid' | 'disputed';
  dueDate: Date;
  vehiclePlate: string;
}

export interface PaymentCard {
  id: string;
  userId: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  createdAt: Date;
}