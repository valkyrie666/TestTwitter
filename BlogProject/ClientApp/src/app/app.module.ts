import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from './shared/shared.module';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { PostComponent } from './components/blog-post/post.component';
import { CreatePageComponent } from './components/create-page/create-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AuthGuard } from './services/auth/auth.guard';
import { AlertService } from './shared/services/alert.service';
import { AuthService } from './services/auth.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CreateButtonComponent } from './shared/components/create-button/create-button.component';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomeComponent,
    EditPageComponent,
    PostComponent,
    CreatePageComponent,
    LoginComponent,
    RegistrationComponent,
    AlertComponent,
    UserProfileComponent,
    CreateButtonComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
