import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './modules/pages/homepage/homepage.component';
import { LoginPageComponent } from './modules/pages/login-page/login-page.component';
import { MenuListComponent } from './modules/shared/menu-list/menu-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RegistrationPageComponent } from './modules/pages/registration-page/registration-page.component';
import { UserPageComponent } from './modules/pages/user-page/user-page.component';
import { FormComponent } from './components/form/form.component';
import { AuthGuard } from './guards/auth.guard';
import { FavouriteComponent } from './modules/pages/favourite/favourite.component';
import { SelectedComponent } from './modules/pages/selected/selected.component';
import { FriendsComponent } from './modules/pages/friends/friends.component';
import { AlertComponent } from './components/alert/alert.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MoviePageComponent } from './modules/pages/movie-page/movie-page.component'


const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    LoginPageComponent,
    MenuListComponent,
    FooterComponent,
    RegistrationPageComponent,
    UserPageComponent,
    FormComponent,
    FavouriteComponent,
    SelectedComponent,
    FriendsComponent,
    AlertComponent,
    MoviePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [
    AuthGuard,
    INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
