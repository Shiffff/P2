import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { participation, participationItemChart, participationItemChartRdy } from 'src/app/core/models/Participation';
import { olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private olympicService: OlympicService, private router: Router) {}
  public olympic$: Observable<olympic> = of({} as olympic);
  public totalParticipations: number = 0
  public nameOfCountry: string = ""
  public totalMedal: number = 0
  public totalAthleteCount: number = 0
  public chartArray: participationItemChartRdy[] = []
  public subscription!: Subscription


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
    this.olympic$ = this.olympicService.getOlympicsById(countryId) as Observable<olympic>;

    this.subscription = this.olympic$.subscribe({
      next: value => {
        if (value) {
          let medalCount :number = 0 
          let athleteCount :number = 0
          this.nameOfCountry= value.country
          let chartArray :participationItemChart[] = []
          this.totalParticipations = value.participations.length
          value.participations.map((participation :participation) => {
            let participationItem = {
              "value": participation.medalsCount,
              "name": participation.year.toString()
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
          this.chartArray.push({"name" : value.country, "series" : chartArray} )
        }}})
        console.log(this.chartArray)
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()

  }
}