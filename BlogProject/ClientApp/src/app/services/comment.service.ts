import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) { }

  get(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.serverUrl}post/${postId}/comments`);
  }
}
