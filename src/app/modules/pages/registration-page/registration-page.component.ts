import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/common/interfaces/user.interface';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnDestroy {
  submitted: boolean = false;
  unSubscriber = new Subscription();

  constructor(
    public auth: AuthService,
    private route: Router,
    private alert: AlertService,
    private database: DatabaseService
  ) { }

   ngOnDestroy(): void {
     this.unSubscriber.unsubscribe()
   }
  
  onCreateNewUser(event: User) {
    this.unSubscriber.add(this.auth.signUp(event).subscribe(() => {
      this.submitted = true;
      this.alert.success('You have signed up!')
      this.route.navigate(['/user']);
      const user = {
        email: event.email,
      }
      this.database.createUser(user).subscribe((res) => { 
        localStorage.setItem('id', res.name)
      })
    }))
    }
  }
