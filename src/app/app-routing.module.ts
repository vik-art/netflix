import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './modules/pages/homepage/homepage.component';
import { LoginPageComponent } from './modules/pages/login-page/login-page.component';
import { NotFoundPageComponent } from './modules/pages/not-found-page/not-found-page.component';
import { RegistrationPageComponent } from './modules/pages/registration-page/registration-page.component';



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
  },
  {
    path: "404-page",
    component: NotFoundPageComponent
  },
 // {
 //   path: "**",
 //   redirectTo: "/404-page"
 // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
