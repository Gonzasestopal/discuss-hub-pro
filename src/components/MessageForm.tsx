import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Send, ThumbsUp, ThumbsDown } from 'lucide-react';

interface MessageFormProps {
  onSubmit: (content: string, side: 'pro' | 'con') => void;
}

export const MessageForm = ({ onSubmit }: MessageFormProps) => {
  const [content, setContent] = useState('');
  const [selectedSide, setSelectedSide] = useState<'pro' | 'con' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || !selectedSide) return;

    setIsSubmitting(true);
    
    try {
      await onSubmit(content.trim(), selectedSide);
      setContent('');
      setSelectedSide(null);
    } catch (error) {
      console.error('Failed to submit message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="gradient-card border-border p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Side Selection */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant={selectedSide === 'pro' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedSide('pro')}
            className={selectedSide === 'pro' ? 'bg-pro hover:bg-pro/90 text-pro-foreground' : 'border-pro text-pro hover:bg-pro/10'}
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            Pro
          </Button>
          <Button
            type="button"
            variant={selectedSide === 'con' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedSide('con')}
            className={selectedSide === 'con' ? 'bg-con hover:bg-con/90 text-con-foreground' : 'border-con text-con hover:bg-con/10'}
          >
            <ThumbsDown className="w-4 h-4 mr-2" />
            Con
          </Button>
        </div>

        {/* Message Input */}
        <div className="space-y-2">
          <Textarea
            placeholder={
              selectedSide
                ? `Share your ${selectedSide} perspective on this topic...`
                : "Select a side and share your perspective..."
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none bg-background border-border focus:border-primary"
            disabled={!selectedSide}
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              {content.length}/500 characters
            </span>
            <Button
              type="submit"
              disabled={!content.trim() || !selectedSide || isSubmitting || content.length > 500}
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
        {selectedSide && (
          <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3 animate-fade-in">
            <p className="font-medium mb-1">
              {selectedSide === 'pro' ? '✅ Supporting' : '❌ Opposing'} this topic
            </p>
            <p>Present clear arguments, use evidence when possible, and maintain respectful discourse.</p>
          </div>
        )}
      </form>
    </Card>
  );
};