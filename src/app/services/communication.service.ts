import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    const data = this.http.get(
      'https://mocki.io/v1/5642ed73-10f9-4934-a643-03b5b864c238'
    );
    return data;
  }
}
