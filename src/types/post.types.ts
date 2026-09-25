export type DeliveryMap = Record<string, number>;

export type Seller = {
  id: string;
  name: string;
  avatarUrl: string | null;
  verified: boolean;
};

export type Post = {
  id: string;
  ownerId: string;
  seller: Seller;
  images: string[];
  title: string;
  description: string;
  price: number;
  stock: number | undefined;
  shipFrom: string;
  delivery: DeliveryMap;
  hashtags: string[];
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  views: number;
  watchTimeFraction: number;
  followerCount: number;
  verified: boolean;
  hasOpenReport: boolean;
  createdAt: number;
};