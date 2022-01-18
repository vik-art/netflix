import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/common/interfaces/user.interface';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    private route: Router,
    private alert: AlertService
  ) {}
  ngOnInit(): void {
    this.initForm();
    
  }
  initForm(): void {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern("(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*")]]
    })
    this.form.valueChanges.subscribe(() => {})
  }

  
  submit() {
    this.submitted = true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.auth.login(user).subscribe(() => {
      this.alert.success("You have logged in!")
      this.form.reset();
      this.route.navigate(['/user']);
      this.submitted = false;
    }), () => {
      this.submitted = false;
    }
  }
}
