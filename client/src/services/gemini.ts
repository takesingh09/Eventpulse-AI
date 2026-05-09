import type { ChatMessage, Session } from '../types';

const API_BASE = '/api';

interface ChatRequest {
  messages: ChatMessage[];
  userSessions?: string[];
  currentTime?: string;
}

interface ChatResponse {
  reply: string;
}

export async function sendChatMessage(
  messages: ChatMessage[],
  savedSessionIds: string[] = [],
): Promise<string> {
  try {
    const payload: ChatRequest = {
      messages,
      userSessions: savedSessionIds,
      currentTime: new Date().toISOString(),
    };

    const response = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`AI request failed: ${response.statusText}`);
    }

    const data: ChatResponse = await response.json();
    return data.reply;
  } catch (error) {
    console.error('[Gemini Service]', error);
    return getFallbackResponse(messages[messages.length - 1]?.content || '');
  }
}

function getFallbackResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('schedule') || q.includes('session') || q.includes('next')) {
    return "📅 You can view the full schedule on the **Schedule** page. Use the filters to find sessions by track, speaker, or time!";
  }
  if (q.includes('map') || q.includes('hall') || q.includes('where') || q.includes('direction')) {
    return "🗺️ Head to the **Map** page to see the venue layout. Each zone has directions from the main entrance.";
  }
  if (q.includes('network') || q.includes('connect') || q.includes('meet')) {
    return "🤝 Check out the **Networking** page to find attendees with similar interests!";
  }
  if (q.includes('food') || q.includes('lunch') || q.includes('eat')) {
    return "🍽️ The Food Court is located on the ground floor near the main entrance. Lunch is served 12:30 PM – 2:00 PM.";
  }
  return "👋 I'm EventPulse AI, your event assistant! I can help with schedules, directions, networking, and more. What would you like to know?";
}

export async function moderateQuestion(text: string): Promise<{ approved: boolean; reason?: string }> {
  try {
    const response = await fetch(`${API_BASE}/ai/moderate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) return { approved: true };
    return await response.json();
  } catch {
    return { approved: true };
  }
}

export async function summarizeFeedback(
  feedbacks: { stars: number; comment: string }[],
): Promise<string> {
  try {
    const response = await fetch(`${API_BASE}/ai/summarize-feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feedbacks }),
    });
    if (!response.ok) throw new Error('Summarization failed');
    const data = await response.json();
    return data.summary;
  } catch {
    return 'Unable to generate feedback summary at this time.';
  }
}

export function buildContextString(sessions: Session[], savedIds: string[]): string {
  const saved = sessions.filter(s => savedIds.includes(s.id));
  const now = new Date();
  const upcoming = sessions
    .filter(s => new Date(s.startTime) > now)
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 5);

  let ctx = `Current time: ${now.toLocaleString()}\n\n`;
  if (saved.length > 0) {
    ctx += `User's saved sessions:\n`;
    saved.forEach(s => {
      ctx += `- ${s.title} by ${s.speaker} at ${s.room} (${s.startTime} - ${s.endTime})\n`;
    });
    ctx += '\n';
  }
  ctx += `Upcoming sessions:\n`;
  upcoming.forEach(s => {
    ctx += `- ${s.title} by ${s.speaker} in ${s.room} (${s.startTime})\n`;
  });
  return ctx;
}
