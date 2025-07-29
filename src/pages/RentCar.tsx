import React from 'react';
import { Car, Calendar, MapPin, Users, Fuel, Shield, Clock, ArrowRight } from 'lucide-react';

const RentCar: React.FC = () => {
  const mockCars = [
    {
      id: 1,
      name: 'Toyota Camry 2023',
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      price: '45 AZN/day',
      specs: {
        seats: 5,
        fuel: 'Petrol',
        transmission: 'Automatic',
        category: 'Sedan'
      },
      features: ['GPS Navigation', 'Air Conditioning', 'Bluetooth', 'USB Charging']
    },
    {
      id: 2,
      name: 'BMW X5 2022',
      image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg',
      price: '85 AZN/day',
      specs: {
        seats: 7,
        fuel: 'Petrol',
        transmission: 'Automatic',
        category: 'SUV'
      },
      features: ['Leather Seats', 'Panoramic Roof', 'Premium Sound', 'All-Wheel Drive']
    },
    {
      id: 3,
      name: 'Mercedes C-Class',
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
      price: '65 AZN/day',
      specs: {
        seats: 5,
        fuel: 'Petrol',
        transmission: 'Automatic',
        category: 'Luxury'
      },
      features: ['Premium Interior', 'Advanced Safety', 'Premium Audio', 'Climate Control']
    }
  ];

  const filters = [
    { icon: <Car className="h-5 w-5" />, label: 'All Categories' },
    { icon: <Users className="h-5 w-5" />, label: 'Sedan' },
    { icon: <Car className="h-5 w-5" />, label: 'SUV' },
    { icon: <Shield className="h-5 w-5" />, label: 'Luxury' }
  ];

  const handleAction = () => {
    alert('🚀 Rent-a-Car feature is coming soon! This is currently disabled in the MVP version but will be available in future updates with full booking functionality.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Car Rentals Coming Soon!
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              We're working hard to bring you the best car rental experience in Azerbaijan. 
              Premium vehicles, competitive prices, and seamless booking - all in one place.
            </p>
            <div className="bg-white/10 rounded-xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="h-6 w-6 text-yellow-400" />
                <span className="text-xl font-semibold">Coming Soon</span>
              </div>
              <p className="text-blue-100">
                Sign up for early access and get notified when we launch!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section (Disabled) */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-100 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gray-900/20 z-10 flex items-center justify-center">
              <div className="bg-white rounded-lg p-4 text-center">
                <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">Feature Coming Soon</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pick-up Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    disabled
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                    placeholder="Baku city center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pick-up Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    disabled
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    disabled
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleAction}
                  disabled
                  className="w-full bg-gray-400 text-white py-3 px-6 rounded-lg font-medium cursor-not-allowed opacity-60"
                >
                  Search Cars
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters (Disabled) */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {filters.map((filter, index) => (
              <button
                key={index}
                onClick={handleAction}
                disabled
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-500 bg-gray-50 cursor-not-allowed opacity-60"
              >
                {filter.icon}
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Car Listings (Demo - Disabled) */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Premium Vehicle Fleet (Preview)
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get a preview of our upcoming car rental fleet. These vehicles will be available 
              for booking when we officially launch our rental service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockCars.map((car) => (
              <div key={car.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden relative">
                {/* Coming Soon Badge */}
                <div className="absolute top-4 right-4 bg-gray-900/80 text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                  Coming Soon
                </div>
                
                <div className="relative overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gray-900/20" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {car.name}
                    </h3>
                    <span className="text-2xl font-bold text-blue-600">
                      {car.price}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{car.specs.seats} Seats</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Fuel className="h-4 w-4" />
                      <span>{car.specs.fuel}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Car className="h-4 w-4" />
                      <span>{car.specs.transmission}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>{car.specs.category}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {car.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleAction}
                      disabled
                      className="flex-1 bg-gray-400 text-white py-3 px-4 rounded-lg font-medium cursor-not-allowed opacity-60 flex items-center justify-center space-x-2"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleAction}
                      disabled
                      className="px-4 py-3 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 cursor-not-allowed opacity-60"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What to Expect from Our Rental Service
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're building the most comprehensive car rental platform in Azerbaijan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Car className="h-12 w-12 text-blue-600" />,
                title: 'Premium Fleet',
                description: 'Latest models from top brands, regularly maintained and inspected for your safety and comfort.'
              },
              {
                icon: <Shield className="h-12 w-12 text-blue-600" />,
                title: 'Full Insurance',
                description: 'Complete coverage included with every rental. Drive with confidence knowing you are protected.'
              },
              {
                icon: <MapPin className="h-12 w-12 text-blue-600" />,
                title: 'Multiple Locations',
                description: 'Convenient pick-up and drop-off points across Baku and major cities in Azerbaijan.'
              },
              {
                icon: <Clock className="h-12 w-12 text-blue-600" />,
                title: '24/7 Support',
                description: 'Round-the-clock customer service and roadside assistance whenever you need help.'
              },
              {
                icon: <Fuel className="h-12 w-12 text-blue-600" />,
                title: 'Fuel Included',
                description: 'Start your journey with a full tank. Return with any amount - we handle the rest.'
              },
              {
                icon: <Users className="h-12 w-12 text-blue-600" />,
                title: 'Easy Booking',
                description: 'Simple online booking process. Reserve your car in minutes and get instant confirmation.'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Be the First to Experience Our Rental Service
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Sign up for early access and get exclusive launch deals when we go live
          </p>
          <button
            onClick={handleAction}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Notify Me When Available
          </button>
          <p className="text-blue-200 text-sm mt-4">
            Expected launch: Q2 2025
          </p>
        </div>
      </section>
    </div>
  );
};

export default RentCar;