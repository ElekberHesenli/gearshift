import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Car, Calendar, AlertCircle, Crown, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCars } from '../contexts/CarContext';
import { usePayment } from '../contexts/PaymentContext';
import { Car as CarType } from '../types';
import Button from '../components/UI/Button';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { cars, addCar, updateCar, deleteCar, getUpcomingReminders } = useCars();
  const { cards } = usePayment();
  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const [editingCar, setEditingCar] = useState<CarType | null>(null);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: '',
    lastOilChange: '',
    lastTireBalancing: ''
  });

  const upcomingReminders = getUpcomingReminders();

  const resetForm = () => {
    setFormData({
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      mileage: '',
      lastOilChange: '',
      lastTireBalancing: ''
    });
    setShowAddCarForm(false);
    setEditingCar(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const carData = {
      brand: formData.brand,
      model: formData.model,
      year: formData.year,
      mileage: formData.mileage ? parseInt(formData.mileage) : undefined,
      lastOilChange: formData.lastOilChange ? new Date(formData.lastOilChange) : undefined,
      lastTireBalancing: formData.lastTireBalancing ? new Date(formData.lastTireBalancing) : undefined
    };

    if (editingCar) {
      updateCar(editingCar.id, carData);
    } else {
      addCar(carData);
    }

    resetForm();
  };

  const handleEdit = (car: CarType) => {
    setEditingCar(car);
    setFormData({
      brand: car.brand,
      model: car.model,
      year: car.year,
      mileage: car.mileage?.toString() || '',
      lastOilChange: car.lastOilChange ? car.lastOilChange.toISOString().split('T')[0] : '',
      lastTireBalancing: car.lastTireBalancing ? car.lastTireBalancing.toISOString().split('T')[0] : ''
    });
    setShowAddCarForm(true);
  };

  const handleDelete = (carId: string) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      deleteCar(carId);
    }
  };

  const canAddMoreCars = user?.isPremium || cars.length < 1;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your profile.</p>
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user.email.split('@')[0]}!
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-gray-600">
                    Account Status: 
                  </p>
                  {user.isPremium ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      <Crown className="h-4 w-4 mr-1" />
                      Premium
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      Free
                    </span>
                  )}
                </div>
              </div>
            </div>
            {!user.isPremium && (
              <Link
                to="/premium"
                className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Upgrade to Premium
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cars Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My Cars</h2>
                {canAddMoreCars ? (
                  <Button
                    onClick={() => setShowAddCarForm(true)}
                    className="flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Car</span>
                  </Button>
                ) : (
                  <div className="text-sm text-gray-500">
                    <p>Free users can add 1 car.</p>
                    <Link to="/premium" className="text-blue-600 hover:text-blue-500">
                      Upgrade for more
                    </Link>
                  </div>
                )}
              </div>

              {cars.length === 0 ? (
                <div className="text-center py-12">
                  <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No cars added yet</h3>
                  <p className="text-gray-600 mb-4">Add your first car to start tracking maintenance</p>
                  {canAddMoreCars && (
                    <Button onClick={() => setShowAddCarForm(true)}>
                      Add Your First Car
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cars.map((car) => (
                    <div key={car.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {car.brand} {car.model}
                          </h3>
                          <p className="text-gray-600">{car.year}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(car)}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(car.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {car.mileage && (
                          <div className="flex items-center text-sm text-gray-600">
                            <span>Mileage: {car.mileage.toLocaleString()} km</span>
                          </div>
                        )}
                        {car.lastOilChange && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>Last oil change: {car.lastOilChange.toLocaleDateString()}</span>
                          </div>
                        )}
                        {car.lastTireBalancing && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>Last tire balancing: {car.lastTireBalancing.toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add/Edit Car Form */}
            {showAddCarForm && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  {editingCar ? 'Edit Car' : 'Add New Car'}
                </h3>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.brand}
                      onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Toyota, BMW"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Model *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.model}
                      onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Camry, X5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year *
                    </label>
                    <input
                      type="number"
                      required
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      value={formData.year}
                      onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mileage (km)
                    </label>
                    <input
                      type="number"
                      value={formData.mileage}
                      onChange={(e) => setFormData(prev => ({ ...prev, mileage: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Current mileage"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Oil Change
                    </label>
                    <input
                      type="date"
                      value={formData.lastOilChange}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastOilChange: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Tire Balancing
                    </label>
                    <input
                      type="date"
                      value={formData.lastTireBalancing}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastTireBalancing: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2 flex space-x-4">
                    <Button type="submit" className="flex-1">
                      {editingCar ? 'Update Car' : 'Add Car'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={resetForm}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Reminders */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Reminders</h3>
              
              {upcomingReminders.length === 0 ? (
                <p className="text-gray-600 text-sm">No upcoming reminders</p>
              ) : (
                <div className="space-y-3">
                  {upcomingReminders.map((reminder) => {
                    const car = cars.find(c => c.id === reminder.carId);
                    const daysUntilDue = Math.ceil(
                      (reminder.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                    );
                    
                    return (
                      <div key={reminder.id} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-yellow-800">
                            {reminder.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </p>
                          <p className="text-xs text-yellow-700">
                            {car?.brand} {car?.model} - Due in {daysUntilDue} days
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
                {user.phone && (
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{user.phone}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Member since</p>
                  <p className="font-medium text-gray-900">
                    {user.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cars limit</p>
                  <p className="font-medium text-gray-900">
                    {cars.length} / {user.isPremium ? '5' : '1'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment cards</p>
                  <p className="font-medium text-gray-900">{cards.length}</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  to="/cards"
                  className="flex items-center justify-center w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Manage Payment Cards
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;