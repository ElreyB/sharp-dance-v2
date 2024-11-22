type DateInfo = {
  year: number;
  month: number;
  days: string;
};

type Performance = {
  dates: DateInfo[];
  dateTime?: number;
  isFuture?: boolean;
  hasDate?: boolean;
  name?: string;
  [key: string]: any;
};

type GroupedPerformances = {
  [year: number]: Performance[];
};

export function sortPerformance(
  perfA: Performance,
  perfB: Performance
): number {
  if (perfA.dateTime === undefined) return 1;
  if (perfB.dateTime === undefined) return -1;
  return perfA.dateTime - perfB.dateTime;
}

export function parseDate(date: Partial<DateInfo>): number {
  const parsedDate = {
    day: parseInt((date.days?.match(/([0-9]+)/) || [])[1] || '0', 10),
    month: date.month || 0,
    year: date.year || 0,
  };

  const hasDate = !!(date.year || date.month);

  return hasDate
    ? new Date(
        `${parsedDate.month || 1}/${parsedDate.day || 1}/${parsedDate.year}`
      ).getTime()
    : 0;
}

/**
 * Ensures dates are set and adds information on whether the
 * date is in the future (isFuture), if a date was provided (hasDate)
 * and a parsed time representation of the first date (dateTime)
 */
export function parseSchedule(performance: Performance): Performance {
  const now = new Date(
    parseDate({
      month: new Date().getMonth() + 1,
      days: `${new Date().getDate()}`,
      year: new Date().getFullYear(),
    })
  ).getTime();

  const copy = JSON.parse(JSON.stringify(performance)) as Performance;

  let hasDate = false;
  let dates: DateInfo[] = [{ year: 0, month: 0, days: '0' }];

  if (copy.dates && copy.dates.length > 0) {
    dates = copy.dates;
    hasDate = true;
  }

  const dateTime = parseDate(copy.dates[copy.dates.length - 1]);
  const isFuture = hasDate && dateTime > now;

  return {
    ...copy,
    dates,
    dateTime,
    isFuture,
    hasDate,
  };
}

/**
 * Turns an array of performances into an object grouped by year.
 *
 * Sorts dates within each year from earlier to later
 */
export function groupPerformancesByYear(
  performances: Performance[]
): Record<string, Performance[]> {
  return performances.reduce(
    (acc: Record<string, Performance[]>, performance) => {
      const { year } = performance.dates[0] || {};

      if (!year) return acc;

      if (!acc[year]) {
        acc[year] = [];
      }

      acc[year].push(performance);
      acc[year].sort(sortPerformance);

      return acc;
    },
    {}
  );
}

export function mostRecentFirst(a: Performance, b: Performance): number {
  return (b.dateTime || 0) - (a.dateTime || 0);
}

export function olderFirst(a: Performance, b: Performance): number {
  return (a.dateTime || 0) - (b.dateTime || 0);
}

export function mostRecentYearsFirst([a]: [number], [b]: [number]): number {
  return b - a;
}

export function olderYearsFirst(
  a: [string, Performance[]],
  b: [string, Performance[]]
): number {
  const yearA = parseInt(a[0], 10); // Parse the string key into a number
  const yearB = parseInt(b[0], 10);

  return yearA - yearB; // Compare the years numerically
}

export function getUpcomingPerformances(
  performances: Performance[]
): Performance[] {
  const now = new Date().getTime();
  return performances.filter(
    (perf) => perf.dateTime !== undefined && perf.dateTime > now
  );
}
