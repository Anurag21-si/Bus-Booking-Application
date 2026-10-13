import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bus } from '../models/bus';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class BusService {

  private baseUrl = 'http://localhost:8080/buses';

  constructor(private http: HttpClient) {}

  searchBus(source: string, destination: string) {
    return this.http.get<any[]>(
      `${this.baseUrl}/search?source=${source}&destination=${destination}`
    );
  }

  

  getBusById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getAllBuses(): Observable<Bus[]> {
  return this.http.get<Bus[]>(`${this.baseUrl}/all`);
}
getSources() {
  return this.http.get<string[]>('http://localhost:8080/buses/sources');
}

getDestinations() {
  return this.http.get<string[]>('http://localhost:8080/buses/destinations');
}
}