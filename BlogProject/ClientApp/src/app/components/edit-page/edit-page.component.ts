import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BlogPostService } from '../../services/blog-post.service';
import { Post } from '../../shared/interfaces';

@Component({
  selector: 'edit-component',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  form: FormGroup;
  post: Post;

  constructor(private router: Router, private route: ActivatedRoute, private service: BlogPostService) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.service.getById(id).subscribe(result => {
      this.post = result;
      console.log(this.post);
      this.form = new FormGroup({
        title: new FormControl(this.post.title, Validators.required),
        text: new FormControl(this.post.text, Validators.required)
      });
    }, error => console.error(error));
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.service.update(
      {
        ...this.post,
        text: this.form.value.text,
        title: this.form.value.title
      }).subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
