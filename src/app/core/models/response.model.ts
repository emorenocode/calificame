export interface Response {
  id: string;
  surveyId: string;
  establishmentId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  resolved: boolean;
}
