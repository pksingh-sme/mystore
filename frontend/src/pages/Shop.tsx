import { Button } from '../components/ui/button';
import MotionWrapper from '../components/ui/motion-wrapper';
import { Heart, ShoppingCart } from 'lucide-react';

const Shop = () => {
  // Mock product data
  const products = [
    {
      id: 1,
      name: 'Premium Headphones',
      price: 199.99,
      image: 'https://via.placeholder.com/300x300',
      description: 'High-quality sound with noise cancellation'
    },
    {
      id: 2,
      name: 'Wireless Earbuds',
      price: 89.99,
      image: 'https://via.placeholder.com/300x300',
      description: 'True wireless earbuds with charging case'
    },
    {
      id: 3,
      name: 'Smart Watch',
      price: 249.99,
      image: 'https://via.placeholder.com/300x300',
      description: 'Track your fitness and stay connected'
    },
    {
      id: 4,
      name: 'Bluetooth Speaker',
      price: 129.99,
      image: 'https://via.placeholder.com/300x300',
      description: 'Portable speaker with 360° sound'
    },
    {
      id: 5,
      name: 'Gaming Keyboard',
      price: 79.99,
      image: 'https://via.placeholder.com/300x300',
      description: 'Mechanical keyboard with RGB lighting'
    },
    {
      id: 6,
      name: 'External SSD',
      price: 149.99,
      image: 'https://via.placeholder.com/300x300',
      description: '1TB portable SSD with USB-C'
    },
    {
      id: 7,
      name: 'Wireless Mouse',
      price: 49.99,
      image: 'https://via.placeholder.com/300x300',
      description: 'Ergonomic wireless mouse with precision tracking'
    },
    {
      id: 8,
      name: 'Monitor Stand',
      price: 59.99,
      image: 'https://via.placeholder.com/300x300',
      description: 'Adjustable monitor stand with storage'
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
        <h1 className="text-3xl font-bold mb-2 text-secondary dark:text-white">Our Products</h1>
        <p className="text-muted">Discover our carefully curated selection of premium products</p>
      </MotionWrapper>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <MotionWrapper
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                <Heart className="h-5 w-5 text-muted hover:text-danger transition-colors" />
              </button>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2 text-secondary dark:text-white">{product.name}</h3>
              <p className="text-muted text-sm mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-primary">${product.price}</span>
                <Button variant="default" size="sm" className="flex items-center gap-1">
                  <ShoppingCart className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>
          </MotionWrapper>
        ))}
      </div>
    </div>
  );
};

export default Shop;