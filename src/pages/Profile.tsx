
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import UserProfile, { UserProfileData } from '@/components/UserProfile';
import PostCard, { Post } from '@/components/PostCard';

// Mock values - would be replaced with actual app user count in a real app
const TOTAL_USERS = 1000; // Example total users
const REVEAL_THRESHOLD_PERCENTAGE = 11; // 11% of users needed to reveal

// Calculate the votes needed to reveal an identity
const calculateVoteThreshold = () => {
  return Math.ceil(TOTAL_USERS * (REVEAL_THRESHOLD_PERCENTAGE / 100));
};

// Mock data
const getMockProfile = (revealed: boolean = false): UserProfileData => {
  const voteThreshold = calculateVoteThreshold();
  return {
    id: 'user-1',
    isRevealed: revealed,
    name: revealed ? 'Alex Johnson' : null,
    bio: revealed ? 'Product designer and coffee enthusiast. I love creating beautiful interfaces and sharing ideas.' : null,
    avatarUrl: null,
    joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    stats: {
      posts: 24,
      votesReceived: 283,
    },
    voteThreshold: voteThreshold,
    currentVotes: revealed ? voteThreshold : Math.floor(voteThreshold * 0.67),
    recentlyRevealed: revealed && Math.random() > 0.5,
  };
};

const getMockPosts = (count: number, userId: string): Post[] => {
  const voteThreshold = calculateVoteThreshold();
  return Array.from({ length: count }, (_, i) => ({
    id: `post-${i}`,
    content: [
      "Just discovered the most amazing coffee shop downtown. The ambiance is perfect for working remotely!",
      "Does anyone else think that modern superhero movies are becoming too formulaic?",
      "I've been learning to code for 3 months now and finally built my first real project yesterday!",
      "Hot take: breakfast foods are actually better when eaten for dinner.",
      "Just finished reading a book that completely changed my perspective on life. Isn't it amazing how words on paper can do that?",
    ][i % 5],
    votes: Math.floor(Math.random() * 100),
    commentCount: Math.floor(Math.random() * 20),
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
    author: {
      id: userId,
      isRevealed: getMockProfile().isRevealed,
      name: getMockProfile().name,
      avatarUrl: getMockProfile().avatarUrl,
      voteThreshold: voteThreshold,
      currentVotes: getMockProfile().currentVotes,
    },
  }));
};

const Profile = () => {
  const { id } = useParams<{ id?: string }>();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts'|'about'>('posts');

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      // For demonstration - showing both revealed and anonymous profiles
      // In a real app, this would depend on the actual user data
      const isRevealed = id === 'revealed' || Math.random() > 0.5;
      setProfile(getMockProfile(isRevealed));
      setPosts(getMockPosts(8, id || 'user-1'));
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20 px-4 md:px-6 max-w-4xl mx-auto">
          <div className="animate-pulse flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <div className="bg-white rounded-2xl h-80 w-full"></div>
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              <div className="h-12 bg-white rounded-2xl w-full"></div>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-40 bg-white rounded-2xl w-full"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20 px-4 md:px-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile sidebar */}
          <div className="w-full md:w-1/3">
            <UserProfile profile={profile} className="sticky top-24" />
          </div>
          
          {/* Content area */}
          <div className="w-full md:w-2/3">
            <div className="mb-6 border-b border-border">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('posts')}
                  className={`pb-3 px-1 font-medium relative ${
                    activeTab === 'posts'
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Posts
                  {activeTab === 'posts' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('about')}
                  className={`pb-3 px-1 font-medium relative ${
                    activeTab === 'about'
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  About
                  {activeTab === 'about' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
                  )}
                </button>
              </div>
            </div>

            {activeTab === 'posts' ? (
              <div className="space-y-4">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No posts yet</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
                <h2 className="text-lg font-semibold mb-4">About</h2>
                
                {profile.isRevealed ? (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      {profile.bio || "This user hasn't added a bio yet."}
                    </p>
                    
                    <div className="pt-4 border-t border-border">
                      <h3 className="text-sm font-medium mb-2">Identity Status</h3>
                      <div className="flex items-center space-x-2">
                        <span className="inline-block px-3 py-1 bg-black/5 rounded-full text-sm">
                          Identity Revealed
                        </span>
                        <span className="text-sm text-muted-foreground">
                          after receiving {profile.voteThreshold} votes
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      This profile is still anonymous. The user's identity will be revealed once they receive {profile.voteThreshold} votes.
                    </p>
                    
                    <div className="pt-4 border-t border-border">
                      <h3 className="text-sm font-medium mb-2">Current Progress</h3>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-black transition-all duration-500"
                          style={{ width: `${(profile.currentVotes / profile.voteThreshold) * 100}%` }}
                        />
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {profile.currentVotes}/{profile.voteThreshold} votes to reveal identity
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
