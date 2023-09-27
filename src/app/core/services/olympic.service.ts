import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import { olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})

export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ : BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  constructor(private http: HttpClient) {}

  loadInitialData()  {
    return this.http.get<olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() :Observable<olympic[]> {
    return this.olympics$.asObservable();
  }
  
  getOlympicsById(id: number) :Observable<olympic> {
    return this.getOlympics().pipe(
      mergeMap(olympics => {
        if(olympics){
          return olympics
        }
        return []
      }),
      filter((olympic: olympic) => {
        return olympic.id === id
      })
    )
  }
}