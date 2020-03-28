import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../shared/interfaces';
import { PostService } from '../../services/blog-post.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { AppState } from '../../ngrx/states/app.state';
import { Store, select } from '@ngrx/store';
import { postListSelector } from '../../ngrx/selectors/post.selector';
import { GetPosts, DeletePost, SearchPosts } from '../../ngrx/actions/post.actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  form: FormGroup;

  getPostsSub: Subscription;
  searchPostsSub: Subscription;
  removePostSub: Subscription;

  postsStream$: Observable<Observable<Post[]>>;
  posts$: Observable<Post[]>;

  constructor(private store: Store<AppState>) {
    this.postsStream$ = store.pipe(select(postListSelector));
  }

  ngOnInit() {
    this.form = new FormGroup({
      searchValue: new FormControl(null, [])
    });

    this.store.dispatch(new GetPosts());
    this.getPostsSub = this.postsStream$.subscribe(result => {
      this.posts$ = result;
    });
  }

  ngOnDestroy() {
    if (this.getPostsSub) {
      this.getPostsSub.unsubscribe();
    }
    if (this.searchPostsSub) {
      this.searchPostsSub.unsubscribe();
    }
    if (this.removePostSub) {
      this.removePostSub.unsubscribe();
    }
  }

  search() {
    const searchStr: string = this.form.value.searchValue;

    this.store.dispatch(new SearchPosts(searchStr));
    this.searchPostsSub = this.postsStream$.subscribe(result => {
      this.posts$ = result;
    });
  }

  remove(id: string) {
    this.store.dispatch(new DeletePost(id));
    this.removePostSub = this.postsStream$.subscribe(() => {});
  }
}
