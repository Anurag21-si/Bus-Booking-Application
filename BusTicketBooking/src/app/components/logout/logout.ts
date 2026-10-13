import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: `<p style="text-align:center;">Processing...</p>`
})
export class LogoutComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      this.auth.logout();              // ✅ clear session
      this.router.navigate(['/']); // ✅ go to login
    } else {
      this.router.navigate(['/home']);     // ❌ cancel → go back home
    }

  }
}