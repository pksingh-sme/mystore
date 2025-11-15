import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import MotionWrapper from '../components/ui/motion-wrapper';

const OrderHistory = () => {
  // Mock order data
  const orders = [
    {
      id: 'SHOPEASE-2023-001',
      date: 'November 15, 2023',
      total: 289.98,
      status: 'Processing',
      items: 3
    },
    {
      id: 'SHOPEASE-2023-002',
      date: 'November 10, 2023',
      total: 159.99,
      status: 'Shipped',
      items: 1
    },
    {
      id: 'SHOPEASE-2023-003',
      date: 'November 5, 2023',
      total: 89.99,
      status: 'Delivered',
      items: 1
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'Delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <MotionWrapper
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Order History</h1>
        <p className="text-muted">View your past orders and their status</p>
      </MotionWrapper>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <MotionWrapper
            key={order.id}
            className="bg-white dark:bg-background-dark rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Order #{order.id}</h2>
                  <p className="text-muted">{order.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/order/${order.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center text-muted">
                  <span>{order.items} {order.items === 1 ? 'item' : 'items'}</span>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  ${order.total.toFixed(2)}
                </div>
              </div>
            </div>
          </MotionWrapper>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;