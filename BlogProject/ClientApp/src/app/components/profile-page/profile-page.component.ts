import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Post, User } from "../../shared/interfaces";
import { PostService } from "../../services/blog-post.service";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {

  user: User;
  posts: Post[] = [];
  userSub: Subscription;
  getUserPostsSub: Subscription;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const username = this.route.snapshot.params.username;
    this.userSub = this.userService.getByUsername(username).subscribe(
      result => {
        this.user = result;
      }, error => console.error(error)
    );

    this.getUserPostsSub = this.postService.getByAuthor(username).subscribe(
      result => {
        this.posts = result;
        console.log(this.posts);
      }, error => console.error(error)
    );
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.getUserPostsSub) {
      this.getUserPostsSub.unsubscribe();
    }
  }
}
