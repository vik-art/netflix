import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { FavouriteComponent } from './modules/pages/favourite/favourite.component';
import { FriendsComponent } from './modules/pages/friends/friends.component';
import { HomepageComponent } from './modules/pages/homepage/homepage.component';
import { LoginPageComponent } from './modules/pages/login-page/login-page.component';
import { MoviePageComponent } from './modules/pages/movie-page/movie-page.component';
import { RegistrationPageComponent } from './modules/pages/registration-page/registration-page.component';
import { SelectedComponent } from './modules/pages/selected/selected.component';
import { UserPageComponent } from './modules/pages/user-page/user-page.component';



const routes: Routes = [ 
  {
    path: "",
    component: HomepageComponent,
    pathMatch: "full"
  },
  {
    path: "register",
    component: RegistrationPageComponent
  },
  {
    path: "login",
    component: LoginPageComponent
  },
  {
    path: "user",
    loadChildren: ()=> import("./user.module").then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
