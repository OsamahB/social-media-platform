export interface EventPostList {
  id: number;
  title: string;
  description?: string;
  category?: string;
  location: string;
  date: Date;
  period: string;
  user_id: number;
  user_email: string;
  user_full_name: string;
  created_at: Date;
}
