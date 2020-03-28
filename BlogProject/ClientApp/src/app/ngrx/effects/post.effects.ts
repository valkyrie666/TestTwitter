import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';
import { postListSelector } from '../selectors/post.selector';
import { of } from 'rxjs';

import { AppState } from '../states/app.state';
import { PostService } from "../../services/blog-post.service";
import { GetPost, EPostActions, GetPostSuccess, GetPosts, GetPostsSuccess, DeletePost, DeletePostSuccess, CreatePost, CreatePostSuccess, SearchPosts, SearchPostsSuccess } from '../actions/post.actions';

@Injectable()
export class PostEffects {
  constructor(
    private _service: PostService, 
    private _action$: Actions, 
    private _store: Store<AppState>
  ) { }

  @Effect()
  getPost$ = this._action$
      .pipe(
        ofType<GetPost>(EPostActions.GetPost),
        map(action => action.payload),
        withLatestFrom(this._store.pipe(select(postListSelector))),
        switchMap(([id]) => {
          const selectedPost = this._service.getById(id);
          return of(new GetPostSuccess(selectedPost));
        }));

  @Effect()
  getPosts$ = this._action$
      .pipe(
        ofType<GetPosts>(EPostActions.GetPosts),
        switchMap(() => {
          const posts = this._service.getPosts();
          return of(new GetPostsSuccess(posts));
        }));

  @Effect()
  createPost$ = this._action$
      .pipe(
        ofType<CreatePost>(EPostActions.CreatePost),
        map(action => action.payload),
        withLatestFrom(this._store.pipe(select(postListSelector))),
        switchMap(([post]) => {
          const create = this._service.create(post);
          return of(new CreatePostSuccess(create));
        })); 

  @Effect()
  deletePost$ = this._action$
      .pipe(
        ofType<DeletePost>(EPostActions.DeletePost),
        map(action => action.payload),
        withLatestFrom(this._store.pipe(select(postListSelector))),
        switchMap(([id]) => {
          const remove = this._service.remove(id);
          return of(new DeletePostSuccess(remove));
        }));

  @Effect()
  searchPost$ = this._action$
      .pipe(
        ofType<SearchPosts>(EPostActions.SearchPosts),
        map(action => action.payload),
        switchMap(([search]) => {
          const searchPosts = this._service.search(search);
          console.log('okay');
          return of(new SearchPostsSuccess(searchPosts));
        }));  
}
