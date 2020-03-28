import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { routerReducer } from '@ngrx/router-store';
import { postReducers } from './post.reducer';

export const appReducers: ActionReducerMap<AppState, any> = {
    router: routerReducer,
    posts: postReducers
}