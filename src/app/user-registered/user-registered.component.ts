import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-user-registered',
  templateUrl: './user-registered.component.html',
  styleUrls: ['./user-registered.component.css']
})
export class UserRegisteredComponent implements OnInit {
  user: User;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user = new User(params.email, params.password, params.subscription);
    });
  }
}
