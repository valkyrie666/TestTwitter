import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../shared/interfaces';
import { PostService } from '../../services/blog-post.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  searchStr = '';
  form: FormGroup;
  getPostsSub: Subscription;
  searchPostsSub: Subscription;
  removePostSub: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.form = new FormGroup({
      searchValue: new FormControl(null, [])
    });

    this.getPostsSub = this.postService.getPosts().subscribe(result => {
      this.posts = result;
    }, error => console.error(error));
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
    if (searchStr.length > 0) {
      this.searchPostsSub = this.postService.search(searchStr).subscribe(result => {
        this.posts = result;
      });
    } else {
      this.searchPostsSub = this.postService.getPosts().subscribe(result => {
        this.posts = result;
      }, error => console.error(error));
    }
  }

  remove(id: string) {
    this.removePostSub = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(p => p.id !== id);
    });
  }
}
