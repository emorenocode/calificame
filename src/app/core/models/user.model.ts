export interface User {
  id: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  createdAt: Date | null;
  expireOn: Date | null;
}
