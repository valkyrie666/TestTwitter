import { RouterReducerState } from '@ngrx/router-store';
import { PostState, inititalPostState } from './post.state';

export interface AppState {
    router?: RouterReducerState;
    posts: PostState;
}

export const initialAppState: AppState = {
    posts: inititalPostState
}
