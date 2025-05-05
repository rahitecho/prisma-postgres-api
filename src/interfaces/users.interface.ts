export interface User {
  id: number;
  name: string;
  email: string;
  password: string; // hashed password
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
