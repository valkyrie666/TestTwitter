import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { User } from "../../shared/interfaces";

@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  form: FormGroup;
  submitted = false;

  constructor(private router: Router, private service: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null,
      [
        Validators.required
      ]),
      lastName: new FormControl(null,
      [
        Validators.required
      ]),
      username: new FormControl(null,
      [
        Validators.required
      ]),
      password: new FormControl(null,
      [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  submit() {
    const user: User =
    {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      username: this.form.value.username,
      password: this.form.value.password 
    };

    this.service.create(user)
      .subscribe(
        () => {
          this.router.navigate(['login']);
        },
        error => {
          console.log('Error caught!\n', error);
        });
  }
}
