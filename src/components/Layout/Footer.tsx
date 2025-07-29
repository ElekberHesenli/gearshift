import React from 'react';
import { Car, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Car className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">GearShift</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted car maintenance companion in Azerbaijan. Keep your vehicle in perfect condition with our smart reminders and services.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>Baku, Azerbaijan</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/profile" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  My Cars
                </a>
              </li>
              <li>
                <a href="/maintenance" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Maintenance
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Services
                </a>
              </li>
              <li>
                <a href="/premium" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Go Premium
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>support@carcare.az</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+994 12 555-0000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 CarCare AZ. All rights reserved. Built for Azerbaijan's automotive community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;