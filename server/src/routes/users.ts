import { Router, Request, Response } from 'express';

const router = Router();

router.get('/:uid', async (req: Request, res: Response) => {
  const { uid } = req.params;
  res.json({ uid, message: 'User endpoint. Connect Firestore for real data.' });
});

router.put('/:uid', async (req: Request, res: Response) => {
  const { uid } = req.params;
  res.json({ uid, ...req.body, updated: true });
});

router.get('/:uid/matches', async (req: Request, res: Response) => {
  const { uid } = req.params;
  res.json({ uid, matches: [], message: 'Connect Firestore for real matchmaking.' });
});

export default router;
