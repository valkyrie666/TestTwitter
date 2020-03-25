import { Component, Inject, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Post } from "../../shared/interfaces";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postElement: Post;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
   
  }

  ngOnInit() {
    const v = this.route.snapshot.params.id;
    this.http.get<Post>(`${environment.serverUrl}post/${v}`).subscribe(result => {
      this.postElement = result;
    }, error => console.error(error));
  }
}
