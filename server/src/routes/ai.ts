import { Router, Request, Response } from 'express';
import { generateChatResponse, moderateQuestion, summarizeFeedback } from '../services/geminiService';

const router = Router();

router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { messages, userSessions, currentTime } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'Messages array is required' });
      return;
    }
    const reply = await generateChatResponse(messages, userSessions, currentTime);
    res.json({ reply });
  } catch (error) {
    console.error('[AI Route] Chat error:', error);
    res.status(500).json({ error: 'Failed to generate AI response' });
  }
});

router.post('/moderate', async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: 'Text is required' });
      return;
    }
    const result = await moderateQuestion(text);
    res.json(result);
  } catch (error) {
    console.error('[AI Route] Moderation error:', error);
    res.json({ approved: true });
  }
});

router.post('/summarize-feedback', async (req: Request, res: Response) => {
  try {
    const { feedbacks } = req.body;
    if (!feedbacks || !Array.isArray(feedbacks)) {
      res.status(400).json({ error: 'Feedbacks array is required' });
      return;
    }
    const summary = await summarizeFeedback(feedbacks);
    res.json({ summary });
  } catch (error) {
    console.error('[AI Route] Summarize error:', error);
    res.status(500).json({ error: 'Failed to summarize feedback' });
  }
});

export default router;
