import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { RegisterUserComponent } from './register-user.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;

  let RouterSpy: jasmine.SpyObj<any>;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      declarations: [RegisterUserComponent, UserRegistrationFormComponent],
      providers: [{ provide: Router, useValue: routerSpy }]
    }).compileComponents();

    RouterSpy = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate upon creating user', () => {
    const user = {};

    component.createUser(user);

    expect(RouterSpy.navigate.calls.count()).toBe(1);
  });
});
