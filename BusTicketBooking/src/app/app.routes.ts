import { Routes } from '@angular/router';

import { BookingHistoryComponent } from './components/booking-history/booking-history';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection';
import { BusListComponent } from './components/bus-list/bus-list';
import { SearchBusComponent } from './components/search-bus/search-bus';
import { BookingComponent } from './components/bookings/bookings';
import { SearchResults } from './components/search-results/search-results';

import { authGuard } from '../guard/auth.guard';

// ✅ FIXED naming (IMPORTANT)
import { Login } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { LogoutComponent } from './components/logout/logout';
import { Aboutus } from './components/aboutus/aboutus';

export const routes: Routes = [

  // 🔓 Public routes
  { path: '', component: Login },
  { path: 'register', component: RegisterComponent },

  // 🔒 Protected routes
  { path: 'home', component: SearchBusComponent},
  { path: 'buses', component: BusListComponent, canActivate: [authGuard] },
  { path: 'search', component: SearchResults, canActivate: [authGuard] },
  { path: 'seats/:id', component: SeatSelectionComponent, canActivate: [authGuard] },
  { path: 'bookings', component: BookingHistoryComponent, canActivate: [authGuard] },
  { path: 'booking/:busId', component: BookingComponent, canActivate: [authGuard] },
  { path: 'logout', component: LogoutComponent },
  {path:'about' , component:Aboutus, canActivate: [authGuard]},


  // ❌ Invalid route → redirect
  { path: '**', redirectTo: 'login' }
];
