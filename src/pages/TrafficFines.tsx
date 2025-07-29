import React, { useState } from 'react';
import { AlertTriangle, CreditCard, Calendar, MapPin, Car, RefreshCw, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTrafficFines } from '../contexts/TrafficFinesContext';
import { usePayment } from '../contexts/PaymentContext';
import Button from '../components/UI/Button';
import { Link } from 'react-router-dom';

const TrafficFines: React.FC = () => {
  const { user } = useAuth();
  const { fines, payFine, refreshFines } = useTrafficFines();
  const { cards, processPayment } = usePayment();
  const [payingFine, setPayingFine] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string>('');

  const unpaidFines = fines.filter(fine => fine.status === 'unpaid');
  const paidFines = fines.filter(fine => fine.status === 'paid');
  const totalUnpaid = unpaidFines.reduce((sum, fine) => sum + fine.amount, 0);

  const handlePayFine = async (fineId: string, amount: number) => {
    if (cards.length === 0) {
      alert('Please add a payment card first to pay fines.');
      return;
    }

    setPayingFine(fineId);
    
    try {
      const success = await processPayment(amount, selectedCard || cards[0].id);
      if (success) {
        await payFine(fineId);
        alert('Fine paid successfully!');
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      alert('Payment error. Please try again.');
    } finally {
      setPayingFine(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </span>
        );
      case 'unpaid':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Unpaid
          </span>
        );
      default:
        return null;
    }
  };

  const isOverdue = (dueDate: Date) => {
    return new Date() > dueDate;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your traffic fines.</p>
          <Link to="/login" className="text-blue-600 hover:text-blue-500 mt-2 inline-block">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Traffic Fines & Violations
              </h1>
              <p className="text-gray-600">
                View and pay your traffic fines from Azerbaijan traffic police
              </p>
            </div>
            
            <Button
              onClick={refreshFines}
              className="flex items-center space-x-2"
              variant="outline"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Refresh Fines</span>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {unpaidFines.length}
                </p>
                <p className="text-gray-600">Unpaid Fines</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {paidFines.length}
                </p>
                <p className="text-gray-600">Paid Fines</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {totalUnpaid} AZN
                </p>
                <p className="text-gray-600">Total Unpaid</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Card Selection */}
        {unpaidFines.length > 0 && cards.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Select Payment Method
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cards.map((card) => (
                <label
                  key={card.id}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                    selectedCard === card.id || (selectedCard === '' && card.isDefault)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentCard"
                    value={card.id}
                    checked={selectedCard === card.id || (selectedCard === '' && card.isDefault)}
                    onChange={(e) => setSelectedCard(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">
                        **** **** **** {card.last4}
                      </p>
                      <p className="text-sm text-gray-500">
                        {card.brand} • {card.expiryMonth}/{card.expiryYear}
                      </p>
                    </div>
                    {card.isDefault && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>
            {cards.length === 0 && (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">No payment cards added yet.</p>
                <Link to="/profile">
                  <Button>Add Payment Card</Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Fines List */}
        <div className="space-y-6">
          {/* Unpaid Fines */}
          {unpaidFines.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Unpaid Fines ({unpaidFines.length})
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {unpaidFines.map((fine) => (
                  <div key={fine.id} className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1 mb-4 lg:mb-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">
                              {fine.violation}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Fine #{fine.fineNumber}
                            </p>
                          </div>
                          {getStatusBadge(fine.status)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Car className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {fine.vehiclePlate}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {fine.location}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {fine.date.toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className={`h-4 w-4 ${
                              isOverdue(fine.dueDate) ? 'text-red-500' : 'text-yellow-500'
                            }`} />
                            <span className={`text-sm ${
                              isOverdue(fine.dueDate) ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              Due: {fine.dueDate.toLocaleDateString()}
                              {isOverdue(fine.dueDate) && ' (Overdue)'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-3">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-red-600">
                            {fine.amount} AZN
                          </div>
                          <div className="text-sm text-gray-500">Fine Amount</div>
                        </div>

                        <Button
                          onClick={() => handlePayFine(fine.id, fine.amount)}
                          loading={payingFine === fine.id}
                          disabled={cards.length === 0}
                          className="flex items-center space-x-2"
                        >
                          <CreditCard className="h-4 w-4" />
                          <span>Pay Now</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Paid Fines */}
          {paidFines.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Paid Fines ({paidFines.length})
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {paidFines.map((fine) => (
                  <div key={fine.id} className="p-6 opacity-75">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-medium text-gray-700 mb-1">
                              {fine.violation}
                            </h4>
                            <p className="text-sm text-gray-500">
                              Fine #{fine.fineNumber}
                            </p>
                          </div>
                          {getStatusBadge(fine.status)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="flex items-center space-x-2">
                            <Car className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              {fine.vehiclePlate}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              {fine.location}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              {fine.date.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right mt-4 lg:mt-0">
                        <div className="text-xl font-medium text-gray-500">
                          {fine.amount} AZN
                        </div>
                        <div className="text-sm text-green-600">Paid</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {fines.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Traffic Fines
              </h3>
              <p className="text-gray-600">
                Great! You have no traffic violations on record.
              </p>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Important Notice</h4>
              <p className="text-blue-800 text-sm">
                This is a demo version with mock data. In the production version, this would integrate 
                with the official Azerbaijan traffic police system to show real fines and enable secure payments.
                All payment processing would be handled through certified payment gateways with proper security measures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficFines;