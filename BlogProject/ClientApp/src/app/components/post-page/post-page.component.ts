import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import { Store, select } from "@ngrx/store";

import { AppState } from "../../ngrx/states/app.state";
import { selectSelectedPost } from "../../ngrx/selectors/post.selector";
import { GetPost } from "../../ngrx/actions/post.actions";
import { Post } from "../../shared/interfaces";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {
  getPostSub: Subscription;

  postStream$: Observable<Observable<Post>>;
  post$: Observable<Post>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>) {
    this.postStream$ = store.pipe(select(selectSelectedPost));
  }

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;
    this.store.dispatch(new GetPost(id));
    this.getPostSub = this.postStream$.subscribe(postObj => {
      this.post$ = postObj;
    });
  }

  ngOnDestroy() {
    if (this.getPostSub) {
      this.getPostSub.unsubscribe();
    }
  }
}
