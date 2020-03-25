import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Post, User } from "../../shared/interfaces";
import { BlogPostService } from "../../services/blog-post.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UserService]
})
export class UserProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private postService: BlogPostService,
    private route: ActivatedRoute
  ) { }

  user: User;
  posts: Post[] = [];

  ngOnInit() {
    const username = this.route.snapshot.params.username;
    this.userService.getByUsername(username).subscribe(
      result => {
        this.user = result;
      }, error => console.error(error)
    );

    this.postService.getByAuthor(username).subscribe(
      result => {
        this.posts = result;
        console.log(this.posts);
      }, error => console.error(error)
    );
  }
}
