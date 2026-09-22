import { GoogleGenAI, Type } from "@google/genai";
import { AIPlanResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const planParty = async (userRequest: string): Promise<AIPlanResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Korisnik želi dekoraciju balonima ili organizaciju proslave. Zahtev: "${userRequest}".
      
      Ponašaj se kao profesionalni organizator zabava u Srbiji.
      Na osnovu zahteva, predloži temu, konkretne elemente dekoracije (npr. 'Luk od balona', 'Helijumski buketi'), paletu boja i procenjeni budžet u RSD (Srpski Dinar).
      
      Vrati odgovor isključivo u JSON formatu.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            themeTitle: { type: Type.STRING, description: "Kreativan naziv teme za proslavu" },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Lista 3-5 konkretnih predloga dekoracije"
            },
            colorPalette: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Lista 3-4 hex kodova boja koji se slažu"
            },
            estimatedPriceMin: { type: Type.NUMBER, description: "Minimalna procenjena cena u RSD" },
            estimatedPriceMax: { type: Type.NUMBER, description: "Maksimalna procenjena cena u RSD" },
            reasoning: { type: Type.STRING, description: "Kratko objašnjenje zašto je ovo dobar izbor (jedna rečenica)" }
          },
          required: ["themeTitle", "suggestions", "colorPalette", "estimatedPriceMin", "estimatedPriceMax", "reasoning"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AIPlanResult;
    }
    throw new Error("Prazan odgovor od AI modela");
  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback data in case of error
    return {
      themeTitle: "Standardna Proslava",
      suggestions: ["Luk od balona", "Buketi za stolove", "Brojevi od balona"],
      colorPalette: ["#FF69B4", "#87CEEB", "#FFFFFF"],
      estimatedPriceMin: 5000,
      estimatedPriceMax: 15000,
      reasoning: "Nismo uspeli da generišemo specifičan plan, ali ovo su standardne opcije."
    };
  }
};