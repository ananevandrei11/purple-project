export interface IReviewBody {
  name: string;
  rating: number;
  email: string;
  review: string;
}

export interface IReviewResponse {
  success: boolean;
  message: string;
}
