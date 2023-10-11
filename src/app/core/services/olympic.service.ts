import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<olympic[]>([]);
  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics(): Observable<olympic[]> {
    return this.olympics$.asObservable();
  }

  getOlympicsById(id: number): Observable<olympic | undefined> {
    return this.getOlympics().pipe(
      filter((value) => value.length > 0),
      map((olympics) => {
        return olympics.find((olympic) => olympic.id === id);
      })
    );
  }
}
