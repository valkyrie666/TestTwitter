import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../shared/interfaces";

@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string) {
    const result = this.http.post<User>(`${environment.serverUrl}auth/login`, { username, password })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
    return result;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  create(user: User) {
    return this.http.post(`${environment.serverUrl}auth/register`, user);
  }

  isAuthenticated(): boolean {
    if (localStorage.currentUser === undefined) {
      return false;
    }
    return true;
  }

  getFromLocalStorage() {
    var user = JSON.parse(localStorage.currentUser);
    return user;
  }
}
