import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UserRegisteredComponent } from './user-registered/user-registered.component';

const routes: Routes = [
  {
    path: 'register-user',
    component: RegisterUserComponent
  },
  {
    path: 'user-registered',
    component: UserRegisteredComponent
  },
  {
    path: '',
    redirectTo: '/register-user',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
