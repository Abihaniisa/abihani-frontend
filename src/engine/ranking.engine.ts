/* ABIHANI — For You ranking engine
 * Pure logic. No UI. No network. No side effects.
 * Every weight is documented. No black box.
 * RULES.md: never influenced by money, personal data,
 * or past purchase history. */

import type { Post } from '../types/post.types';

export type RankInputs = {
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  views: number;
  watchTimeFraction: number; // 0 to 1, average of full-watch across viewers
  followerCount: number;     // the poster's follower count
  verified: boolean;         // the poster's verified status
  createdAt: number;         // the post's creation timestamp
  hasOpenReport: boolean;    // true if a report is unresolved
};

const WEIGHTS = {
  like: 1,
  comment: 3,
  share: 5,
  save: 4,
  view: 0.05,
  watch: 0.5,
  follower: 0.1,
  verifiedBonus: 5,
};

const FRESHNESS_24H_MS = 24 * 60 * 60 * 1000;
const FRESHNESS_7D_MS = 7 * FRESHNESS_24H_MS;

const FRESHNESS_MULTIPLIERS = {
  within24h: 1.5,
  within7d: 1.2,
  older: 1.0,
};

export function computeScore(inputs: RankInputs, now: number = Date.now()): number {
  if (inputs.hasOpenReport) return 0;

  const base =
    inputs.likes * WEIGHTS.like +
    inputs.comments * WEIGHTS.comment +
    inputs.shares * WEIGHTS.share +
    inputs.saves * WEIGHTS.save +
    inputs.views * WEIGHTS.view +
    inputs.watchTimeFraction * inputs.views * WEIGHTS.watch +
    inputs.followerCount * WEIGHTS.follower +
    (inputs.verified ? WEIGHTS.verifiedBonus : 0);

  const age = now - inputs.createdAt;
  let multiplier = FRESHNESS_MULTIPLIERS.older;
  if (age < FRESHNESS_24H_MS) multiplier = FRESHNESS_MULTIPLIERS.within24h;
  else if (age < FRESHNESS_7D_MS) multiplier = FRESHNESS_MULTIPLIERS.within7d;

  return base * multiplier;
}

export function scorePost(post: Post, now: number = Date.now()): number {
  return computeScore(
    {
      likes: post.likes,
      comments: post.comments,
      shares: post.shares,
      saves: post.saves,
      views: post.views,
      watchTimeFraction: post.watchTimeFraction ?? 0,
      followerCount: post.followerCount,
      verified: post.verified,
      createdAt: post.createdAt,
      hasOpenReport: post.hasOpenReport,
    },
    now,
  );
}

export function rankPosts(posts: Post[], now: number = Date.now()): Post[] {
  return [...posts]
    .map((p) => ({ post: p, score: scorePost(p, now) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.post);
}

export function explainScore(
  inputs: RankInputs,
  now: number = Date.now(),
): {
  score: number;
  breakdown: Record<string, number>;
  freshnessMultiplier: number;
} {
  if (inputs.hasOpenReport) {
    return { score: 0, breakdown: { openReport: 0 }, freshnessMultiplier: 0 };
  }

  const breakdown = {
    likes: inputs.likes * WEIGHTS.like,
    comments: inputs.comments * WEIGHTS.comment,
    shares: inputs.shares * WEIGHTS.share,
    saves: inputs.saves * WEIGHTS.save,
    views: inputs.views * WEIGHTS.view,
    watch: inputs.watchTimeFraction * inputs.views * WEIGHTS.watch,
    followers: inputs.followerCount * WEIGHTS.follower,
    verified: inputs.verified ? WEIGHTS.verifiedBonus : 0,
  };

  const base = Object.values(breakdown).reduce((a, b) => a + b, 0);

  const age = now - inputs.createdAt;
  let freshnessMultiplier = FRESHNESS_MULTIPLIERS.older;
  if (age < FRESHNESS_24H_MS) freshnessMultiplier = FRESHNESS_MULTIPLIERS.within24h;
  else if (age < FRESHNESS_7D_MS) freshnessMultiplier = FRESHNESS_MULTIPLIERS.within7d;

  return {
    score: base * freshnessMultiplier,
    breakdown,
    freshnessMultiplier,
  };
}