import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Clock } from 'lucide-react';
import { Conversation } from '@/types/debate';

interface ConversationsListProps {
  onSelectConversation: (conversation: Conversation) => void;
}

// Mock data - replace with actual API call
const mockConversations: Conversation[] = [
  {
    id: 1,
    topic: "Dogs are human's best friends",
    created_at: "2024-01-15T10:30:00Z",
    message_count: 12,
    last_activity: "2024-01-15T14:45:00Z"
  },
  {
    id: 2,
    topic: "Remote work is more productive than office work",
    created_at: "2024-01-14T09:15:00Z",
    message_count: 8,
    last_activity: "2024-01-14T16:20:00Z"
  },
  {
    id: 3,
    topic: "Social media has improved human connection",
    created_at: "2024-01-13T11:00:00Z",
    message_count: 15,
    last_activity: "2024-01-13T18:30:00Z"
  }
];

export const ConversationsList = ({ onSelectConversation }: ConversationsListProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with actual API call
    const fetchConversations = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setConversations(mockConversations);
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
              className="gradient-card border-border hover:shadow-debate transition-all duration-300 cursor-pointer animate-slide-up"
              onClick={() => onSelectConversation(conversation)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground line-clamp-2">
                    {conversation.topic}
                  </h3>
                  <MessageCircle className="text-primary w-6 h-6 flex-shrink-0 ml-4" />
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
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