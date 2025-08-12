import React from 'react';
import { Link } from 'react-router-dom';
import { shopInfo } from '../data/mock';
import { 
  IceCream, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-br from-orange-400 to-pink-400 p-2 rounded-xl group-hover:scale-105 transition-transform duration-200">
                <IceCream className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold group-hover:text-orange-400 transition-colors">
                  {shopInfo.name}
                </h3>
                <p className="text-sm text-gray-400">{shopInfo.tagline}</p>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              {shopInfo.description}
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href={`https://instagram.com/${shopInfo.social.instagram.replace('@', '')}`}
                className="text-gray-400 hover:text-pink-400 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href={`https://facebook.com/${shopInfo.social.facebook.replace(' ', '')}`}
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href={`https://twitter.com/${shopInfo.social.twitter.replace('@', '')}`}
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/menu" 
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link 
                  to="/cart" 
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-orange-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{shopInfo.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{shopInfo.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-orange-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{shopInfo.email}</span>
              </li>
            </ul>
          </div>

          {/* Store Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-400" />
              <span>Store Hours</span>
            </h4>
            <ul className="space-y-2">
              <li className="text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Mon - Fri</span>
                  <span className="text-white font-medium">{shopInfo.hours.weekdays}</span>
                </div>
              </li>
              <li className="text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Sat - Sun</span>
                  <span className="text-white font-medium">{shopInfo.hours.weekends}</span>
                </div>
              </li>
            </ul>
            
            <div className="mt-4 p-3 bg-green-900/30 rounded-lg border border-green-700/30">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Open Now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} {shopInfo.name}. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 fill-red-400" />
              <span>for ice cream lovers</span>
            </div>

            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;