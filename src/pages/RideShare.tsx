import React, { useState } from 'react';
import { Plus, MapPin, Calendar, Clock, Users, Car, MessageCircle, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useRideShare } from '../contexts/RideShareContext';
import Button from '../components/UI/Button';
import { Link } from 'react-router-dom';

const RideShare: React.FC = () => {
  const { user } = useAuth();
  const { rides, myRides, addRide, joinRide, cancelRide, leaveRide } = useRideShare();
  const [showAddRideForm, setShowAddRideForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'available' | 'my-rides'>('available');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    price: '',
    availableSeats: 1,
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addRide({
      from: formData.from,
      to: formData.to,
      date: new Date(formData.date),
      time: formData.time,
      price: parseFloat(formData.price),
      availableSeats: formData.availableSeats,
      description: formData.description,
      status: 'active'
    });

    setFormData({
      from: '',
      to: '',
      date: '',
      time: '',
      price: '',
      availableSeats: 1,
      description: ''
    });
    setShowAddRideForm(false);
  };

  const handleJoinRide = (rideId: string, seats: number = 1) => {
    const success = joinRide(rideId, seats);
    if (success) {
      alert('Successfully joined the ride! The driver will be notified.');
    } else {
      alert('Unable to join ride. It may be full or you may have already joined.');
    }
  };

  const getAvailableSeats = (ride: any) => {
    const occupiedSeats = ride.passengers.reduce((sum: number, p: any) => sum + p.seats, 0);
    return ride.availableSeats - occupiedSeats;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to access rideshare features.</p>
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
                RideShare Azerbaijan
              </h1>
              <p className="text-gray-600">
                Share rides, save money, and travel together across Azerbaijan
              </p>
            </div>
            
            <Button
              onClick={() => setShowAddRideForm(true)}
              className="flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Post a Ride</span>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('available')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'available'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Available Rides ({rides.length})
              </button>
              <button
                onClick={() => setActiveTab('my-rides')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'my-rides'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Rides ({myRides.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Add Ride Form */}
        {showAddRideForm && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Post a New Ride</h3>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From *
                </label>
                <input
                  type="text"
                  required
                  value={formData.from}
                  onChange={(e) => setFormData(prev => ({ ...prev, from: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Baku"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To *
                </label>
                <input
                  type="text"
                  required
                  value={formData.to}
                  onChange={(e) => setFormData(prev => ({ ...prev, to: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Ganja"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time *
                </label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per seat (AZN) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  step="0.5"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Seats *
                </label>
                <select
                  value={formData.availableSeats}
                  onChange={(e) => setFormData(prev => ({ ...prev, availableSeats: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6, 7].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Additional details about the trip..."
                />
              </div>

              <div className="md:col-span-2 flex space-x-4">
                <Button type="submit" className="flex-1">
                  Post Ride
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddRideForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Rides List */}
        <div className="space-y-6">
          {activeTab === 'available' ? (
            rides.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No rides available
                </h3>
                <p className="text-gray-600 mb-6">
                  Be the first to post a ride and help others travel!
                </p>
                <Button onClick={() => setShowAddRideForm(true)}>
                  Post a Ride
                </Button>
              </div>
            ) : (
              rides.map((ride) => {
                const availableSeats = getAvailableSeats(ride);
                const isMyRide = ride.userId === user.id;
                const hasJoined = ride.passengers.some(p => p.userId === user.id);
                
                return (
                  <div key={ride.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1 mb-4 lg:mb-0">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Car className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {ride.driverName}
                            </h3>
                            <p className="text-gray-600 text-sm">Driver</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {ride.from} → {ride.to}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {ride.date.toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{ride.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {availableSeats} seats available
                            </span>
                          </div>
                        </div>

                        {ride.description && (
                          <p className="text-gray-600 text-sm mb-4">{ride.description}</p>
                        )}

                        {ride.passengers.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Passengers:</p>
                            <div className="flex flex-wrap gap-2">
                              {ride.passengers.map((passenger) => (
                                <span
                                  key={passenger.id}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                >
                                  {passenger.passengerName} ({passenger.seats} seat{passenger.seats > 1 ? 's' : ''})
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end space-y-3">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {ride.price} AZN
                          </div>
                          <div className="text-sm text-gray-500">per seat</div>
                        </div>

                        <div className="flex space-x-2">
                          {!isMyRide && !hasJoined && availableSeats > 0 && (
                            <Button
                              onClick={() => handleJoinRide(ride.id)}
                              className="flex items-center space-x-2"
                            >
                              <CreditCard className="h-4 w-4" />
                              <span>Join Ride</span>
                            </Button>
                          )}
                          
                          <Button
                            variant="outline"
                            onClick={() => alert('Chat feature coming soon!')}
                            className="flex items-center space-x-2"
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span>Message</span>
                          </Button>

                          {isMyRide && (
                            <Button
                              variant="outline"
                              onClick={() => {
                                if (window.confirm('Are you sure you want to cancel this ride?')) {
                                  cancelRide(ride.id);
                                }
                              }}
                              className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                              Cancel
                            </Button>
                          )}

                          {hasJoined && !isMyRide && (
                            <Button
                              variant="outline"
                              onClick={() => {
                                if (window.confirm('Are you sure you want to leave this ride?')) {
                                  leaveRide(ride.id);
                                }
                              }}
                              className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                              Leave
                            </Button>
                          )}
                        </div>

                        {hasJoined && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Joined
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )
          ) : (
            myRides.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No rides yet
                </h3>
                <p className="text-gray-600">
                  You haven't posted or joined any rides yet.
                </p>
              </div>
            ) : (
              myRides.map((ride) => {
                const availableSeats = getAvailableSeats(ride);
                const isMyRide = ride.userId === user.id;
                
                return (
                  <div key={ride.id} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Car className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {ride.from} → {ride.to}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {isMyRide ? 'Your ride' : `Joined ${ride.driverName}'s ride`}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-blue-600">{ride.price} AZN</div>
                        <div className="text-sm text-gray-500">
                          {ride.date.toLocaleDateString()} at {ride.time}
                        </div>
                      </div>
                    </div>

                    {ride.passengers.length > 0 && (
                      <div className="border-t pt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Passengers ({ride.passengers.length}):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {ride.passengers.map((passenger) => (
                            <span
                              key={passenger.id}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                            >
                              {passenger.passengerName}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default RideShare;