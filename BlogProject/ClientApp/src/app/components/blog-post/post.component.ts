import { Component, OnInit } from "@angular/core";
import { Post } from "../../shared/interfaces";
import { BlogPostService } from "../../services/blog-post.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postElement: Post;

  constructor(private postService: BlogPostService, private route: ActivatedRoute) {
   
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.postService.getById(id).subscribe(result => {
      this.postElement = result;
    }, error => console.error(error));
  }
}
