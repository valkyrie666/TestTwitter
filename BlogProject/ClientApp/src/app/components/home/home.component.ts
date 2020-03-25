import { Component, Inject, OnInit, Output } from '@angular/core';
import { Post, User } from '../../shared/interfaces';
import { BlogPostService } from '../../services/blog-post.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [BlogPostService]
})
export class HomeComponent implements OnInit {
  public posts: Post[] = [];
  searchStr = '';
  form: FormGroup;

  constructor(private blogPostsService: BlogPostService, private userService: UserService, private authService: AuthService) {
    
  }

  ngOnInit() {
    this.form = new FormGroup({
      searchValue: new FormControl(null, [])
    });

    this.blogPostsService.get().subscribe(result => {
      this.posts = result;
    }, error => console.error(error));
  }

  search() {
    const searchStr: string = this.form.value.searchValue;
    if (searchStr.length > 0) {
      this.blogPostsService.search(searchStr).subscribe(result => {
        this.posts = result;
      });
    } else {
      this.blogPostsService.get().subscribe(result => {
        this.posts = result;
      }, error => console.error(error));
    }
  }

  remove(id: string) {
    this.blogPostsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(p => p.id !== id);
    });
  }
}
