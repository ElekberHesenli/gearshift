import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { RideShare, RidePassenger } from '../types';
import { useAuth } from './AuthContext';

interface RideShareContextType {
  rides: RideShare[];
  myRides: RideShare[];
  addRide: (ride: Omit<RideShare, 'id' | 'userId' | 'driverName' | 'passengers' | 'createdAt'>) => void;
  joinRide: (rideId: string, seats: number) => boolean;
  cancelRide: (rideId: string) => void;
  leaveRide: (rideId: string) => void;
}

const RideShareContext = createContext<RideShareContextType | undefined>(undefined);

export const useRideShare = () => {
  const context = useContext(RideShareContext);
  if (context === undefined) {
    throw new Error('useRideShare must be used within a RideShareProvider');
  }
  return context;
};

interface RideShareProviderProps {
  children: ReactNode;
}

export const RideShareProvider: React.FC<RideShareProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [rides, setRides] = useState<RideShare[]>([]);

  useEffect(() => {
    // Load all rides from localStorage
    const savedRides = JSON.parse(localStorage.getItem('all_rides') || '[]');
    setRides(savedRides.map((ride: any) => ({
      ...ride,
      date: new Date(ride.date),
      createdAt: new Date(ride.createdAt),
      passengers: ride.passengers.map((p: any) => ({
        ...p,
        joinedAt: new Date(p.joinedAt)
      }))
    })));
  }, []);

  const myRides = rides.filter(ride => 
    ride.userId === user?.id || 
    ride.passengers.some(p => p.userId === user?.id)
  );

  const addRide = (rideData: Omit<RideShare, 'id' | 'userId' | 'driverName' | 'passengers' | 'createdAt'>) => {
    if (!user) return;

    const newRide: RideShare = {
      ...rideData,
      id: Date.now().toString(),
      userId: user.id,
      driverName: user.email.split('@')[0],
      passengers: [],
      createdAt: new Date()
    };

    const updatedRides = [...rides, newRide];
    setRides(updatedRides);
    localStorage.setItem('all_rides', JSON.stringify(updatedRides));
  };

  const joinRide = (rideId: string, seats: number): boolean => {
    if (!user) return false;

    const ride = rides.find(r => r.id === rideId);
    if (!ride || ride.userId === user.id) return false;

    // Check if user already joined
    if (ride.passengers.some(p => p.userId === user.id)) return false;

    // Check available seats
    const occupiedSeats = ride.passengers.reduce((sum, p) => sum + p.seats, 0);
    if (occupiedSeats + seats > ride.availableSeats) return false;

    const newPassenger: RidePassenger = {
      id: Date.now().toString(),
      userId: user.id,
      passengerName: user.email.split('@')[0],
      seats,
      status: 'confirmed',
      joinedAt: new Date()
    };

    const updatedRides = rides.map(r => 
      r.id === rideId 
        ? { ...r, passengers: [...r.passengers, newPassenger] }
        : r
    );

    setRides(updatedRides);
    localStorage.setItem('all_rides', JSON.stringify(updatedRides));
    return true;
  };

  const cancelRide = (rideId: string) => {
    if (!user) return;

    const updatedRides = rides.map(ride => 
      ride.id === rideId && ride.userId === user.id
        ? { ...ride, status: 'cancelled' as const }
        : ride
    );

    setRides(updatedRides);
    localStorage.setItem('all_rides', JSON.stringify(updatedRides));
  };

  const leaveRide = (rideId: string) => {
    if (!user) return;

    const updatedRides = rides.map(ride => 
      ride.id === rideId
        ? { ...ride, passengers: ride.passengers.filter(p => p.userId !== user.id) }
        : ride
    );

    setRides(updatedRides);
    localStorage.setItem('all_rides', JSON.stringify(updatedRides));
  };

  return (
    <RideShareContext.Provider value={{
      rides: rides.filter(r => r.status === 'active'),
      myRides,
      addRide,
      joinRide,
      cancelRide,
      leaveRide
    }}>
      {children}
    </RideShareContext.Provider>
  );
};