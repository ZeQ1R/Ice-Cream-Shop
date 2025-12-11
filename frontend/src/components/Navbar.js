import React, { useState } from 'react';
import logo from '../images/PB-removebg-preview.png';
import { Link, useLocation } from 'react-router-dom';
import { shopInfo } from '../data/mock';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  IceCream, 
  ShoppingCart, 
  Menu as MenuIcon, 
  X,
  Phone,
  MapPin
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-orange-400 to-pink-400 p-2 rounded-xl group-hover:scale-105 transition-transform duration-200">
              {/* <IceCream className="h-6 w-6 text-white" /> */}
              <img src={logo} alt="Ice Cream Shop" className='h-16 w-16 text-white' />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
                {shopInfo.name}
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">{shopInfo.tagline}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-orange-500 ${
                  isActive(item.path) 
                    ? 'text-orange-500 border-b-2 border-orange-500 pb-1' 
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Contact Info & Cart */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>{shopInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span className="truncate max-w-32">123 Sunshine Blvd</span>
              </div>
            </div>
            
            <Link to="/cart">
              <Button variant="outline" size="sm" className="relative group">
                <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                Cart
                {cartItemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-500 hover:bg-orange-600"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart">
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs bg-orange-500"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-orange-100 py-4 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-orange-500 py-2 ${
                    isActive(item.path) ? 'text-orange-500' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-orange-100">
                <div className="flex flex-col space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>{shopInfo.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{shopInfo.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;