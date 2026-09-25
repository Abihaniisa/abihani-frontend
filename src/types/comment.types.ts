export type CommentUser = {
  id: string;
  name: string;
  avatarUrl: string | null;
  verified: boolean;
};

export type Comment = {
  id: string;
  postId: string;
  user: CommentUser;
  time: string;
  text: string;
  likes: number;
  verifiedPurchase: boolean;
  seller: boolean;
  replies: Comment[];
};