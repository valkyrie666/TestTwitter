import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { NgModule } from "@angular/core";
import { MainLayoutComponent } from "./shared/components/main-layout/main-layout.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { PostPageComponent } from "./components/post-page/post-page.component";
import { CreatePageComponent } from "./components/create-page/create-page.component";
import { EditPageComponent } from "./components/edit-page/edit-page.component";
import { ProfilePageComponent } from "./components/profile-page/profile-page.component";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { RegistrationPageComponent } from "./components/registration-page/registration-page.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: HomePageComponent, pathMatch: 'full' },
      { path: 'post/:id', component: PostPageComponent, canActivate: [AuthGuard] },
      { path: 'create', component: CreatePageComponent, canActivate: [AuthGuard] },
      { path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard] },
      { path: 'user/:username', component: ProfilePageComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegistrationPageComponent }
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
