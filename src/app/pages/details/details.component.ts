import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, partition } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private olympicService: OlympicService, private router: Router) {}
  public olympic$: Observable<any> = of(null);
  public totalParticipations: number = 0
  public nameOfCountry: string = ""
  public totalMedal: number = 0
  public totalAthleteCount: number = 0
  public chartArray: any[] = []
  public view: any = [700, 300];

  goBack() {
    this.router.navigateByUrl(`/`)
  }
  // options
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';

  ngOnInit(): void {    
    const countryId = +this.route.snapshot.params['id'];
    this.olympic$ = this.olympicService.getOlympicsById(countryId);

    this.olympic$.subscribe({
      next: value => {
        if (value) {
          let medalCount = 0
          let athleteCount = 0
          this.nameOfCountry= value.country
          let chartArray :any[] = []
          this.totalParticipations = value.participations.length
          value.participations.map((participation :any) => {
            console.log(participation)
            let participationItem = {
              "value": participation.medalsCount,
              "name": participation.year
            }
            chartArray.push(participationItem)
            if (athleteCount > 0){
              athleteCount = athleteCount + participation.athleteCount
            }else{
              athleteCount = participation.athleteCount
            }
            if (medalCount > 0){
              medalCount = medalCount + participation.medalsCount
            }else{
              medalCount = participation.medalsCount
            }
            
          }) 
          this.totalMedal = medalCount
          this.totalAthleteCount = athleteCount
          console.log(chartArray)
          let customObj: {} = {"name" : value.country, "series" : chartArray} 
          this.chartArray.push(customObj)
          console.log(this.chartArray)
        }}})
  }
}