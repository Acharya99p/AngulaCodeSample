import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { defaultSubscription } from '../defaults/user';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  defaultSubscription = defaultSubscription;

  user: User;

  constructor(private router: Router) {}

  ngOnInit() {
    this.user = new User('', '', this.defaultSubscription);
  }

  createUser(user) {
    /*
    ** make a web request from service and upon successful creation of user, navigate to user registered screen
    */

    this.router.navigate(['/user-registered'], {
      queryParams: {
        email: user.email,
        // password should never be sent in url (done so as the requirement says)
        password: user.password,
        subscription: user.subscription
      }
    });
  }
}
