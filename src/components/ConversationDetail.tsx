import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Message, Conversation } from '@/types/debate';
import { MessageForm } from './MessageForm';

interface ConversationDetailProps {
  conversation: Conversation;
  onBack: () => void;
}


export const ConversationDetail = ({ conversation, onBack }: ConversationDetailProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`https://debate-bot-vh9a.onrender.com/conversations/${conversation.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [conversation.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNewMessage = async (content: string, side: 'pro' | 'con') => {
    const payload = {
      message: `topic: ${conversation.topic} side: ${side} content: ${content}`,
      conversation_id: conversation.id
    };

    try {
      // Replace with actual API call
      console.log('Sending payload:', payload);
      
      // Mock response - add the new message to the list
      const newMessage: Message = {
        id: messages.length + 1,
        content,
        side,
        timestamp: new Date().toISOString(),
        conversation_id: conversation.id
      };
      
      setMessages(prev => [...prev, newMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="gradient-primary w-8 h-8 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Debates
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">{conversation.topic}</h1>
            <p className="text-sm text-muted-foreground">
              {messages.length} messages • Active debate
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.side === 'pro' ? 'justify-start' : 'justify-end'} animate-fade-in`}
            >
              <Card
                className={`max-w-2xl p-4 ${
                  message.side === 'pro'
                    ? 'bg-pro-muted border-pro text-pro-foreground'
                    : 'bg-con-muted border-con text-con-foreground'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-medium uppercase tracking-wide ${
                    message.side === 'pro' ? 'text-pro' : 'text-con'
                  }`}>
                    {message.side}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{message.content}</p>
              </Card>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Form */}
      <div className="border-t border-border bg-card p-4">
        <div className="max-w-4xl mx-auto">
          <MessageForm onSubmit={handleNewMessage} />
        </div>
      </div>

      {messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Start the Debate</h3>
            <p className="text-muted-foreground">Be the first to share your perspective on this topic!</p>
          </div>
        </div>
      )}
    </div>
  );
};