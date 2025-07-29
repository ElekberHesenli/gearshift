import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Car, MaintenanceReminder } from '../types';
import { useAuth } from './AuthContext';

interface CarContextType {
  cars: Car[];
  reminders: MaintenanceReminder[];
  addCar: (car: Omit<Car, 'id' | 'userId' | 'createdAt'>) => void;
  updateCar: (id: string, updates: Partial<Car>) => void;
  deleteCar: (id: string) => void;
  getUpcomingReminders: () => MaintenanceReminder[];
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const useCars = () => {
  const context = useContext(CarContext);
  if (context === undefined) {
    throw new Error('useCars must be used within a CarProvider');
  }
  return context;
};

interface CarProviderProps {
  children: ReactNode;
}

export const CarProvider: React.FC<CarProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [reminders, setReminders] = useState<MaintenanceReminder[]>([]);

  useEffect(() => {
    if (user) {
      const savedCars = JSON.parse(localStorage.getItem(`cars_${user.id}`) || '[]');
      setCars(savedCars);
      
      // Generate reminders for cars
      generateReminders(savedCars);
    } else {
      setCars([]);
      setReminders([]);
    }
  }, [user]);

  const generateReminders = (userCars: Car[]) => {
    const newReminders: MaintenanceReminder[] = [];
    
    userCars.forEach(car => {
      const now = new Date();
      
      // Oil change reminder (every 6 months)
      if (car.lastOilChange) {
        const nextOilChange = new Date(car.lastOilChange);
        nextOilChange.setMonth(nextOilChange.getMonth() + 6);
        newReminders.push({
          id: `oil_${car.id}`,
          carId: car.id,
          type: 'oil_change',
          dueDate: nextOilChange,
          isPremium: false,
          isCompleted: nextOilChange < now
        });
      }
      
      // Tire balancing reminder (every 12 months)
      if (car.lastTireBalancing) {
        const nextTireBalancing = new Date(car.lastTireBalancing);
        nextTireBalancing.setMonth(nextTireBalancing.getMonth() + 12);
        newReminders.push({
          id: `tire_${car.id}`,
          carId: car.id,
          type: 'tire_balancing',
          dueDate: nextTireBalancing,
          isPremium: false,
          isCompleted: nextTireBalancing < now
        });
      }
      
      // Premium reminders
      if (user?.isPremium) {
        // Insurance reminder (yearly)
        const insuranceDate = new Date(now);
        insuranceDate.setMonth(insuranceDate.getMonth() + 11);
        newReminders.push({
          id: `insurance_${car.id}`,
          carId: car.id,
          type: 'insurance',
          dueDate: insuranceDate,
          isPremium: true,
          isCompleted: false
        });
        
        // Tax reminder (yearly)
        const taxDate = new Date(now);
        taxDate.setMonth(taxDate.getMonth() + 10);
        newReminders.push({
          id: `tax_${car.id}`,
          carId: car.id,
          type: 'tax',
          dueDate: taxDate,
          isPremium: true,
          isCompleted: false
        });
      }
    });
    
    setReminders(newReminders);
  };

  const addCar = (carData: Omit<Car, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;
    
    // Check limits for free users
    if (!user.isPremium && cars.length >= 1) {
      alert('Free users can only add 1 car. Upgrade to Premium to add more cars.');
      return;
    }
    
    const newCar: Car = {
      ...carData,
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date()
    };
    
    const updatedCars = [...cars, newCar];
    setCars(updatedCars);
    localStorage.setItem(`cars_${user.id}`, JSON.stringify(updatedCars));
    generateReminders(updatedCars);
  };

  const updateCar = (id: string, updates: Partial<Car>) => {
    if (!user) return;
    
    const updatedCars = cars.map(car => 
      car.id === id ? { ...car, ...updates } : car
    );
    setCars(updatedCars);
    localStorage.setItem(`cars_${user.id}`, JSON.stringify(updatedCars));
    generateReminders(updatedCars);
  };

  const deleteCar = (id: string) => {
    if (!user) return;
    
    const updatedCars = cars.filter(car => car.id !== id);
    setCars(updatedCars);
    localStorage.setItem(`cars_${user.id}`, JSON.stringify(updatedCars));
    generateReminders(updatedCars);
  };

  const getUpcomingReminders = () => {
    const now = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(now.getDate() + 30);
    
    return reminders.filter(reminder => 
      !reminder.isCompleted && 
      reminder.dueDate >= now && 
      reminder.dueDate <= thirtyDaysFromNow &&
      (user?.isPremium || !reminder.isPremium)
    );
  };

  return (
    <CarContext.Provider value={{
      cars,
      reminders,
      addCar,
      updateCar,
      deleteCar,
      getUpcomingReminders
    }}>
      {children}
    </CarContext.Provider>
  );
};