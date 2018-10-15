import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { UserRegisteredComponent } from './user-registered.component';
import { of } from 'rxjs';
import { User } from '../models/user';

describe('UserRegisteredComponent', () => {
  let component: UserRegisteredComponent;
  let fixture: ComponentFixture<UserRegisteredComponent>;

  const user = {
    email: 'john@example.com',
    password: 'test@1234',
    subscription: 'advanced'
  };

  beforeEach(async(() => {
    const activatedRoute = {
      queryParams: of(user)
    };

    TestBed.configureTestingModule({
      declarations: [UserRegisteredComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('user assigned successfully', () => {
    expect(component.user.email).toBe('john@example.com');
  });
});
