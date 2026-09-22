import React from 'react';
import { Star, MapPin, BadgeCheck } from 'lucide-react';
import { Provider } from '../types';

interface Props {
  provider: Provider;
  onContact: () => void;
}

const ProviderCard: React.FC<Props> = ({ provider, onContact }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row">
      <div className="sm:w-48 h-48 sm:h-auto relative bg-gray-200 shrink-0">
        <img 
          src={provider.imageUrl} 
          alt={provider.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-md text-xs font-bold shadow-sm">
          {provider.priceLevel}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                {provider.name}
                <BadgeCheck className="w-4 h-4 text-blue-500" />
              </h3>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <MapPin className="w-3.5 h-3.5 mr-1" />
                {provider.location}
              </div>
            </div>
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded text-yellow-700 font-medium text-sm">
              <Star className="w-3.5 h-3.5 mr-1 fill-yellow-500 text-yellow-500" />
              {provider.rating} <span className="text-gray-400 ml-1 font-normal">({provider.reviewCount})</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {provider.specialties.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full border border-purple-100">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button 
            onClick={onContact}
            className="w-full sm:w-auto px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Pošalji upit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;