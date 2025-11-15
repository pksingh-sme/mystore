import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">
              ShopEase
            </h3>
            <p className="text-muted mb-6 max-w-md">
              Your premium destination for all your shopping needs. Quality products, exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-secondary dark:text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-muted hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/shop" className="text-muted hover:text-primary transition-colors">Shop</Link></li>
              <li><Link to="/about" className="text-muted hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-muted hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-secondary dark:text-white">Policies</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy-policy" className="text-muted hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/refund-policy" className="text-muted hover:text-primary transition-colors">Refund Policy</Link></li>
              <li><Link to="/shipping-policy" className="text-muted hover:text-primary transition-colors">Shipping Policy</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-secondary dark:text-white">Contact Us</h3>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <span>123 Commerce Street, Business City, BC 12345</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 flex-shrink-0" />
                <span>info@shopease.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0" />
                <span>(123) 456-7890</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-muted">
          <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;