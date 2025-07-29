import { Service } from '../types';

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Baku Auto Service Center',
    address: '123 Nizami Street, Baku, Azerbaijan',
    phone: '+994 12 555-0123',
    type: 'service_center',
    rating: 4.8,
    coordinates: { lat: 40.4093, lng: 49.8671 }
  },
  {
    id: '2',
    name: 'Premium Car Care',
    address: '456 Heydar Aliyev Avenue, Baku, Azerbaijan',
    phone: '+994 12 555-0456',
    type: 'service_center',
    rating: 4.6,
    coordinates: { lat: 40.3755, lng: 49.8328 }
  },
  {
    id: '3',
    name: 'SOCAR Gas Station',
    address: '789 28 May Street, Baku, Azerbaijan',
    phone: '+994 12 555-0789',
    type: 'gas_station',
    rating: 4.4,
    coordinates: { lat: 40.3947, lng: 49.8820 }
  },
  {
    id: '4',
    name: 'AutoTech Professional',
    address: '321 Fountain Square, Baku, Azerbaijan',
    phone: '+994 12 555-0321',
    type: 'service_center',
    rating: 4.9,
    coordinates: { lat: 40.3729, lng: 49.8358 }
  },
  {
    id: '5',
    name: 'BP Petrol Station',
    address: '654 Nobel Avenue, Baku, Azerbaijan',
    phone: '+994 12 555-0654',
    type: 'gas_station',
    rating: 4.2,
    coordinates: { lat: 40.4086, lng: 49.8203 }
  },
  {
    id: '6',
    name: 'Elite Car Service',
    address: '987 Bulvar Avenue, Baku, Azerbaijan',
    phone: '+994 12 555-0987',
    type: 'service_center',
    rating: 4.7,
    coordinates: { lat: 40.3656, lng: 49.8350 }
  }
];