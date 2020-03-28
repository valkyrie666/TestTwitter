import { AppState } from "../states/app.state";
import { createSelector } from '@ngrx/store';
import { PostState } from '../states/post.state';

const selectPosts = (state: AppState) => state.posts;

export const postListSelector = createSelector(
    selectPosts,
    (state: PostState) => state.posts
);

export const selectSelectedPost = createSelector(
    selectPosts,
    (state: PostState) => state.selectedPost
);
