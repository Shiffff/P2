import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { olympic } from 'src/app/core/models/Olympic';
import { participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private olympicService = inject(OlympicService);
  private router = inject(Router);
  public olympics$: Observable<any> = this.olympicService
    .getOlympics()
    .pipe(map(formatData));

  onSelect(id: number): void {
    this.router.navigateByUrl(`details/${id}`);
  }
}

const formatData = (value: olympic[]) => {
  if (value) {
    // init
    let totalCountry = value.length;
    let chartValue: any[] = [];
    let totalJoStat: any = [];
    const totalJo: number[] = [];
    // Caclul
    value.map((item: olympic) => {
      let count = 0;
      item.participations.map((itemPart: participation) => {
        totalJo.push(itemPart.year);
        count = count + itemPart.medalsCount;
      });
      const finalItem = { name: item.country, value: count, extra: item.id };
      chartValue.push(finalItem);
      let uniqueArr = [...new Set(totalJo)];
      totalJoStat = uniqueArr.length;
    });
    return {
      chartValue,
      totalCountry,
      totalJoStat,
    };
  } else {
    return [];
  }
};
