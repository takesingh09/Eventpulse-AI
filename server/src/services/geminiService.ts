import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are EventPulse AI, a smart assistant for a tech conference called TechVerse 2026.
You have access to the event schedule, venue map, and user's personal agenda.
Be concise, helpful, and friendly. Always provide actionable information.

Venue Zones:
- Hall A (Main Stage): Keynotes and main track sessions, 500 seats
- Hall B: Parallel track sessions, 300 seats
- Workshop Zone: Floor 2, hands-on workshops, 80 seats
- Networking Lounge: Ground floor, left of entrance, 150 seats
- Food Court: Basement level, via escalator near entrance
- Registration Desk: Inside main entrance
- Restrooms: Every floor near elevators

Event: TechVerse 2026, June 15-17, Pragati Maidan, New Delhi
Tracks: AI/ML, Web Dev, Cloud, Mobile, Startup
Meals: Breakfast 8-9 AM, Lunch 12:30-2 PM, Evening snacks 4:30-5 PM

If asked about directions, reference the venue zones above.
If asked about sessions, reference the schedule data provided in context.
If uncertain, suggest the user check the Schedule or Map pages.`;

let genAI: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI | null {
  if (genAI) return genAI;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  genAI = new GoogleGenerativeAI(apiKey);
  return genAI;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function generateChatResponse(
  messages: ChatMessage[],
  userSessions?: string[],
  currentTime?: string,
): Promise<string> {
  const ai = getGenAI();

  if (!ai) {
    return getFallbackResponse(messages[messages.length - 1]?.content || '');
  }

  try {
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });

    let contextStr = SYSTEM_PROMPT;
    if (currentTime) contextStr += `\n\nCurrent time: ${currentTime}`;
    if (userSessions?.length) contextStr += `\nUser's saved session IDs: ${userSessions.join(', ')}`;

    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'assistant' ? 'model' as const : 'user' as const,
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({
      history,
      systemInstruction: contextStr,
    });

    const lastMessage = messages[messages.length - 1]?.content || '';
    const result = await chat.sendMessage(lastMessage);
    return result.response.text();
  } catch (error) {
    console.error('[Gemini Service] Error:', error);
    return getFallbackResponse(messages[messages.length - 1]?.content || '');
  }
}

export async function moderateQuestion(text: string): Promise<{ approved: boolean; reason?: string }> {
  const ai = getGenAI();
  if (!ai) return { approved: true };

  try {
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(
      `You are a content moderator for a tech conference Q&A. Evaluate if this question is appropriate and relevant to a tech event. Reply with JSON: {"approved": true/false, "reason": "..."}\n\nQuestion: "${text}"`
    );
    const response = result.response.text();
    return JSON.parse(response.replace(/```json?\n?|```/g, '').trim());
  } catch {
    return { approved: true };
  }
}

export async function summarizeFeedback(feedbacks: { stars: number; comment: string }[]): Promise<string> {
  const ai = getGenAI();
  if (!ai) return 'Feedback summary is not available without API key.';

  try {
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const feedbackText = feedbacks.map((f, i) => `${i + 1}. [${f.stars}★] ${f.comment}`).join('\n');
    const result = await model.generateContent(
      `Summarize the following session feedback in 2-3 sentences. Highlight key themes, common praise, and areas for improvement:\n\n${feedbackText}`
    );
    return result.response.text();
  } catch {
    return 'Unable to generate summary.';
  }
}

function getFallbackResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('schedule') || q.includes('session')) return "📅 Check the Schedule page for the full agenda. You can filter by track, day, and speaker!";
  if (q.includes('map') || q.includes('hall') || q.includes('where')) return "🗺️ Visit the Map page for an interactive venue layout with directions to every zone.";
  if (q.includes('food') || q.includes('lunch')) return "🍽️ Food Court is in the basement. Lunch: 12:30-2 PM, Snacks: 4:30-5 PM.";
  if (q.includes('wifi') || q.includes('internet')) return "📶 WiFi: Network 'TechVerse2026', Password: TV2026Guest";
  return "👋 I'm EventPulse AI! I can help with schedules, venue navigation, networking, and more. What would you like to know?";
}
