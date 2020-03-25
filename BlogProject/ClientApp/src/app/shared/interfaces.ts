export interface Post {
  id?: string;
  title: string;
  author: string;
  text: string;
  date: Date;
  rating: number
}

export interface AuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface CreateResponse {
  name: string;
}

export class User {
  id?: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}
