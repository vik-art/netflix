import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './modules/pages/homepage/homepage.component';
import { LoginPageComponent } from './modules/pages/login-page/login-page.component';
import { MenuListComponent } from './modules/shared/menu-list/menu-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegistrationPageComponent } from './modules/pages/registration-page/registration-page.component';
import { AlertComponent } from './components/alert/alert.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SharedModule } from './shared.module';
import { UserModule } from './user.module';
import { AuthService } from './services/auth.service';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    UserModule
  ],
  providers: [
    INTERCEPTOR_PROVIDER,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
