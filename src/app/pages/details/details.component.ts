import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private olympicService = inject(OlympicService);
  private router = inject(Router);
  public olympic$?: Observable<any>;

  ngOnInit(): void {
    let countryId = +this.route.snapshot.params['id'];
    this.olympic$ = this.olympicService.getOlympicsById(countryId).pipe(
      map((value) => {
        if (value) {
          // init

          let nameOfCountry = value.country;
          let medalCount: number = 0;
          let athleteCount: number = 0;
          let chartArray: any[] = [];
          let chartArrayFinal = [];
          let totalParticipations = value.participations.length;

          // Caclul

          value.participations.map((participation: any) => {
            let participationItem = {
              value: participation.medalsCount,
              name: participation.year.toString(),
            };
            chartArray.push(participationItem);
            athleteCount = athleteCount + participation.athleteCount;
            medalCount = medalCount + participation.medalsCount;
          });
          chartArrayFinal.push({ name: value.country, series: chartArray });

          return {
            nameOfCountry,
            totalParticipations,
            medalCount,
            athleteCount,
            chartArrayFinal,
          };
        } else if (value === undefined) {
          this.router.navigateByUrl('/404');
        }
        {
          return [];
        }
      })
    );
  }

  goBack() {
    this.router.navigateByUrl(`/`);
  }
}
