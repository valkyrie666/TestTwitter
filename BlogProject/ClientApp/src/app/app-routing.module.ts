import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { NgModule } from "@angular/core";
import { MainLayoutComponent } from "./shared/components/main-layout/main-layout.component";
import { HomeComponent } from "./components/home-page/home.component";
import { CreatePageComponent } from "./components/create-page/create-page.component";
import { EditPageComponent } from "./components/edit-page/edit-page.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { AuthGuard } from "./guards/auth.guard";
import { PostComponent } from "./components/post-page/post.component";
import { LoginComponent } from "./components/login-page/login.component";
import { RegistrationComponent } from "./components/registration-page/registration.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'post/:id', component: PostComponent, canActivate: [AuthGuard] },
      { path: 'create', component: CreatePageComponent, canActivate: [AuthGuard] },
      { path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard] },
      { path: 'user/:username', component: UserProfileComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegistrationComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
