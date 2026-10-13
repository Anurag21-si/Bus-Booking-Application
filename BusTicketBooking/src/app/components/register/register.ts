import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  user = {
    name: '',
    email: '',
    phone: '',
    password: ''
  };
  errorMsg: string = '';

  register() {
    if (!this.user.name || !this.user.email || !this.user.phone || !this.user.password) {
      this.errorMsg = 'All fields are required';
      return;
    }

    this.authService.register(this.user).subscribe({
      next: () => {
        alert('User Registered Successfully');
        this.router.navigate(['/']);
      },
      error: () => {
        this.errorMsg = 'Registration failed. Is the backend running?';
      }
    });
  }
}