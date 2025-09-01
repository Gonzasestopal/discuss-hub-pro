import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Plus, ThumbsUp, ThumbsDown } from 'lucide-react';

interface NewDebateFormProps {
  onSubmit: (topic: string, side: 'pro' | 'con') => void;
}

export const NewDebateForm = ({ onSubmit }: NewDebateFormProps) => {
  const [topic, setTopic] = useState('');
  const [selectedSide, setSelectedSide] = useState<'pro' | 'con' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim() || !selectedSide) return;

    setIsSubmitting(true);
    
    try {
      await onSubmit(topic.trim(), selectedSide);
      setTopic('');
      setSelectedSide(null);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create debate:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showForm) {
    return (
      <Card className="gradient-card border-border hover:shadow-debate transition-all duration-300 cursor-pointer animate-fade-in" 
            onClick={() => setShowForm(true)}>
        <div className="p-6 text-center">
          <Plus className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Start New Debate</h3>
          <p className="text-muted-foreground">Choose your side and present your argument</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="gradient-card border-border p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-foreground">Start New Debate</h3>
        <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Side Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Choose your side:</label>
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
        </div>

        {/* Topic Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Debate topic:</label>
          <Textarea
            placeholder={
              selectedSide
                ? `Enter the topic you want to ${selectedSide === 'pro' ? 'support' : 'oppose'}...`
                : "Select your side first, then enter the debate topic..."
            }
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="min-h-[100px] resize-none bg-background border-border focus:border-primary"
            disabled={!selectedSide}
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              {topic.length}/200 characters
            </span>
            <Button
              type="submit"
              disabled={!topic.trim() || !selectedSide || isSubmitting || topic.length > 200}
              className="gradient-primary hover:shadow-glow transition-all duration-300"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? 'Creating...' : 'Start Debate'}
            </Button>
          </div>
        </div>

        {/* Guidelines */}
        {selectedSide && (
          <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3 animate-fade-in">
            <p className="font-medium mb-1">
              {selectedSide === 'pro' ? '✅ Supporting' : '❌ Opposing'} this topic
            </p>
            <p>Present a clear, debatable statement. Others will take the opposing view.</p>
          </div>
        )}
      </form>
    </Card>
  );
};