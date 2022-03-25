import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/common/interfaces/user.interface';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  user!: User;
  @Output() submitForm = new EventEmitter<User>()

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,

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

  takeData() {
    this.submitForm.emit(this.form.value);
    this.form.reset();
  }

  
  
  }
