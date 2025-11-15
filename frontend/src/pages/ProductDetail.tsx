import { useState } from 'react';
import { Button } from '../components/ui/button';
import MotionWrapper from '../components/ui/motion-wrapper';
import { Heart, ShoppingCart, Truck, Shield } from 'lucide-react';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  
  // Mock product data
  const product = {
    id: 1,
    name: 'Premium Headphones',
    price: 199.99,
    image: 'https://via.placeholder.com/600x600',
    description: 'Experience crystal-clear sound with our premium headphones featuring noise cancellation technology, 30-hour battery life, and ultra-comfortable ear cushions.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.0 connectivity',
      'Premium memory foam ear cushions',
      'Built-in microphone for calls',
      'Foldable design for easy storage'
    ],
    specifications: {
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz',
      'Impedance': '32 Ohms',
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      'Weight': '250g'
    }
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <MotionWrapper
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg overflow-hidden shadow-lg">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain p-8"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="aspect-square bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-primary transition-all">
                <img 
                  src={product.image} 
                  alt={`${product.name} ${item}`} 
                  className="w-full h-full object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-secondary dark:text-white">{product.name}</h1>
              <p className="text-2xl font-bold text-primary">${product.price}</p>
            </div>
            <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow hover:shadow-md transition-shadow">
              <Heart className="h-6 w-6 text-muted hover:text-danger transition-colors" />
            </button>
          </div>
          
          <div className="flex items-center mb-6">
            <div className="flex items-center mr-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-muted">(128 reviews)</span>
            </div>
          </div>
          
          <p className="text-muted mb-8">{product.description}</p>
          
          {/* Features */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-secondary dark:text-white">Key Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-success mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-muted">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quantity Selector */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-secondary dark:text-white">Quantity</h3>
            <div className="flex items-center">
              <div className="flex items-center border rounded-md">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="px-4 py-2"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="px-4 py-2">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="px-4 py-2"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button variant="default" size="lg" className="flex items-center justify-center gap-2 flex-1">
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="warning" size="lg" className="flex items-center justify-center gap-2 flex-1">
              Buy Now
            </Button>
          </div>
          
          {/* Product Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Truck className="h-6 w-6 text-primary mr-3" />
              <div>
                <p className="font-medium text-secondary dark:text-white">Free Shipping</p>
                <p className="text-sm text-muted">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-primary mr-3" />
              <div>
                <p className="font-medium text-secondary dark:text-white">2 Year Warranty</p>
                <p className="text-sm text-muted">Guaranteed quality</p>
              </div>
            </div>
          </div>
        </div>
      </MotionWrapper>
      
      {/* Product Specifications */}
      <MotionWrapper
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-secondary dark:text-white">Product Specifications</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="font-medium text-secondary dark:text-white">{key}</span>
                <span className="text-muted">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </MotionWrapper>
    </div>
  );
};

export default ProductDetail;