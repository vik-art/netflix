import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { User } from 'src/app/common/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  submitted: boolean = false;
  user!: User;

  unSubscriber = new Subscription();

  @Output() submitForm = new EventEmitter<User>();
  @Input() title!: string;

  constructor(private formBuilder: FormBuilder, public auth: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.unSubscriber.unsubscribe();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*'),
        ],
      ],
    });
    this.unSubscriber.add(this.form.valueChanges.subscribe(() => {}));
  }

  takeData() {
    this.submitForm.emit(this.form.value);
    this.form.reset();
  }
}
