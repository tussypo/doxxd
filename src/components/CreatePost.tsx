
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface CreatePostProps {
  onClose?: () => void;
  onSubmit?: (content: string) => void;
  className?: string;
}

const CreatePost: React.FC<CreatePostProps> = ({ 
  onClose, 
  onSubmit,
  className 
}) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      if (onSubmit) onSubmit(content);
      setContent('');
      setIsSubmitting(false);
      if (onClose) onClose();
    }, 600);
  };

  return (
    <div className={cn(
      "bg-white rounded-2xl shadow-md border border-border p-6 animate-fade-in",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Create Post</h2>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground rounded-full p-1"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind? Your identity will remain anonymous until you earn enough votes..."
            className="w-full min-h-[120px] p-4 rounded-xl border border-input bg-background focus:ring-1 focus:ring-ring focus:outline-none resize-none text-foreground"
            maxLength={500}
          />
          <div className="flex justify-end mt-1 text-xs text-muted-foreground">
            {content.length}/500
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!content.trim() || isSubmitting}
            className={cn(
              "px-5 py-2 rounded-full font-medium transition-all btn-hover",
              content.trim() && !isSubmitting
                ? "bg-black text-white hover:bg-black/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            {isSubmitting ? "Posting..." : "Post Anonymously"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
