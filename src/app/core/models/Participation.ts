export interface participation {
        id: number,
        year: number,
        city: string,
        medalsCount: number,
        athleteCount: number
}

export interface participationItemChart {
        value: number,
        name: number
}
export interface participationItemChartRdy {
        name: string,
        series: participationItemChart[]
}