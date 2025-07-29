import React, { useState } from 'react';
import { Calendar, AlertCircle, CheckCircle, Clock, Car, Crown, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCars } from '../contexts/CarContext';
import { MaintenanceReminder } from '../types';
import Button from '../components/UI/Button';
import { Link } from 'react-router-dom';

const Maintenance: React.FC = () => {
  const { user } = useAuth();
  const { cars, reminders, getUpcomingReminders } = useCars();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'overdue' | 'completed'>('all');

  const upcomingReminders = getUpcomingReminders();
  const now = new Date();

  // Categorize reminders
  const categorizedReminders = reminders.reduce((acc, reminder) => {
    const car = cars.find(c => c.id === reminder.carId);
    if (!car) return acc;

    const isVisible = user?.isPremium || !reminder.isPremium;
    if (!isVisible) return acc;

    if (reminder.isCompleted) {
      acc.completed.push({ ...reminder, car });
    } else if (reminder.dueDate < now) {
      acc.overdue.push({ ...reminder, car });
    } else {
      acc.upcoming.push({ ...reminder, car });
    }
    return acc;
  }, {
    upcoming: [] as Array<MaintenanceReminder & { car: any }>,
    overdue: [] as Array<MaintenanceReminder & { car: any }>,
    completed: [] as Array<MaintenanceReminder & { car: any }>
  });

  const getFilteredReminders = () => {
    switch (filter) {
      case 'upcoming':
        return categorizedReminders.upcoming;
      case 'overdue':
        return categorizedReminders.overdue;
      case 'completed':
        return categorizedReminders.completed;
      default:
        return [
          ...categorizedReminders.overdue,
          ...categorizedReminders.upcoming,
          ...categorizedReminders.completed
        ];
    }
  };

  const filteredReminders = getFilteredReminders();

  const getReminderIcon = (type: MaintenanceReminder['type']) => {
    switch (type) {
      case 'oil_change':
        return '🛢️';
      case 'tire_balancing':
        return '🛞';
      case 'insurance':
        return '📋';
      case 'tax':
        return '📄';
      case 'predictive':
        return '🤖';
      default:
        return '🔧';
    }
  };

  const getReminderTitle = (type: MaintenanceReminder['type']) => {
    switch (type) {
      case 'oil_change':
        return 'Oil Change';
      case 'tire_balancing':
        return 'Tire Balancing';
      case 'insurance':
        return 'Insurance Renewal';
      case 'tax':
        return 'Tax Payment';
      case 'predictive':
        return 'Predictive Maintenance';
      default:
        return 'Maintenance';
    }
  };

  const getStatusBadge = (reminder: MaintenanceReminder) => {
    if (reminder.isCompleted) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </span>
      );
    }
    
    if (reminder.dueDate < now) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <AlertCircle className="h-3 w-3 mr-1" />
          Overdue
        </span>
      );
    }
    
    const daysUntilDue = Math.ceil(
      (reminder.dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysUntilDue <= 7) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="h-3 w-3 mr-1" />
          Due soon
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        <Calendar className="h-3 w-3 mr-1" />
        Scheduled
      </span>
    );
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const days = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (days < 0) {
      return `${Math.abs(days)} days overdue`;
    } else if (days === 0) {
      return 'Due today';
    } else if (days === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${days} days`;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your maintenance schedule.</p>
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
                Maintenance Schedule
              </h1>
              <p className="text-gray-600">
                Stay on top of your vehicle maintenance with smart reminders and tracking
              </p>
            </div>
            
            {cars.length === 0 ? (
              <Link
                to="/profile"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Your First Car
              </Link>
            ) : !user.isPremium ? (
              <Link
                to="/premium"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                <Crown className="h-5 w-5 mr-2" />
                Unlock Advanced Reminders
              </Link>
            ) : null}
          </div>
        </div>

        {cars.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No cars added yet
            </h3>
            <p className="text-gray-600 mb-6">
              Add your vehicle information to start tracking maintenance schedules
            </p>
            <Link to="/profile">
              <Button>Add Your First Car</Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {categorizedReminders.overdue.length}
                    </p>
                    <p className="text-gray-600">Overdue</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {upcomingReminders.length}
                    </p>
                    <p className="text-gray-600">Due Soon</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {categorizedReminders.upcoming.length}
                    </p>
                    <p className="text-gray-600">Scheduled</p>
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
                      {categorizedReminders.completed.length}
                    </p>
                    <p className="text-gray-600">Completed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'All Reminders' },
                  { key: 'overdue', label: 'Overdue' },
                  { key: 'upcoming', label: 'Due Soon' },
                  { key: 'completed', label: 'Completed' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      filter === key
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reminders List */}
            <div className="bg-white rounded-xl shadow-sm">
              {filteredReminders.length === 0 ? (
                <div className="p-12 text-center">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No reminders found
                  </h3>
                  <p className="text-gray-600">
                    {filter === 'all' 
                      ? 'Add maintenance dates to your cars to see reminders here.'
                      : `No ${filter} reminders at the moment.`
                    }
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredReminders.map((reminder) => (
                    <div key={reminder.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">
                            {getReminderIcon(reminder.type)}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                              {getReminderTitle(reminder.type)}
                              {reminder.isPremium && (
                                <Crown className="h-4 w-4 text-yellow-500 ml-2" />
                              )}
                            </h3>
                            <p className="text-gray-600">
                              {reminder.car.brand} {reminder.car.model} ({reminder.car.year})
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(reminder)}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4 sm:mb-0">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>Due: {reminder.dueDate.toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{getDaysUntilDue(reminder.dueDate)}</span>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          {!reminder.isCompleted && (
                            <Button
                              size="sm"
                              onClick={() => alert('Mark as completed functionality coming soon!')}
                            >
                              Mark Complete
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => alert('Schedule service functionality coming soon!')}
                          >
                            Schedule Service
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Premium Features Teaser */}
            {!user.isPremium && (
              <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Unlock Premium Maintenance Features
                    </h3>
                    <p className="text-blue-100 mb-4">
                      Get insurance reminders, tax alerts, AI predictions, and manage up to 5 cars
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Crown className="h-4 w-4 text-yellow-400" />
                        <span>Insurance & Tax Reminders</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Crown className="h-4 w-4 text-yellow-400" />
                        <span>Predictive AI Maintenance</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Crown className="h-4 w-4 text-yellow-400" />
                        <span>Up to 5 Cars</span>
                      </div>
                    </div>
                  </div>
                  <Link to="/premium">
                    <Button className="bg-white text-blue-600 hover:bg-gray-100">
                      Upgrade Now
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Maintenance;