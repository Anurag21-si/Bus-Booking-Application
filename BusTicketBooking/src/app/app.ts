import { Component, signal } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { FooterComponent } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('Bus Ticket Booking');

  showNavbar: boolean = false;   // ✅ control UI

  constructor(
    private router: Router,
    private auth: AuthService
  ) {

    // ✅ listen route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {

        const currentUrl = this.router.url;

        // ❌ hide navbar on login/register
        if (currentUrl === '/' || currentUrl === '/register') {
          this.showNavbar = false;
        } else {
          this.showNavbar = true;
        }
      });



    // ✅ redirect if not logged in
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
