import type { SupportedLanguage } from '../types';

const API_BASE = '/api';

const translationCache = new Map<string, string>();

export async function translateText(
  text: string,
  targetLang: SupportedLanguage,
): Promise<string> {
  if (targetLang === 'en') return text;

  const cacheKey = `${text}::${targetLang}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  try {
    const response = await fetch(`${API_BASE}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLang }),
    });

    if (!response.ok) {
      throw new Error('Translation failed');
    }

    const data = await response.json();
    translationCache.set(cacheKey, data.translated);
    return data.translated;
  } catch {
    return text; // Fallback to original
  }
}

export function getStoredLanguage(): SupportedLanguage {
  const stored = localStorage.getItem('eventpulse-language');
  if (stored && ['en', 'hi', 'es', 'fr', 'ar'].includes(stored)) {
    return stored as SupportedLanguage;
  }
  return 'en';
}

export function setStoredLanguage(lang: SupportedLanguage): void {
  localStorage.setItem('eventpulse-language', lang);
}
