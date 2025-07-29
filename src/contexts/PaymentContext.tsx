import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PaymentCard } from '../types';
import { useAuth } from './AuthContext';

interface PaymentContextType {
  cards: PaymentCard[];
  addCard: (card: Omit<PaymentCard, 'id' | 'userId' | 'createdAt'>) => void;
  removeCard: (cardId: string) => void;
  setDefaultCard: (cardId: string) => void;
  processPayment: (amount: number, cardId?: string) => Promise<boolean>;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

interface PaymentProviderProps {
  children: ReactNode;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [cards, setCards] = useState<PaymentCard[]>([]);

  useEffect(() => {
    if (user) {
      const savedCards = JSON.parse(localStorage.getItem(`cards_${user.id}`) || '[]');
      setCards(savedCards);
    } else {
      setCards([]);
    }
  }, [user]);

  const addCard = (cardData: Omit<PaymentCard, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;

    const newCard: PaymentCard = {
      ...cardData,
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date()
    };

    // If this is the first card, make it default
    if (cards.length === 0) {
      newCard.isDefault = true;
    }

    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    localStorage.setItem(`cards_${user.id}`, JSON.stringify(updatedCards));
  };

  const removeCard = (cardId: string) => {
    if (!user) return;

    const updatedCards = cards.filter(card => card.id !== cardId);
    
    // If we removed the default card and there are other cards, make the first one default
    if (cards.find(c => c.id === cardId)?.isDefault && updatedCards.length > 0) {
      updatedCards[0].isDefault = true;
    }

    setCards(updatedCards);
    localStorage.setItem(`cards_${user.id}`, JSON.stringify(updatedCards));
  };

  const setDefaultCard = (cardId: string) => {
    if (!user) return;

    const updatedCards = cards.map(card => ({
      ...card,
      isDefault: card.id === cardId
    }));

    setCards(updatedCards);
    localStorage.setItem(`cards_${user.id}`, JSON.stringify(updatedCards));
  };

  const processPayment = async (amount: number, cardId?: string): Promise<boolean> => {
    // Simulate payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would integrate with TAP Payments
        const success = Math.random() > 0.1; // 90% success rate for demo
        resolve(success);
      }, 2000);
    });
  };

  return (
    <PaymentContext.Provider value={{
      cards,
      addCard,
      removeCard,
      setDefaultCard,
      processPayment
    }}>
      {children}
    </PaymentContext.Provider>
  );
};