import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getById(id: number): Observable<User> {
    var result = this.http.get<User>(`${environment.serverUrl}auth/user/${id}`);
    return result;
  }

  getByUsername(username: string): Observable<User> {
    var result = this.http.get<User>(`${environment.serverUrl}auth/user/username/${username}`);
    return result;
  }
}
