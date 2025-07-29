import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TrafficFine } from '../types';
import { useAuth } from './AuthContext';

interface TrafficFinesContextType {
  fines: TrafficFine[];
  payFine: (fineId: string) => Promise<boolean>;
  refreshFines: () => void;
}

const TrafficFinesContext = createContext<TrafficFinesContextType | undefined>(undefined);

export const useTrafficFines = () => {
  const context = useContext(TrafficFinesContext);
  if (context === undefined) {
    throw new Error('useTrafficFines must be used within a TrafficFinesProvider');
  }
  return context;
};

interface TrafficFinesProviderProps {
  children: ReactNode;
}

export const TrafficFinesProvider: React.FC<TrafficFinesProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [fines, setFines] = useState<TrafficFine[]>([]);

  useEffect(() => {
    if (user) {
      generateMockFines();
    } else {
      setFines([]);
    }
  }, [user]);

  const generateMockFines = () => {
    if (!user) return;

    // Generate some mock fines for demo
    const mockFines: TrafficFine[] = [
      {
        id: '1',
        userId: user.id,
        fineNumber: 'AZ-2024-001234',
        violation: 'Speeding (65 km/h in 50 km/h zone)',
        amount: 50,
        location: 'Heydar Aliyev Avenue, Baku',
        date: new Date('2024-12-15'),
        status: 'unpaid',
        dueDate: new Date('2025-01-15'),
        vehiclePlate: '10-AA-123'
      },
      {
        id: '2',
        userId: user.id,
        fineNumber: 'AZ-2024-001567',
        violation: 'Parking violation',
        amount: 20,
        location: 'Fountain Square, Baku',
        date: new Date('2024-12-20'),
        status: 'unpaid',
        dueDate: new Date('2025-01-20'),
        vehiclePlate: '10-AA-123'
      },
      {
        id: '3',
        userId: user.id,
        fineNumber: 'AZ-2024-000890',
        violation: 'Running red light',
        amount: 100,
        location: '28 May Street, Baku',
        date: new Date('2024-11-10'),
        status: 'paid',
        dueDate: new Date('2024-12-10'),
        vehiclePlate: '10-AA-123'
      }
    ];

    setFines(mockFines);
  };

  const payFine = async (fineId: string): Promise<boolean> => {
    // Simulate payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedFines = fines.map(fine => 
          fine.id === fineId 
            ? { ...fine, status: 'paid' as const }
            : fine
        );
        setFines(updatedFines);
        resolve(true);
      }, 2000);
    });
  };

  const refreshFines = () => {
    generateMockFines();
  };

  return (
    <TrafficFinesContext.Provider value={{
      fines,
      payFine,
      refreshFines
    }}>
      {children}
    </TrafficFinesContext.Provider>
  );
};