import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { User } from "../../shared/interfaces";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submitted = false;
  registerSub: Subscription;

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

  ngOnDestroy() {
    if (this.registerSub) {
      this.registerSub.unsubscribe();
    }
  }

  submit() {
    const user: User =
    {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      username: this.form.value.username,
      password: this.form.value.password 
    };

    this.registerSub = this.service.create(user)
      .subscribe(
        () => {
          this.router.navigate(['login']);
        },
        error => {
          console.log('Error caught!\n', error);
        });
  }
}
