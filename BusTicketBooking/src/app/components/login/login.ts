import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({

      next: (res: any) => {

        console.log("Login response:", res);

        // ✅ HANDLE DIFFERENT BACKEND RESPONSES
        const userId = res.UserId || res.userId || res.id;

if (!userId) {
  this.errorMsg = "Invalid response from server";
  return;
}

localStorage.removeItem('userId');
localStorage.setItem('userId', String(userId));

        this.authService.setUser(res);

        alert("Login Successful");

        this.router.navigate(['/home']);
      },

      error: () => {
        this.errorMsg = "Login Failed";
      }
    });
  }
}
