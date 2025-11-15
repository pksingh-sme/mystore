import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import MotionWrapper from '../components/ui/motion-wrapper';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <MotionWrapper
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white dark:bg-background-dark rounded-2xl shadow-lg p-8">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Order Confirmed!</h1>
          <p className="text-muted mb-2">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <p className="text-muted mb-8">
            Order #<span className="font-medium text-primary">SHOPEASE-2023-001</span>
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8 text-left">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Order Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted">Order Date</span>
                <span className="font-medium text-gray-900 dark:text-white">November 15, 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Total Amount</span>
                <span className="font-medium text-gray-900 dark:text-white">$289.98</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Payment Method</span>
                <span className="font-medium text-gray-900 dark:text-white">Visa ending in 1234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Estimated Delivery</span>
                <span className="font-medium text-gray-900 dark:text-white">November 20-22, 2023</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
              <Link to="/orders">View Order Status</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </MotionWrapper>
    </div>
  );
};

export default OrderConfirmation;