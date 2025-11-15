import { Button } from '../components/ui/button';
import MotionWrapper from '../components/ui/motion-wrapper';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 z-10 text-center">
          <MotionWrapper
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-secondary dark:text-white">
              Premium Shopping Experience
            </h1>
            <p className="text-xl md:text-2xl text-muted mb-8">
              Discover the finest products with our curated collection
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="default" 
                className="px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Shop Now
              </Button>
              <Button 
                variant="outline" 
                className="px-8 py-3 text-lg border-2 border-primary text-primary hover:bg-primary/10 transition-all duration-300"
              >
                Explore Collection
              </Button>
            </div>
          </MotionWrapper>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <MotionWrapper
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary dark:text-white">
              Featured Products
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Discover our carefully curated selection of premium products
            </p>
          </MotionWrapper>
          
          {/* Product Grid would go here */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <MotionWrapper
                key={item}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * item }}
              >
                <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-secondary dark:text-white">Premium Product {item}</h3>
                    <button className="text-muted hover:text-danger transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-muted text-sm mb-4">Premium product description goes here</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">${(29.99 + item * 10).toFixed(2)}</span>
                    <Button variant="default" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;