import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "../shared/interfaces";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<Post[]>(`${environment.serverUrl}post`);
  }

  getByAuthor(username: string) {
    return this.http.get<Post[]>(`${environment.serverUrl}post/author/${username}`);
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.serverUrl}post/blog/${id}`)
      .pipe(map((post: Post) => {
        return {
          ...post,
          id
        };
      }));
  }

  create(post: Post): Observable<void> {
    return this.http.post<void>(`${environment.serverUrl}post/create`, post);
  }

  update(post: Post) {
    return this.http.patch<Post>(`${environment.serverUrl}post/${post.id}/update`, post);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.serverUrl}post/${id}/delete`);
  }

  search(searchStr: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.serverUrl}post/search/${searchStr}`);
  }
}
