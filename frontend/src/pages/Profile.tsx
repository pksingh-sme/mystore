import { useState } from 'react';
import { Button } from '../components/ui/button';
import MotionWrapper from '../components/ui/motion-wrapper';
import { User, Mail, Phone, MapPin, CreditCard } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    address: '123 Main Street, New York, NY 10001',
    joinDate: 'January 15, 2023'
  };

  const orders = [
    {
      id: 'SHOPEASE-2023-001',
      date: 'November 15, 2023',
      total: 289.98,
      status: 'Processing'
    },
    {
      id: 'SHOPEASE-2023-002',
      date: 'November 10, 2023',
      total: 159.99,
      status: 'Shipped'
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'Visa',
      number: '**** **** **** 1234',
      expiry: '12/25'
    },
    {
      id: 2,
      type: 'PayPal',
      email: 'john.doe@example.com'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <MotionWrapper
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">My Account</h1>
        <p className="text-muted">Manage your profile and preferences</p>
      </MotionWrapper>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white dark:bg-background-dark rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div className="ml-4">
                <h2 className="font-bold text-gray-900 dark:text-white">{user.name}</h2>
                <p className="text-sm text-muted">Member since {user.joinDate}</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              {[
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'orders', label: 'Order History', icon: CreditCard },
                { id: 'payment', label: 'Payment Methods', icon: CreditCard }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="bg-white dark:bg-background-dark rounded-2xl shadow-lg p-6">
            {activeTab === 'profile' && (
              <MotionWrapper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <User className="h-5 w-5 text-muted mr-3" />
                      <span className="text-gray-900 dark:text-white">{user.name}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Mail className="h-5 w-5 text-muted mr-3" />
                      <span className="text-gray-900 dark:text-white">{user.email}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Phone className="h-5 w-5 text-muted mr-3" />
                      <span className="text-gray-900 dark:text-white">{user.phone}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Shipping Address</label>
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <MapPin className="h-5 w-5 text-muted mr-3" />
                      <span className="text-gray-900 dark:text-white">{user.address}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button variant="default" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                    Edit Profile
                  </Button>
                </div>
              </MotionWrapper>
            )}
            
            {activeTab === 'orders' && (
              <MotionWrapper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Order History</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">Order #{order.id}</h3>
                          <p className="text-muted text-sm">{order.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 rounded text-sm">
                            {order.status}
                          </span>
                          <span className="font-bold text-gray-900 dark:text-white">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </MotionWrapper>
            )}
            
            {activeTab === 'payment' && (
              <MotionWrapper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Payment Methods</h2>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CreditCard className="h-6 w-6 text-muted mr-3" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{method.type}</p>
                            <p className="text-muted text-sm">
                              {method.number ? method.number : method.email}
                              {method.expiry && ` • Exp ${method.expiry}`}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Remove</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button variant="default" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                    Add Payment Method
                  </Button>
                </div>
              </MotionWrapper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;