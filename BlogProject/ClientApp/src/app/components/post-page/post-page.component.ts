import { Component, OnInit, OnDestroy } from "@angular/core";
import { Post } from "../../shared/interfaces";
import { PostService } from "../../services/blog-post.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {
  postElement: Post;
  getPostSub: Subscription;

  constructor(private postService: PostService,
    private route: ActivatedRoute)
  { }

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;
    console.log(id);

    this.getPostSub = this.postService.getById(id).subscribe(result => {
      this.postElement = result;
    }, error => console.error(error));
  }

  ngOnDestroy() {
    if (this.getPostSub) {
      this.getPostSub.unsubscribe();
    }
  }
}
