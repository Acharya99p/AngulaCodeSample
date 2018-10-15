import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserRegistrationFormComponent } from './user-registration-form.component';
import { User } from '../models/user';

describe('UserRegistrationFormComponent', () => {
  let component: UserRegistrationFormComponent;
  let fixture: ComponentFixture<UserRegistrationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [UserRegistrationFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationFormComponent);
    component = fixture.componentInstance;

    // provide user object as input
    component.user = new User('', '', 'advanced');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form is invalid initially', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('Email is invalid', () => {
    expect(component.userForm.get('email').valid).toBeFalsy();
  });

  it('Password is invalid', () => {
    expect(component.userForm.get('password').valid).toBeFalsy();
  });

  it('subscription set as "advanced" by default', () => {
    expect(component.userForm.get('subscription').value).toBe('advanced');
  });

  it('cumulative error messages on top', () => {
    const submitBtn = fixture.debugElement.nativeElement.querySelector(
      '.btn-primary'
    );

    // press submit button without filling anythin
    submitBtn.click();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const firstListEl = fixture.debugElement.nativeElement.querySelector(
        '.error-list li:first-child'
      );

      expect(firstListEl.textContent).toBe('Email is a required field.');
    });
  });

  it('set email field as "john" and validate error caused', () => {
    const inputEl = fixture.debugElement.nativeElement.querySelector(
      '[formControlName="email"]'
    );

    // set email value
    inputEl.value = 'john';
    inputEl.dispatchEvent(new Event('input'));

    expect(component.userForm.get('email').value).toBe(
      'john',
      'Email value is "john"'
    );
    expect(component.userForm.get('email').valid).toBeFalsy();
  });

  it('set email field as "john@example.com" and validate no error', () => {
    const inputEl = fixture.debugElement.nativeElement.querySelector(
      '[formControlName="email"]'
    );

    // set email value
    inputEl.value = 'john@example.com';
    inputEl.dispatchEvent(new Event('input'));

    expect(component.userForm.get('email').value).toBe(
      'john@example.com',
      'Email value is "john@example.com"'
    );
    expect(component.userForm.get('email').valid).toBeTruthy();
  });

  it('set password field and validate errors', () => {
    const inputEl = fixture.debugElement.nativeElement.querySelector(
      '[formControlName="password"]'
    );

    // set password value
    inputEl.value = 'test123';
    inputEl.dispatchEvent(new Event('input'));

    expect(component.userForm.get('password').value).toBe(
      'test123',
      'Password value is "test123"'
    );
    expect(component.userForm.get('password').valid).toBeFalsy();

    // set password value
    inputEl.value = 'test12!';
    inputEl.dispatchEvent(new Event('input'));

    expect(component.userForm.get('password').value).toBe(
      'test12!',
      'Password value is "test12!"'
    );
    expect(component.userForm.get('password').valid).toBeFalsy();

    // set password value
    inputEl.value = 'test123@';
    inputEl.dispatchEvent(new Event('input'));

    expect(component.userForm.get('password').value).toBe(
      'test123@',
      'Password value is "test123@"'
    );
    expect(component.userForm.get('password').valid).toBeTruthy();
  });

  it('clear form after editing', () => {
    const inputEl = fixture.debugElement.nativeElement.querySelector(
      '[formControlName="email"]'
    );

    // set email value
    inputEl.value = 'john';
    inputEl.dispatchEvent(new Event('input'));

    expect(component.userForm.dirty).toBeTruthy();

    const confirmSpy = spyOn(window, 'confirm');
    const clearBtn = fixture.debugElement.nativeElement.querySelector(
      '.btn-outline-secondary'
    );

    // press cancel on confirm box
    confirmSpy.and.returnValue(false);
    clearBtn.click();
    expect(component.userForm.dirty).toBeTruthy();

    // press ok on confirm box
    confirmSpy.and.returnValue(true);
    clearBtn.click();
    expect(component.userForm.dirty).toBeFalsy();
  });

  it('submit form', () => {
    const user = {
      email: 'john@example.com',
      password: 'test@1234',
      subscription: 'advanced'
    };
    component.userForm.setValue(user);
    fixture.detectChanges();

    let userSelected;
    component.userFormSubmitted.subscribe(value => {
      userSelected = value;
    });

    const submitBtn = fixture.debugElement.nativeElement.querySelector(
      '.btn-primary'
    );

    submitBtn.click();

    expect(userSelected).toEqual(user);
  });
});
