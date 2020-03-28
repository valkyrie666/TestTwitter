import { Post } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';

export interface PostState {
  posts: Observable<Post[]>;
  selectedPost: Observable<Post>;
}

export const inititalPostState: PostState = {
  posts: null,
  selectedPost: null
}
