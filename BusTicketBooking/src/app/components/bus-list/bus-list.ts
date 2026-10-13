import { Component, OnInit } from '@angular/core';
import { Bus } from '../../models/bus';
import { BusService } from '../../services/bus';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bus-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bus-list.html',
  styleUrl: './bus-list.css'
})
export class BusListComponent implements OnInit {

  buses$!: Observable<Bus[]>;   // ✅ observable

  constructor(
    private busService: BusService,
    private router: Router
  ) {}

  ngOnInit() {
    this.buses$ = this.busService.getAllBuses(); // OR searchBus(...)
  }

  selectBus(busId: number) {
    this.router.navigate(['/seats', busId]);
  }
}