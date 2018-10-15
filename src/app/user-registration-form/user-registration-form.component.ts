import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { isEqual, cloneDeep } from 'lodash';

import { FormService } from '../services/form.service';
import { SimpleForm } from '../models/simple-form';
import { User } from '../models/user';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css']
})
export class UserRegistrationFormComponent implements OnInit {
  // input fields
  @Input()
  user: User;

  // event emitters
  @Output()
  userFormSubmitted = new EventEmitter();

  originalForm: User;

  userForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private form: FormService) {}

  ngOnInit() {
    // get config object from service
    const formConfiguration: SimpleForm = this.form.buildConfig(this.user);

    this.userForm = this.fb.group(formConfiguration);

    // make a clone for comparison on clearing form
    this.originalForm = cloneDeep(this.userForm.value);
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  submitUserForm() {
    this.submitted = true;

    if (this.userForm.valid) {
      // user form submitted
      this.userFormSubmitted.emit(this.userForm.value);
    }
  }

  clearForm() {
    // ask for confirmation before clearing, if form is edited
    if (!isEqual(this.originalForm, this.userForm.value)) {
      const confirmed = confirm(
        'Are you sure you want to discard the changes?'
      );

      if (confirmed) {
        this.submitted = false;
        this.userForm.reset();

        // set advanced subscription
        this.userForm.patchValue({ subscription: 'advanced' });

        // make a copy of original form
        this.originalForm = cloneDeep(this.userForm.value);
      }
    }
  }
}
