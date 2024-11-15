interface Dates {
  days: string;
  notes: string;
  month: number;
}

export interface ClassSchedule {
  location: string;
  season: string;
  time: string;
  dates: Dates[];
}
