import { Component, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/common/interfaces/user.interface';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnDestroy {
  submitted: boolean = false;
  unSubscriber = new Subscription();

  constructor(
    public auth: AuthService,
    private route: Router,
    private alert: AlertService,
    private database: DatabaseService
  ) {}
  
  
  ngOnDestroy(): void {
      this.unSubscriber.unsubscribe()
  }

  onLoginUser(event: User) {
    this.submitted = true;
    this.unSubscriber.add(
      this.auth.login(event).subscribe(() => {
        this.database.getUsers().subscribe((res) => {
          if (res) {
            let [user] = res;
            localStorage.setItem('id', user.id)
          }
        })
       
      this.alert.success("You have logged in!")
      this.submitted = false;
      this.route.navigate(["/user"]);
    }))
  }
  
}
