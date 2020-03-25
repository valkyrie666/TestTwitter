import { Component, OnInit } from '@angular/core';
import { Post } from '../../shared/interfaces';
import { BlogPostService } from '../../services/blog-post.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public posts: Post[] = [];
  searchStr = '';
  form: FormGroup;

  constructor(private postService: BlogPostService) {}

  ngOnInit() {
    this.form = new FormGroup({
      searchValue: new FormControl(null, [])
    });

    this.postService.get().subscribe(result => {
      this.posts = result;
    }, error => console.error(error));
  }

  search() {
    const searchStr: string = this.form.value.searchValue;
    if (searchStr.length > 0) {
      this.postService.search(searchStr).subscribe(result => {
        this.posts = result;
      });
    } else {
      this.postService.get().subscribe(result => {
        this.posts = result;
      }, error => console.error(error));
    }
  }

  remove(id: string) {
    this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(p => p.id !== id);
    });
  }
}
