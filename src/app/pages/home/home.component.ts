import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { olympic } from 'src/app/core/models/Olympic';
import { participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public subscription!: Subscription
  public olympics$: Observable<any> = of(null);
  public chartValue: any[] = []
  public totalCountry: number = 0
  public totalJoStat : number = 0
  public maxLabelLength: number = 20
  gradient: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.subscription = this.olympics$.subscribe({  
      next: value => {
        if (value) {
          const totalJo: number[] = []
          this.totalCountry = value.length
          value.map((item: olympic) => {
            let count = 0
            item.participations.map((itemPart: participation) => {
              totalJo.push(itemPart.year)
                count = count + itemPart.medalsCount
            })
            const finalItem = {"name" : item.country,"value" : count, "extra" : item.id}
            this.chartValue.push(finalItem)
            let uniqueArr =[...new Set(totalJo)]
            this.totalJoStat = uniqueArr.length
          });
        }
      },
      error: err => console.error(err),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()

  }

  onSelect(id:number): void {
    this.router.navigateByUrl(`details/${id}`)
  }
}
