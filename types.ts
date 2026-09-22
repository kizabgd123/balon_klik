export interface Provider {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  imageUrl: string;
  priceLevel: '€' | '€€' | '€€€';
}

export interface AIPlanResult {
  themeTitle: string;
  suggestions: string[];
  colorPalette: string[];
  estimatedPriceMin: number;
  estimatedPriceMax: number;
  reasoning: string;
}

export enum Step {
  INPUT = 0,
  PLANNING = 1,
  RESULTS = 2
}