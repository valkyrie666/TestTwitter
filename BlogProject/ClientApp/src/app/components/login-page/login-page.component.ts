import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  submitted = false;
  baseUrl: string = environment.serverUrl;
  error = '';
  loading = false;
  returnUrl: string;
  loginSub: Subscription;

  constructor(private service: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    } 
  }

  submit() {
    this.submitted = true;
    this.loading = true;

    if (this.form.invalid) {
      return;
    }

    const username = this.form.value.username;
    const password = this.form.value.password;

    this.loginSub = this.service.login(username, password).pipe(first()).subscribe(
      () => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.error = error;
        this.loading = false;
        console.log('Error caught!\n', error);
      });
  }
}
