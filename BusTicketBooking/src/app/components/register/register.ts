import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule , CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent{
  constructor(private router: Router) {}

 user = {
    name: '',
    email: '',
    phone: '',
    password: ''
  };
  errorMsg: string = '';

  register() {
    // only runs if all fields are valid
    if (!this.user.name || !this.user.email || !this.user.phone || !this.user.password) {
      this.errorMsg = 'All fields are required';
      return;
    }

    // your API call here
    console.log('Registering:', this.user);
    alert(" User Registered Successfully")
    this.router.navigate(['/']);
  }

}