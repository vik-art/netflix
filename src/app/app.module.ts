import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared.module';
import { UserModule } from './user.module';

import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';

import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './modules/pages/homepage/homepage.component';
import { LoginPageComponent } from './modules/pages/login-page/login-page.component';
import { MenuListComponent } from './modules/shared/menu-list/menu-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegistrationPageComponent } from './modules/pages/registration-page/registration-page.component';
import { AlertComponent } from './components/alert/alert.component';
import { NotFoundPageComponent } from './modules/pages/not-found-page/not-found-page.component';
import { FormComponent } from './components/form/form.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';


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
    AlertComponent,
    NotFoundPageComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    UserModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
