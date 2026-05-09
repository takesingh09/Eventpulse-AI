import { Router, Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { text, targetLang } = req.body;

    if (!text || !targetLang) {
      res.status(400).json({ error: 'text and targetLang are required' });
      return;
    }

    // Use Gemini for translation if no dedicated Translate API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.json({ translated: text }); // Fallback: return original
      return;
    }

    const LANG_MAP: Record<string, string> = {
      hi: 'Hindi', es: 'Spanish', fr: 'French', ar: 'Arabic',
    };

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(
      `Translate the following text to ${LANG_MAP[targetLang] || 'English'}. Return only the translated text, nothing else:\n\n${text}`
    );
    const translated = result.response.text().trim();
    res.json({ translated });
  } catch (error) {
    console.error('[Translate Route] Error:', error);
    res.json({ translated: req.body.text }); // Fallback
  }
});

export default router;
