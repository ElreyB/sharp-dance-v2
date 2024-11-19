interface Dates {
  days: string;
  month: number;
  notes: string;
  time: string;
  year: number;
}

export interface Performance {
  address: string;
  dates: Dates[];
  description: string;
  footnote: string;
  location: string;
  name: string;
  pathId: string;
  pricing: string;
  purchaseUrl: string;
  website: string;
}
