
import React from 'react';
import { cn } from '@/lib/utils';
import { User, Lock, Calendar } from 'lucide-react';
import ProfileRevealAnimation from './ProfileRevealAnimation';

export interface UserProfileData {
  id: string;
  isRevealed: boolean;
  name: string | null;
  bio: string | null;
  avatarUrl: string | null;
  joinedAt: string;
  stats: {
    posts: number;
    votesReceived: number;
  };
  voteThreshold: number;
  currentVotes: number;
  recentlyRevealed?: boolean;
}

interface UserProfileProps {
  profile: UserProfileData;
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ profile, className }) => {
  const progressPercentage = Math.min(
    (profile.currentVotes / profile.voteThreshold) * 100,
    100
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long'
    }).format(date);
  };

  return (
    <div className={cn(
      "bg-white rounded-2xl shadow-sm border border-border p-6 flex flex-col items-center text-center",
      className,
      profile.recentlyRevealed && "relative overflow-hidden"
    )}>
      {profile.recentlyRevealed && <ProfileRevealAnimation />}

      <div className="relative mb-6">
        <div className={cn(
          "h-24 w-24 rounded-full overflow-hidden flex items-center justify-center",
          profile.isRevealed ? "bg-secondary" : "bg-black"
        )}>
          {profile.isRevealed ? (
            profile.avatarUrl ? (
              <img 
                src={profile.avatarUrl} 
                alt={profile.name || 'User'} 
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-10 w-10 text-foreground" />
            )
          ) : (
            <Lock className="h-10 w-10 text-white" />
          )}
        </div>

        {!profile.isRevealed && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-black transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {profile.currentVotes}/{profile.voteThreshold} votes to reveal
            </div>
          </div>
        )}
      </div>

      <h2 className={cn(
        "text-xl font-semibold mb-1",
        !profile.isRevealed && "opacity-70"
      )}>
        {profile.isRevealed ? (profile.name || 'Anonymous User') : 'Anonymous'}
      </h2>

      {profile.isRevealed && profile.bio && (
        <p className="text-muted-foreground mb-4 max-w-md">{profile.bio}</p>
      )}

      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Calendar className="h-4 w-4 mr-1.5" />
        <span>Joined {formatDate(profile.joinedAt)}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-2">
        <div className="bg-secondary rounded-xl py-3 px-4">
          <div className="text-2xl font-semibold">{profile.stats.posts}</div>
          <div className="text-sm text-muted-foreground">Posts</div>
        </div>
        <div className="bg-secondary rounded-xl py-3 px-4">
          <div className="text-2xl font-semibold">{profile.stats.votesReceived}</div>
          <div className="text-sm text-muted-foreground">Votes Received</div>
        </div>
      </div>

      {profile.isRevealed && (
        <div className="mt-4 text-sm text-muted-foreground">
          <span className="inline-block px-3 py-1 bg-black/5 rounded-full">
            Identity Revealed
          </span>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
