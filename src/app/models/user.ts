import { EmailValidator } from './interfaces/email-validator';
import { PasswordValidator } from './interfaces/password-validator';
import { Validators, ValidatorFn } from '@angular/forms';

export class User implements EmailValidator, PasswordValidator {
  email: string;
  password: string;
  subscription: string;

  constructor(email, password, subscription) {
    this.email = email;
    this.password = password;
    this.subscription = subscription;
  }

  // validators
  validateEmail: any = () => {
    return Validators.compose([Validators.required, Validators.email]);
  }

  validatePassword: any = () => {
    return (password): { [key: string]: any } | null => {
      if (!password.value) {
        return { required: { value: password.value } };
      }

      const regExp = /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      const test = !regExp.test(password.value);

      return test ? { invalidPassword: { value: password.value } } : null;
    };
  }
}
