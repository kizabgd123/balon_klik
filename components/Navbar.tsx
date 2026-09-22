import React from 'react';
import { PartyPopper, Menu, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
              <PartyPopper className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              BaloniKlik
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-purple-600 transition-colors">Početna</Link>
            <Link to="/find" className="hover:text-purple-600 transition-colors">Pronađi dekoraciju</Link>
            <a href="#" className="hover:text-purple-600 transition-colors">Kako funkcioniše</a>
            <a href="#" className="hover:text-purple-600 transition-colors">Za profesionalce</a>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
              <User className="w-4 h-4" />
              Prijava
            </button>
            <Link to="/find" className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors shadow-sm shadow-purple-200">
              Novi zahtev
            </Link>
            <button className="md:hidden p-2 text-gray-500">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;