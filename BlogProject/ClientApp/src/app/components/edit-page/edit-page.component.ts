import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/blog-post.service';
import { Post } from '../../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'edit-component',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  post: Post;
  getPostSub: Subscription;
  updatePostSub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private service: PostService) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.getPostSub = this.service.getById(id).subscribe(result => {
      this.post = result;
      console.log(this.post);
      this.form = new FormGroup({
        title: new FormControl(this.post.title, Validators.required),
        text: new FormControl(this.post.text, Validators.required)
      });
    }, error => console.error(error));
  }

  ngOnDestroy() {
    if (this.getPostSub) {
      this.getPostSub.unsubscribe();
    }
    if (this.updatePostSub) {
      this.updatePostSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.updatePostSub = this.service.update(
      {
        ...this.post,
        text: this.form.value.text,
        title: this.form.value.title
      }).subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
