import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  public chartValue: any[] = []
  public totalCountry: number = 0
  public totalJoStat : number = 0
  view: any = [900, 600];
  gradient: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe({
      next: value => {
        if (value) {
          const totalJo: any[] = []
          console.log(value)
          this.totalCountry = value.length
          value.map((item: any) => {
            let count = 0
            item.participations.map((itemPart: any) => {
              totalJo.push(itemPart.year)
                count = count + itemPart.medalsCount
            })
            const finalItem = {"name" : item.country,"value" : count, "extra" : item.id}
            this.chartValue.push(finalItem)
            console.log( this.chartValue)
            let uniqueArr =[...new Set(totalJo)]
            this.totalJoStat = uniqueArr.length
          });
        }
      },
      error: err => console.error(err),
    });
  }

  onSelect(data:any): void {
    this.router.navigateByUrl(`details/${data.extra}`)
  }
}