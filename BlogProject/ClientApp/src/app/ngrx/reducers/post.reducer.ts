import { Action, createReducer, on } from '@ngrx/store';

import { inititalPostState, PostState } from '../states/post.state';
import { EPostActions, PostActions } from '../actions/post.actions';

export const postReducers = (
  state = inititalPostState,
  action: PostActions) : PostState => {
    switch(action.type) {
      case EPostActions.GetPostsSuccess: {
        return {
          ...state,
          posts: action.payload
        };
      }
      case EPostActions.GetPostSuccess: {
        return {
          ...state,
          selectedPost: action.payload
        };
      }
      default: {
        return state;
      }
    };
  }