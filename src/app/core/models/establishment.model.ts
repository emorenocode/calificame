export interface Establishment {
  id: string;
  name: string;
  address: string;
  placeId: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  avgRating: number;
  ratingSum: number;
  totalReviews: number;
  qrCodeUrl: string;
}
