import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Post } from "../../shared/interfaces";
import { Router } from "@angular/router";
import { PostService } from "../../services/blog-post.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  createPostSub: Subscription;

  constructor(
    private postService: PostService,
    private router: Router) {}

  ngOnInit() {
    var user = JSON.parse(localStorage.currentUser);
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl(user.username, Validators.required),
      text: new FormControl(null, Validators.required)
    });
  }

  ngOnDestroy() {
    if (this.createPostSub) {
      this.createPostSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const post: Post = {
      id: this.form.value.title,
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date(),
      rating: 0
    };

    this.createPostSub = this.postService.create(post).subscribe(() => {
        this.form.reset();
    });

    this.router.navigate(['/']);
  }
}
