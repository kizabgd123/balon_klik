import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FindService from './pages/FindService';

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-2">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-4">BaloniKlik</h3>
        <p className="text-gray-400 max-w-sm">
          Povezujemo vas sa najboljim dekoraterima u Srbiji. Vaša proslava zaslužuje da izgleda magično.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-4">Linkovi</h4>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li><a href="#" className="hover:text-white">O nama</a></li>
          <li><a href="#" className="hover:text-white">Za profesionalce</a></li>
          <li><a href="#" className="hover:text-white">Blog</a></li>
          <li><a href="#" className="hover:text-white">Kontakt</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-4">Popularno</h4>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li><a href="#" className="hover:text-white">Rođendani</a></li>
          <li><a href="#" className="hover:text-white">Venčanja</a></li>
          <li><a href="#" className="hover:text-white">Helijum baloni</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} BaloniKlik. Sva prava zadržana.
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find" element={<FindService />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;