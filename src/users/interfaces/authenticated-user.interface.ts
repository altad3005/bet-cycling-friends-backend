export interface AuthenticatedUser {
  id: string;
  email: string;
  pseudo: string;
  avatar?: string;
  createdAt: Date;
}