import { useState } from 'react';
import { Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface MessageFormProps {
  onSubmit: (content: string) => void;
}

export const MessageForm = ({ onSubmit }: MessageFormProps) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    setIsSubmitting(true);

    try {
      await onSubmit(content.trim());
      setContent('');
    } catch (error) {
      console.error('Failed to submit message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="gradient-card border-border p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Message Input */}
        <div className="space-y-2">
          <Textarea
            placeholder="Share your perspective on this topic..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none bg-background border-border focus:border-primary"
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">{content.length}/500 characters</span>
            <Button
              type="submit"
              disabled={!content.trim() || isSubmitting || content.length > 500}
              className="gradient-primary hover:shadow-glow transition-all duration-300"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </div>

        {/* Guidelines */}
        <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
          <p className="font-medium mb-1">💬 Join the debate</p>
          <p>
            Present clear arguments, use evidence when possible, and maintain respectful discourse.
          </p>
        </div>
      </form>
    </Card>
  );
};
