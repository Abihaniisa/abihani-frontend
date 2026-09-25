import type { Post } from '../types/post.types';
import type { Comment } from '../types/comment.types';

/* ABIHANI — Post service
 * Stage 5 runs on mock data. No network. No Supabase.
 * Later, only this file changes to become real. */

export async function fetchForYouPosts(): Promise<Post[]> {
  const { MOCK_POSTS } = await import('../data/mockPosts');
  await new Promise((r) => setTimeout(r, 300));
  return [...MOCK_POSTS];
}

export async function fetchFollowingPosts(): Promise<Post[]> {
  const { MOCK_POSTS } = await import('../data/mockPosts');
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_POSTS.filter((p) => p.followerCount > 0);
}

export async function fetchCommentsForPost(postId: string): Promise<Comment[]> {
  const { MOCK_COMMENTS } = await import('../data/mockPosts');
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_COMMENTS[postId] ?? [];
}

export async function fetchSellerPosts(sellerId: string): Promise<Post[]> {
  const { MOCK_POSTS } = await import('../data/mockPosts');
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_POSTS.filter((p) => p.seller.id === sellerId);
}

export async function fetchPostById(postId: string): Promise<Post | null> {
  const { MOCK_POSTS } = await import('../data/mockPosts');
  return MOCK_POSTS.find((p) => p.id === postId) ?? null;
}