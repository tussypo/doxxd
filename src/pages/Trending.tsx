
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import PostCard, { Post } from '@/components/PostCard';
import { BarChart2 } from 'lucide-react';

// Mock values - would be replaced with actual app user count in a real app
const TOTAL_USERS = 1000; // Example total users
const REVEAL_THRESHOLD_PERCENTAGE = 11; // 11% of users needed to reveal

// Calculate the votes needed to reveal an identity
const calculateVoteThreshold = () => {
  return Math.ceil(TOTAL_USERS * (REVEAL_THRESHOLD_PERCENTAGE / 100));
};

// Reuse the mock data generation from Index.tsx
const generateMockPosts = (count: number): Post[] => {
  const voteThreshold = calculateVoteThreshold();
  return Array.from({ length: count }, (_, i) => ({
    id: `post-${i}`,
    content: [
      "Just discovered the most amazing coffee shop downtown. The ambiance is perfect for working remotely!",
      "Does anyone else think that modern superhero movies are becoming too formulaic?",
      "I've been learning to code for 3 months now and finally built my first real project yesterday!",
      "Hot take: breakfast foods are actually better when eaten for dinner.",
      "Just finished reading a book that completely changed my perspective on life. Isn't it amazing how words on paper can do that?",
      "What's a skill you've always wanted to learn but haven't had the time for?",
      "Unpopular opinion: social media has done more harm than good for society.",
    ][i % 7],
    votes: 50 + Math.floor(Math.random() * 500), // Higher votes for trending
    commentCount: 5 + Math.floor(Math.random() * 50), // More comments
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 3 * 24 * 60 * 60 * 1000)).toISOString(), // More recent
    author: {
      id: `user-${i}`,
      isRevealed: Math.random() > 0.5, // More revealed profiles in trending
      name: Math.random() > 0.5 ? ['Alex Johnson', 'Sam Rivera', 'Taylor Kim', 'Jordan Smith', 'Casey Wong'][i % 5] : null,
      avatarUrl: null,
      voteThreshold: voteThreshold,
      currentVotes: 80 + Math.floor(Math.random() * 50), // Higher progress
    },
  })).sort((a, b) => b.votes - a.votes); // Sort by votes
};

const Trending = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month'>('today');

  useEffect(() => {
    // Simulate data loading with delay based on filter change
    setLoading(true);
    const timer = setTimeout(() => {
      setPosts(generateMockPosts(8));
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [timeFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20 px-4 md:px-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Trending</h1>
          </div>
          
          <div className="flex items-center space-x-1 bg-white rounded-lg p-1 shadow-sm border border-border">
            {(['today', 'week', 'month'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  timeFilter === filter
                    ? 'bg-black text-white'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            // Loading skeletons - similar to Index.tsx
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-border p-5 animate-pulse">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="h-8 w-8 rounded-full bg-muted"></div>
                    <div className="h-4 w-6 rounded bg-muted"></div>
                    <div className="h-8 w-8 rounded-full bg-muted"></div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-muted"></div>
                      <div className="h-4 w-24 rounded bg-muted"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded bg-muted"></div>
                      <div className="h-4 w-3/4 rounded bg-muted"></div>
                    </div>
                    <div className="pt-2 flex items-center space-x-4">
                      <div className="h-4 w-24 rounded bg-muted"></div>
                      <div className="h-4 w-16 rounded bg-muted"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
          
          {!loading && posts.length > 0 && (
            <div className="pt-4 flex justify-center">
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Load more
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Trending;
