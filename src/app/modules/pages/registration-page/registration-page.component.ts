import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/common/interfaces/user.interface';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  submitted: boolean = false;
  logSub!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    private route: Router,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

   ngOnDestroy(): void {
     if (this.logSub) {
     this.logSub.unsubscribe()
   }
   }
  
  initForm():void{
    this.form = this.formBuilder.group({
      email:["", [Validators.required, Validators.email]],
      password:["", [Validators.required, Validators.pattern("(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*")]]
    })
    this.form.valueChanges.subscribe(() => {
      
    })
  }
  submit() {
    if (this.form.invalid) {
      return
    } 
    this.submitted = true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
   this.logSub = this.auth.signUp(user).subscribe(() => {
      this.form.reset();
      this.alert.success('You have signed up!')
      this.route.navigate(['/user']);
      this.submitted = false;
    }), () => {
      this.submitted = false;
    }
  }

}
