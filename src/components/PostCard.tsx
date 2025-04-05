import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MessageCircle, Share, User, Lock, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

export interface Post {
  id: string;
  content: string;
  votes: number;
  commentCount: number;
  createdAt: string;
  author: {
    id: string;
    isRevealed: boolean;
    name: string | null;
    avatarUrl: string | null;
    voteThreshold: number;
    currentVotes: number;
  };
}

interface PostCardProps {
  post: Post;
  compact?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, compact = false }) => {
  const [voteCount, setVoteCount] = useState(post.votes);
  const [userBoosted, setUserBoosted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { toast } = useToast();
  
  const cardRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [swiping, setSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  
  const minSwipeDistance = 75;
  
  const resetSwipe = () => {
    setSwipeOffset(0);
    setSwiping(false);
    setSwipeDirection(null);
  };

  const handleBoost = () => {
    if (userBoosted) {
      setVoteCount(voteCount - 1);
      setUserBoosted(false);
      toast({
        title: "Boost removed",
        description: "You've removed your boost",
      });
    } else {
      setVoteCount(voteCount + 1);
      setUserBoosted(true);
      toast({
        title: "Post boosted",
        description: "You've boosted this post",
      });
    }
  };

  const handleDeboost = () => {
    setVoteCount(voteCount - 1);
    setUserBoosted(false);
    toast({
      title: "Post deboosted",
      description: "You've removed points from this post",
      variant: "destructive"
    });
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
    setSwiping(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!swiping) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    
    const offset = touchStart ? currentTouch - touchStart : 0;
    const cappedOffset = Math.max(Math.min(offset, 100), -100);
    setSwipeOffset(cappedOffset);
    
    if (cappedOffset > 0) {
      setSwipeDirection('right');
    } else if (cappedOffset < 0) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection(null);
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      resetSwipe();
      return;
    }
    
    const distance = touchEnd - touchStart;
    const isLeftSwipe = distance < -minSwipeDistance;
    const isRightSwipe = distance > minSwipeDistance;
    
    if (isLeftSwipe) {
      handleDeboost();
    } else if (isRightSwipe) {
      handleBoost();
    }
    
    resetSwipe();
  };

  useEffect(() => {
    return () => {
      resetSwipe();
    };
  }, []);

  const progressPercentage = Math.min(
    (post.author.currentVotes / post.author.voteThreshold) * 100,
    100
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div 
      ref={cardRef}
      className={cn(
        "bg-white rounded-2xl shadow-sm border border-border p-5 transition-all duration-300 animate-scale-in card-hover relative overflow-hidden",
        compact ? "max-w-md" : "w-full max-w-2xl",
        swiping && "cursor-grabbing"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        transform: `translateX(${swipeOffset}px)`,
        transition: swiping ? 'none' : 'transform 0.3s ease-out',
      }}
    >
      {swiping && swipeDirection === 'right' && (
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-r from-cyberpink to-cyberpurple opacity-70" />
      )}
      {swiping && swipeDirection === 'left' && (
        <div className="absolute top-0 right-0 bottom-0 w-1 bg-destructive opacity-70" />
      )}
      
      <div className="flex gap-4">
        <div className="flex flex-col items-center space-y-1">
          <button 
            onClick={handleBoost}
            className={cn(
              "p-2 rounded-full transition-all vote-animation",
              userBoosted 
                ? "bg-gradient-to-r from-cyberpink to-cyberpurple text-white shadow-[0_0_10px_rgba(215,70,239,0.5)]" 
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
            aria-label="Boost post"
          >
            <X className={cn("h-5 w-5", userBoosted ? "animate-pulse" : "")} />
          </button>
          
          <span className={cn(
            "font-semibold text-lg transition-all duration-200",
            userBoosted ? "text-cyberpink" : "text-muted-foreground"
          )}>
            {voteCount}
          </span>
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className={cn(
                  "h-8 w-8 rounded-full overflow-hidden flex items-center justify-center",
                  post.author.isRevealed ? "bg-secondary" : "bg-black"
                )}>
                  {post.author.isRevealed ? (
                    post.author.avatarUrl ? (
                      <img 
                        src={post.author.avatarUrl} 
                        alt={post.author.name || 'User'} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-4 w-4 text-foreground" />
                    )
                  ) : (
                    <Lock className="h-4 w-4 text-white" />
                  )}
                </div>
                {!post.author.isRevealed && (
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-white flex items-center justify-center p-0.5">
                    <Progress 
                      value={progressPercentage} 
                      className="h-full w-full rounded-full"
                    />
                  </div>
                )}
              </div>
              
              <div className="text-sm">
                {post.author.isRevealed ? (
                  <Link to={`/profile/${post.author.id}`} className="font-medium hover:underline">
                    {post.author.name || 'Anonymous User'}
                  </Link>
                ) : (
                  <span className="font-medium">Anonymous</span>
                )}
                <div className="text-xs text-muted-foreground">
                  {formatDate(post.createdAt)}
                </div>
              </div>
            </div>
          </div>

          <Link to={`/post/${post.id}`} className="block">
            <p className="text-black leading-relaxed">{post.content}</p>
          </Link>

          <div className="pt-2 flex items-center space-x-4 text-muted-foreground">
            <button className="flex items-center gap-1.5 text-sm hover:text-foreground transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span>{post.commentCount} comments</span>
            </button>
            <button className="flex items-center gap-1.5 text-sm hover:text-foreground transition-colors">
              <Share className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
      
      {!post.author.isRevealed && (
        <div className="mt-5 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              Identity Reveal Progress
            </span>
            <span className="text-xs font-medium text-cyberpink">
              {Math.round(progressPercentage)}% of 11%
            </span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2 bg-gray-100"
          />
          <div className="mt-2 text-xs text-center text-muted-foreground">
            {post.author.isRevealed ? 
              "Identity Revealed" : 
              `${post.author.currentVotes} of ${post.author.voteThreshold} votes needed to reveal identity`
            }
          </div>
        </div>
      )}
      
      <div className="mt-3 text-xs text-center text-muted-foreground hidden touch-device:block">
        Swipe right to boost, left to deboost
      </div>
    </div>
  );
};

export default PostCard;
