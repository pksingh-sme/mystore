import { Button } from '../components/ui/button';
import MotionWrapper from '../components/ui/motion-wrapper';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
  // Mock cart data
  const cartItems = [
    {
      id: 1,
      name: 'Premium Headphones',
      price: 199.99,
      quantity: 1,
      image: 'https://via.placeholder.com/100x100',
      description: 'High-quality sound with noise cancellation'
    },
    {
      id: 2,
      name: 'Wireless Earbuds',
      price: 89.99,
      quantity: 2,
      image: 'https://via.placeholder.com/100x100',
      description: 'True wireless earbuds with charging case'
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <MotionWrapper
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-secondary dark:text-white">Your Shopping Cart</h1>
        <p className="text-muted">Review and manage your items before checkout</p>
      </MotionWrapper>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center p-6 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 object-contain rounded-lg"
                />
                
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-secondary dark:text-white">{item.name}</h3>
                      <p className="text-muted text-sm mt-1">{item.description}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-muted hover:text-danger">
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <Button variant="outline" size="sm" className="p-2">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-3 w-8 text-center">{item.quantity}</span>
                      <Button variant="outline" size="sm" className="p-2">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-secondary dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-muted text-sm">${item.price} each</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <MotionWrapper
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xl font-bold mb-6 text-secondary dark:text-white">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium text-secondary dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span className="font-medium text-secondary dark:text-white">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Tax</span>
                <span className="font-medium text-secondary dark:text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button variant="default" size="lg" className="w-full shadow-lg hover:shadow-xl">
              Proceed to Checkout
            </Button>
            
            <Button variant="outline" size="lg" className="w-full mt-3">
              Continue Shopping
            </Button>
          </MotionWrapper>
        </div>
      </div>
    </div>
  );
};

export default Cart;