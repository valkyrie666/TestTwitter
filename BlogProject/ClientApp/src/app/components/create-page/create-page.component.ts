import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Post } from "../../shared/interfaces";
import { AlertService } from "../../shared/services/alert.service";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  providers: [AlertService, UserService]
})
export class CreatePageComponent implements OnInit {
  constructor(private service: AuthService, private http: HttpClient, private alertService: AlertService) { }
  public form: FormGroup;

  ngOnInit() {
    var user = this.service.getFromLocalStorage();
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl(user.username, Validators.required),
      text: new FormControl(null, Validators.required)
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const post: Post = {
      id: this.form.value.title,
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date(),
      rating: 0
    };

    this.http.post(`${environment.serverUrl}post/create`, post).subscribe(() => {
        this.form.reset();
        this.alertService.success('Post created');
    });
  }
}
