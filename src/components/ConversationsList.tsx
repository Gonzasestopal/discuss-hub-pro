import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Clock } from 'lucide-react';
import { Conversation } from '@/types/debate';

interface ConversationsListProps {
  onSelectConversation: (conversation: Conversation) => void;
}

export const ConversationsList = ({ onSelectConversation }: ConversationsListProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch('https://debate-bot-vh9a.onrender.com/conversations');
        if (!response.ok) {
          throw new Error('Failed to fetch conversations');
        }
        const data = await response.json();
        
        // Transform API response to match Conversation interface
        const transformedConversations = data.map((conv: any) => ({
          id: conv.conversation_id,
          topic: conv.topic,
          created_at: conv.created_at,
          message_count: conv.message_count || 0,
          last_activity: conv.last_activity || conv.created_at,
          side: conv.side
        }));
        
        setConversations(transformedConversations);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 gradient-debate bg-clip-text text-transparent">
            Debate Hub Pro
          </h1>
          <p className="text-muted-foreground text-lg">
            Engage in structured debates and expand your perspective
          </p>
        </div>

        <div className="grid gap-4">
          {conversations.map((conversation) => (
            <Card
              key={conversation.id}
              className={`border-border hover:shadow-debate transition-all duration-300 cursor-pointer animate-slide-up ${
                conversation.side === 'pro' 
                  ? 'bg-pro-muted border-pro hover:bg-pro-muted/80' 
                  : conversation.side === 'con'
                  ? 'bg-con-muted border-con hover:bg-con-muted/80'
                  : 'gradient-card'
              }`}
              onClick={() => onSelectConversation(conversation)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className={`text-xl font-semibold line-clamp-2 ${
                    conversation.side === 'pro' 
                      ? 'text-pro-foreground' 
                      : conversation.side === 'con'
                      ? 'text-con-foreground'
                      : 'text-foreground'
                  }`}>
                    {conversation.topic}
                  </h3>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    {conversation.side && (
                      <span className={`text-xs font-medium uppercase tracking-wide px-2 py-1 rounded-full ${
                        conversation.side === 'pro' 
                          ? 'bg-pro text-pro-foreground' 
                          : 'bg-con text-con-foreground'
                      }`}>
                        {conversation.side}
                      </span>
                    )}
                    <MessageCircle className="text-primary w-6 h-6" />
                  </div>
                </div>
                
                <div className={`flex items-center justify-between text-sm ${
                  conversation.side === 'pro' 
                    ? 'text-pro-foreground/70' 
                    : conversation.side === 'con'
                    ? 'text-con-foreground/70'
                    : 'text-muted-foreground'
                }`}>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {conversation.message_count} messages
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDate(conversation.last_activity)}
                    </span>
                  </div>
                  
                  <Button variant="secondary" size="sm">
                    Continue Debate
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {conversations.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No conversations yet</h3>
            <p className="text-muted-foreground">Start your first debate to get the discussion going!</p>
          </div>
        )}
      </div>
    </div>
  );
};