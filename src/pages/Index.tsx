
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import PostCard, { Post } from '@/components/PostCard';
import CreatePost from '@/components/CreatePost';
import { cn } from '@/lib/utils';
import { PlusCircle, X, Zap } from 'lucide-react';

// Mock data for demonstration
const generateMockPosts = (count: number): Post[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `post-${i}`,
    content: [
      "Just discovered a new neural implant that boosts reaction time by 200%! Anyone else tried it?",
      "The new holographic displays in the Lower District are absolutely stunning. Worth checking out at night.",
      "Rumors about a data breach at MegaCorp are spreading. Anyone know if they're legit?",
      "Hot take: synthetic food tastes better than the real thing now.",
      "Just finished coding a new cyberdeck interface that completely changed my net-diving experience. Incredible what custom scripts can do.",
      "What's a skill chip you've always wanted to install but haven't saved up for?",
      "Unpopular opinion: the new neural network regulations have actually made the net safer for everyone.",
    ][i % 7],
    votes: Math.floor(Math.random() * 150),
    commentCount: Math.floor(Math.random() * 30),
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
    author: {
      id: `user-${i}`,
      isRevealed: Math.random() > 0.7,
      name: Math.random() > 0.7 ? ['N3tRUNN3R', 'CyberPsych0', 'Ghost_Protocol', 'Neon_Samurai', 'Void_Walker'][i % 5] : null,
      avatarUrl: Math.random() > 0.7 ? null : null,
      voteThreshold: 100,
      currentVotes: Math.floor(Math.random() * 120),
    },
  }));
};

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setPosts(generateMockPosts(10));
      setLoading(false);
    }, 1000);

    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleCreatePost = (content: string) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      content,
      votes: 0,
      commentCount: 0,
      createdAt: new Date().toISOString(),
      author: {
        id: 'current-user',
        isRevealed: false,
        name: null,
        avatarUrl: null,
        voteThreshold: 100,
        currentVotes: 0,
      },
    };

    setPosts([newPost, ...posts]);
    setShowCreatePost(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20 px-4 md:px-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold cyber-gradient-text">Network Feed</h1>
        </div>

        {/* Desktop create post button */}
        <div className="hidden md:block mb-8">
          <button
            onClick={() => setShowCreatePost(true)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md border border-white/10 glass hover:shadow-[0_0_15px_rgba(215,70,239,0.3)] transition-all"
          >
            <PlusCircle className="h-5 w-5 text-cyberpink" />
            <span className="font-medium">Create Post</span>
          </button>
        </div>

        {/* Create post modal */}
        {showCreatePost && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="w-full max-w-lg">
              <CreatePost 
                onClose={() => setShowCreatePost(false)}
                onSubmit={handleCreatePost}
              />
            </div>
          </div>
        )}

        {/* Posts list */}
        <div className="space-y-4">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="cyber-card p-5 animate-pulse">
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
        </div>
      </main>

      {/* Mobile floating create post button */}
      <div className={cn(
        "md:hidden fixed bottom-6 right-6 z-40 transition-all duration-300",
        scrolled ? "scale-100 opacity-100" : "scale-95 opacity-90"
      )}>
        <button
          onClick={() => setShowCreatePost(true)}
          className="h-14 w-14 flex items-center justify-center rounded-full bg-gradient-to-r from-cyberpink to-cyberpurple text-white shadow-[0_0_15px_rgba(215,70,239,0.5)] hover:shadow-[0_0_20px_rgba(215,70,239,0.7)] transition-all btn-hover animate-neon-pulse"
        >
          <PlusCircle className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Index;
