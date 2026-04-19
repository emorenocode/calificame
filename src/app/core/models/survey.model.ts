export interface Survey {
  id: string;
  question: string;
  stars: { [key: string]: Star };
  ownerId: string;
  establishmentId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  scanCount: number;
}

export interface Star {
  message: string;
  cta: {
    label: string;
    url: string;
  };
}
