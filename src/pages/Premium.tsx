import React from 'react';
import { Crown, Check, Car, Bell, Shield, Headphones, Zap, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePayment } from '../contexts/PaymentContext';
import Button from '../components/UI/Button';

const Premium: React.FC = () => {
  const { user, upgradeToPremium } = useAuth();
  const { cards, processPayment } = usePayment();

  const freeFeatures = [
    'Add 1 car profile',
    'Basic maintenance reminders (oil, tires)',
    'Access to nearby services',
    'Standard support'
  ];

  const premiumFeatures = [
    'Add up to 5 cars',
    'All maintenance reminders',
    'Insurance & tax reminders',
    'Predictive maintenance AI',
    'Priority customer support',
    'Advanced analytics',
    'Export maintenance reports',
    'Early access to new features'
  ];

  const testimonials = [
    {
      name: 'Rashid Aliyev',
      role: 'Business Owner',
      content: 'CarCare AZ Premium has saved me thousands of manats by keeping track of all my fleet maintenance. The AI predictions are incredibly accurate!',
      rating: 5
    },
    {
      name: 'Leyla Hasanova',
      role: 'Daily Commuter',
      content: 'Never missed an oil change since upgrading to Premium. The insurance reminders alone are worth the subscription cost.',
      rating: 5
    },
    {
      name: 'Murad Gasimov',
      role: 'Car Enthusiast',
      content: 'Managing 3 cars was a nightmare before Premium. Now everything is organized and automated. Highly recommended!',
      rating: 5
    }
  ];

  const handleUpgrade = () => {
    if (!user) {
      alert('Please log in first to upgrade your account.');
      return;
    }

    if (cards.length === 0) {
      alert('Please add a payment card first to upgrade to Premium.');
      return;
    }

    // Process payment for premium upgrade
    processPayment(2).then(success => {
      if (success) {
        upgradeToPremium();
        alert('Welcome to Premium! 🎉 All premium features are now unlocked.');
      } else {
        alert('Payment failed. Please try again or check your payment method.');
      }
    });
  };

  const handlePaymentDemo = () => {
    if (cards.length === 0) {
      alert('Please add a payment card first. You can manage your cards in the Profile section.');
    } else {
      alert('🚀 TAP Payments integration ready! Click "Upgrade Now" to process the actual payment.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <Crown className="h-12 w-12 text-yellow-400" />
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Upgrade to
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Premium</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Unlock advanced car care features, manage multiple vehicles, and never miss important maintenance again
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleUpgrade}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 text-lg font-semibold hover:from-yellow-300 hover:to-orange-400"
            >
              {user?.isPremium ? 'Already Premium!' : 'Upgrade Now - 2 AZN/month'}
            </Button>
            <Button 
              onClick={handlePaymentDemo}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
            >
              View Payment Options
            </Button>
          </div>

          {user?.isPremium && (
            <div className="mt-8 bg-white/10 rounded-xl p-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Crown className="h-6 w-6 text-yellow-400" />
                <span className="text-xl font-semibold">Premium Member</span>
              </div>
              <p className="text-blue-100">You're already enjoying all premium features!</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Free vs Premium Features
            </h2>
            <p className="text-xl text-gray-600">
              See what you get with each plan
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Plan</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">0 AZN</div>
                <p className="text-gray-600">Perfect for single car owners</p>
              </div>

              <ul className="space-y-4 mb-8">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant="outline" 
                className="w-full py-3"
                disabled={!user || !user.isPremium}
              >
                {!user ? 'Sign Up Free' : user.isPremium ? 'Current: Premium' : 'Current Plan'}
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Crown className="h-8 w-8 text-yellow-400" />
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Premium Plan</h3>
                <div className="text-4xl font-bold mb-2">2 AZN</div>
                <p className="text-blue-100">per month • For serious car owners</p>
              </div>

              <ul className="space-y-4 mb-8">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={handleUpgrade}
                className="w-full py-3 bg-white text-blue-600 hover:bg-gray-100"
                disabled={user?.isPremium}
              >
                {user?.isPremium ? 'Already Premium!' : 'Upgrade to Premium'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Premium?
            </h2>
            <p className="text-xl text-gray-600">
              Advanced features designed for serious car owners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Car className="h-8 w-8" />,
                title: 'Multiple Cars',
                description: 'Manage up to 5 vehicles in one account'
              },
              {
                icon: <Bell className="h-8 w-8" />,
                title: 'Smart Reminders',
                description: 'Advanced AI-powered maintenance predictions'
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: 'Insurance Tracking',
                description: 'Never forget insurance or tax renewals'
              },
              {
                icon: <Headphones className="h-8 w-8" />,
                title: 'Priority Support',
                description: '24/7 priority customer assistance'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-xl w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Premium Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from car owners across Azerbaijan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4">
                  "{testimonial.content}"
                </blockquote>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Zap className="h-12 w-12 text-yellow-400" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Upgrade Your Car Care?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of car owners who trust CarCare AZ Premium for complete vehicle management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleUpgrade}
              className="bg-white text-blue-600 px-8 py-4 text-lg font-semibold hover:bg-gray-100"
              disabled={user?.isPremium}
            >
              {user?.isPremium ? 'Already Premium!' : 'Start Premium Today'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Premium;