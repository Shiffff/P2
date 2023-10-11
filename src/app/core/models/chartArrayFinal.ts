export interface valueTemplate {
  nameOfCountry: string;
  totalParticipations: number;
  medalCount: number;
  athleteCount: number;
  chartArrayFinal: chartArrayFinal[];
}

export interface chartArrayFinal {
  name: string;
  series: chartArray[];
}

export interface chartArray {
  value: number;
  name: string;
}
