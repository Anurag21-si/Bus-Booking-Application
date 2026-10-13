import { Component } from '@angular/core';
import { Bus } from '../../models/bus';
import { BusService } from '../../services/bus';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
 selector:'app-search-bus',
 imports:[FormsModule],
 templateUrl:'./search-bus.html',
 styleUrl:'./search-bus.css'
})
export class SearchBusComponent{

 source:string="";
 destination:string="";

 buses:Bus[]=[];

 constructor(private busService:BusService,
    private router: Router
 ){}

search() {
  console.log("Search clicked"); 

  this.router.navigate(['/search'], {
    queryParams: {
      source: this.source,
      destination: this.destination
    }
  });
}

}