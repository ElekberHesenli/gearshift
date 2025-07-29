import React, { useState } from 'react';
import { MapPin, Phone, Star, Navigation, Filter, Car, Fuel } from 'lucide-react';
import { mockServices } from '../data/mockServices';
import { Service } from '../types';

const Services: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'service_center' | 'gas_station'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'distance'>('rating');

  const filteredServices = mockServices.filter(service => 
    filter === 'all' || service.type === filter
  );

  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    // For demo, using random distance
    return Math.random() - 0.5;
  });

  const getServiceIcon = (type: Service['type']) => {
    switch (type) {
      case 'service_center':
        return <Car className="h-6 w-6" />;
      case 'gas_station':
        return <Fuel className="h-6 w-6" />;
      default:
        return <MapPin className="h-6 w-6" />;
    }
  };

  const getServiceTypeLabel = (type: Service['type']) => {
    switch (type) {
      case 'service_center':
        return 'Service Center';
      case 'gas_station':
        return 'Gas Station';
      default:
        return 'Service';
    }
  };

  const handleGetDirections = (service: Service) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      service.name + ' ' + service.address
    )}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Find Services Near You
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover trusted service centers and gas stations across Baku and Azerbaijan. 
            Quality services for your vehicle maintenance needs.
          </p>
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-800 text-sm">
              🚀 <strong>Coming Soon:</strong> Real-time availability, online booking, and integrated payment options!
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filter by type:</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    filter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Services
                </button>
                <button
                  onClick={() => setFilter('service_center')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    filter === 'service_center'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Service Centers
                </button>
                <button
                  onClick={() => setFilter('gas_station')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    filter === 'gas_station'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Gas Stations
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'distance')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="rating">Highest Rating</option>
                <option value="distance">Distance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedServices.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      service.type === 'service_center' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {getServiceIcon(service.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {service.name}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        service.type === 'service_center' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {getServiceTypeLabel(service.type)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(service.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {service.rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    (Demo rating)
                  </span>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-2 mb-4">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{service.address}</p>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-2 mb-6">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-600">{service.phone}</p>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleGetDirections(service)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Navigation className="h-4 w-4" />
                    <span>Directions</span>
                  </button>
                  <a
                    href={`tel:${service.phone}`}
                    className="flex items-center justify-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedServices.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No services found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filter criteria to find more services.
            </p>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-12 bg-gray-100 rounded-xl p-6 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Want to list your business?
          </h3>
          <p className="text-gray-600 mb-4">
            Join our network of trusted service providers in Azerbaijan.
          </p>
          <button 
            onClick={() => alert('Business registration coming soon!')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Register Your Business
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;