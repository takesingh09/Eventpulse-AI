import { useState, useCallback, useRef, useEffect } from 'react';
import type { ChatMessage } from '../../types';
import { sendChatMessage } from '../../services/gemini';
import { useAuth } from '../../hooks/useAuth';

export function useChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "👋 Hi! I'm **EventPulse AI**, your smart event assistant. Ask me about sessions, directions, speakers, or anything about TechVerse 2026!",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const allMessages = [...messages, userMsg];
      const reply = await sendChatMessage(allMessages, user?.savedSessions || []);
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`, role: 'assistant',
        content: "Sorry, I couldn't process that. Please try again!",
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, user]);

  const clearChat = useCallback(() => {
    setMessages([{
      id: 'welcome', role: 'assistant',
      content: "👋 Chat cleared! How can I help you?",
      timestamp: new Date().toISOString(),
    }]);
  }, []);

  return { messages, isLoading, sendMessage, clearChat, messagesEndRef };
}
