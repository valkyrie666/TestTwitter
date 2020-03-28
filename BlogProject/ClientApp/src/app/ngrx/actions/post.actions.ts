import { Action } from '@ngrx/store';
import { Post } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';

export enum EPostActions {
  GetPosts = 'get posts',
  GetPostsSuccess = 'get posts success',
  GetPost = 'get post',
  GetPostSuccess = 'get post success',
  CreatePost = 'create post',
  CreatePostSuccess = 'create post success',
  DeletePost = 'delete post',
  DeletePostSuccess = 'delete post success',
  SearchPosts = 'search posts',
  SearchPostsSuccess = 'search posts success'
}

export class GetPosts implements Action {
  public readonly type = EPostActions.GetPosts;
  constructor() {}
}

export class GetPostsSuccess implements Action {
  public readonly type = EPostActions.GetPostsSuccess;
  constructor(public payload: Observable<Post[]>) {}
}

export class GetPost implements Action {
  public readonly type = EPostActions.GetPost;
  constructor(public payload: string) {}
}

export class GetPostSuccess implements Action {
  public readonly type = EPostActions.GetPostSuccess;
  constructor(public payload: Observable<Post>) {}
}

export class CreatePost implements Action {
  public readonly type = EPostActions.CreatePost;
  constructor(public payload: Post) {}
}

export class CreatePostSuccess implements Action {
  public readonly type = EPostActions.CreatePostSuccess;
  constructor(public payload: Observable<void>) { }
}

export class DeletePost implements Action {
  public readonly type = EPostActions.DeletePost;
  constructor(public payload: string) {}
}

export class DeletePostSuccess implements Action {
  public readonly type = EPostActions.DeletePostSuccess;
  constructor(public payload: Observable<void>) {}
}

export class SearchPosts implements Action {
  public readonly type = EPostActions.SearchPosts
  constructor(public payload: string) { }
}

export class SearchPostsSuccess implements Action {
  public readonly type = EPostActions.SearchPostsSuccess
  constructor(public payload: Observable<Post[]>) { }
}

export type PostActions = GetPost | GetPosts | GetPostsSuccess | GetPostSuccess | CreatePost | CreatePostSuccess| DeletePost | DeletePostSuccess;
