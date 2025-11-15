import MotionWrapper from '../components/ui/motion-wrapper';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <MotionWrapper
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">About Us</h1>
        <p className="text-muted mb-6">
          Welcome to ShopEase, your premier destination for quality products and exceptional service.
        </p>
      </MotionWrapper>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MotionWrapper
          className="bg-white dark:bg-background-dark rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Story</h2>
          <p className="text-muted mb-4">
            Founded in 2020, ShopEase began with a simple mission: to make online shopping effortless 
            and enjoyable for everyone. We believe that shopping should be more than just a transaction—
            it should be an experience.
          </p>
          <p className="text-muted">
            Today, we're proud to serve thousands of customers with a carefully curated selection of 
            products, fast shipping, and dedicated customer support.
          </p>
        </MotionWrapper>
        
        <MotionWrapper
          className="bg-white dark:bg-background-dark rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Values</h2>
          <ul className="space-y-3 text-muted">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Quality: We only offer products we believe in</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Customer Focus: Your satisfaction is our priority</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Integrity: Honest and transparent in all we do</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Innovation: Continuously improving your shopping experience</span>
            </li>
          </ul>
        </MotionWrapper>
      </div>
    </div>
  );
};

export default About;