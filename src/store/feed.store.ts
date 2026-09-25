import { create } from 'zustand';
import type { Post } from '../types/post.types';

type FeedState = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  toggleLike: (postId: string) => void;
  toggleSave: (postId: string) => void;
  incrementShares: (postId: string) => void;
};

export const useFeed = create<FeedState>((set) => ({
  posts: [],

  setPosts: (posts) => set({ posts }),

  toggleLike: (postId) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId
          ? { ...p, likes: p.likes + 1 }
          : p,
      ),
    })),

  toggleSave: (postId) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId
          ? { ...p, saves: p.saves + 1 }
          : p,
      ),
    })),

  incrementShares: (postId) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId
          ? { ...p, shares: p.shares + 1 }
          : p,
      ),
    })),
}));

/* A local liked/saved set, so the UI knows which posts the
 * current user has liked or saved in this session. */

type SessionState = {
  liked: Record<string, boolean>;
  saved: Record<string, boolean>;
  toggleLiked: (postId: string) => void;
  toggleSaved: (postId: string) => void;
};

export const useSession = create<SessionState>((set) => ({
  liked: {},
  saved: {},

  toggleLiked: (postId) =>
    set((state) => ({
      liked: { ...state.liked, [postId]: !state.liked[postId] },
    })),

  toggleSaved: (postId) =>
    set((state) => ({
      saved: { ...state.saved, [postId]: !state.saved[postId] },
    })),
}));