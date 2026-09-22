import React from 'react';
import { Search, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Rođendani', img: 'https://picsum.photos/400/300?random=1', count: '120+ Dekoratera' },
  { name: 'Venčanja', img: 'https://picsum.photos/400/300?random=2', count: '85+ Agencija' },
  { name: 'Korporativni događaji', img: 'https://picsum.photos/400/300?random=3', count: '50+ Profesionalaca' },
  { name: 'Baby Shower', img: 'https://picsum.photos/400/300?random=4', count: '90+ Opcija' },
];

const steps = [
  { title: 'Recite šta vam treba', desc: 'Opišite kakvu proslavu planirate i koje balone želite.' },
  { title: 'Dobijte AI plan', desc: 'Naš sistem automatski predlaže ideje i procenjuje budžet.' },
  { title: 'Izaberite majstora', desc: 'Povezujemo vas sa najboljim dekoraterima u vašoj blizini.' },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(query.trim()) {
        navigate(`/find?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20 px-4 sm:px-6 lg:px-8">
            <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Pronađite savršene</span>{' '}
                  <span className="block text-purple-600 xl:inline">balone za proslavu</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Od rođendanskih lukova do elegantnih dekoracija za venčanja. Povezujemo vas sa preko 500 proverenih dekoratera širom Srbije.
                </p>
                
                <form onSubmit={handleSearch} className="mt-8 sm:flex sm:justify-center lg:justify-start gap-3">
                  <div className="relative rounded-md shadow-sm flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-3 border"
                      placeholder="Šta vam treba? (npr. 'Baloni za 1. rođendan')"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="mt-3 w-full sm:mt-0 sm:w-auto flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 md:text-lg shadow-lg shadow-purple-200">
                    Pronađi
                  </button>
                </form>
                
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500 sm:justify-center lg:justify-start">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" /> Besplatno korišćenje
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" /> Provereni dekorateri
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-50">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-90"
            src="https://picsum.photos/1200/800?random=10"
            alt="Party Balloons"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent lg:via-white/20"></div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Kako BaloniKlik funkcioniše?</h2>
          <p className="mt-2 text-gray-500">Jednostavan put do savršene dekoracije</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xl mx-auto mb-4">
                {idx + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Popularne Kategorije</h2>
            <p className="text-gray-500 mt-1">Najtraženije usluge ovog meseca</p>
          </div>
          <Link to="/find" className="text-purple-600 font-semibold flex items-center hover:underline">
            Vidi sve <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <Link to={`/find?q=${encodeURIComponent(cat.name)}`} key={idx} className="group relative rounded-xl overflow-hidden aspect-[4/5] cursor-pointer">
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="font-bold text-lg">{cat.name}</h3>
                <p className="text-xs text-gray-300">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;