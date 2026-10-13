import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bus } from '../../models/bus';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../../services/bus';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-results',
  imports: [CommonModule],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
})
export class SearchResults implements OnInit{

  buses$!: Observable<Bus[]>;

  constructor(
    private route: ActivatedRoute,
    private busService: BusService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const source = params['source'];
      const destination = params['destination'];

      if (source && destination) {
        this.buses$ = this.busService.searchBus(source, destination);
      }
    });
  }

  selectBus(bus: Bus) {
    
    console.log("Bus ID:", bus.busId);
    this.router.navigate(['/seats', bus.busId]);
  }

}
