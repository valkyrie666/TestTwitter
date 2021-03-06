export interface Post {
  id?: string;
  title: string;
  author: string;
  text: string;
  date: Date;
  rating: number
}

export class User {
  id?: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}
