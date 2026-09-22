import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, ArrowRight, Loader2, MapPin, Tag } from 'lucide-react';
import { planParty } from '../services/geminiService';
import { AIPlanResult, Step, Provider } from '../types';
import ProviderCard from '../components/ProviderCard';

// Mock Providers Data
const MOCK_PROVIDERS: Provider[] = [
  {
    id: '1',
    name: "Baloni Beograd Magic",
    location: "Vračar, Beograd",
    rating: 4.9,
    reviewCount: 124,
    specialties: ["Rođendani", "Organski Lukovi", "Helijum"],
    imageUrl: "https://picsum.photos/400/400?random=50",
    priceLevel: "€€"
  },
  {
    id: '2',
    name: "DecoParty Novi Sad",
    location: "Centar, Novi Sad",
    rating: 4.7,
    reviewCount: 89,
    specialties: ["Venčanja", "Velike Instalacije"],
    imageUrl: "https://picsum.photos/400/400?random=51",
    priceLevel: "€€€"
  },
  {
    id: '3',
    name: "Happy Balloon Niš",
    location: "Medijana, Niš",
    rating: 4.8,
    reviewCount: 45,
    specialties: ["Dečiji rođendani", "Figure od balona"],
    imageUrl: "https://picsum.photos/400/400?random=52",
    priceLevel: "€"
  }
];

const FindService: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<Step>(Step.INPUT);
  const [request, setRequest] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiPlan, setAiPlan] = useState<AIPlanResult | null>(null);

  useEffect(() => {
    if (searchParams.get('q')) {
      setRequest(searchParams.get('q')!);
    }
  }, [searchParams]);

  const handleAnalyze = async () => {
    if (!request.trim()) return;
    setIsAnalyzing(true);
    setStep(Step.PLANNING);
    
    // Simulate slight delay for UX + Actual API call
    try {
      const plan = await planParty(request);
      setAiPlan(plan);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleShowProviders = () => {
    setStep(Step.RESULTS);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Progress Bar */}
        <div className="mb-8 flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -z-10 rounded"></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= Step.INPUT ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-400 border-gray-300'}`}>1</div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= Step.PLANNING ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-400 border-gray-300'}`}>2</div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= Step.RESULTS ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-400 border-gray-300'}`}>3</div>
        </div>

        {/* STEP 1: Input */}
        {step === Step.INPUT && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Kakvu proslavu planirate?</h1>
            <p className="text-gray-500 mb-6">Opišite detaljno šta želite (npr. "Spajdermen rođendan za dečaka 5 godina, plavi i crveni baloni").</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Opis proslave</label>
                <textarea 
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Unesite detalje..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lokacija (Grad/Opština)</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="npr. Beograd, Novi Sad"
                  />
                </div>
              </div>

              <button 
                onClick={handleAnalyze}
                disabled={!request.trim()}
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-5 h-5" />
                Analiziraj i Predloži
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: AI Analysis */}
        {step === Step.PLANNING && (
          <div className="space-y-6">
            {isAnalyzing ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
                <h3 className="text-xl font-bold text-gray-900">AI Konsultant razmišlja...</h3>
                <p className="text-gray-500 mt-2">Generišemo kreativne ideje i kalkulaciju budžeta za vašu proslavu.</p>
              </div>
            ) : aiPlan ? (
              <>
                <div className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2 opacity-90">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Vaš Plan Proslave</span>
                    </div>
                    <h2 className="text-2xl font-bold">{aiPlan.themeTitle}</h2>
                  </div>
                  
                  <div className="p-6 md:p-8">
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Preporučena Dekoracija</h3>
                      <ul className="space-y-2">
                        {aiPlan.suggestions.map((item, i) => (
                          <li key={i} className="flex items-start text-gray-700">
                            <span className="w-2 h-2 mt-2 bg-purple-500 rounded-full mr-3 shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Paleta Boja</h3>
                        <div className="flex gap-2">
                          {aiPlan.colorPalette.map((color, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                              <div 
                                className="w-12 h-12 rounded-full shadow-inner border border-gray-200"
                                style={{ backgroundColor: color }}
                              ></div>
                              <span className="text-xs text-gray-500 font-mono">{color}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-1">Procenjeni Budžet</h3>
                        <p className="text-xs text-gray-500 mb-2">Za navedenu dekoraciju i materijal</p>
                        <div className="text-2xl font-bold text-gray-900">
                          {aiPlan.estimatedPriceMin.toLocaleString()} - {aiPlan.estimatedPriceMax.toLocaleString()} <span className="text-base font-normal text-gray-500">RSD</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm mb-6">
                      <strong>Savet:</strong> {aiPlan.reasoning}
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => setStep(Step.INPUT)}
                        className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Izmeni zahtev
                      </button>
                      <button 
                        onClick={handleShowProviders}
                        className="flex-1 py-3 px-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                      >
                        Pronađi majstore
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        )}

        {/* STEP 3: Results */}
        {step === Step.RESULTS && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Pronađeni dekorateri</h2>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                3 Dostupna
              </span>
            </div>
            
            <div className="space-y-4">
              {MOCK_PROVIDERS.map(provider => (
                <ProviderCard 
                  key={provider.id} 
                  provider={provider} 
                  onContact={() => alert(`Upit poslat korisniku ${provider.name}!`)} 
                />
              ))}
            </div>

            <div className="mt-8 text-center p-6 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">Niste našli odgovarajućeg majstora?</p>
              <button className="text-purple-600 font-semibold mt-2 hover:underline">
                Objavi javni tender
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default FindService;