export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments?: string[];
  createdAt: string;
}