import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart } from 'lucide-react';
import MotionWrapper from '../ui/motion-wrapper';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <MotionWrapper 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-md dark:bg-gray-900/90' : 'bg-white/80 dark:bg-gray-900/80'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold text-primary"
        >
          ShopEase
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-secondary hover:text-primary transition-colors duration-300">
            Home
          </Link>
          <Link to="/shop" className="text-secondary hover:text-primary transition-colors duration-300">
            Shop
          </Link>
          <Link to="/about" className="text-secondary hover:text-primary transition-colors duration-300">
            About
          </Link>
          <Link to="/contact" className="text-secondary hover:text-primary transition-colors duration-300">
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-secondary hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-secondary hover:text-primary transition-colors">
            <Heart className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-secondary hover:text-primary transition-colors">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-secondary hover:text-primary transition-colors">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </MotionWrapper>
  );
};

export default Header;