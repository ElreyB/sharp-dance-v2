import styled from 'styled-components';
import { IconAnchor } from './IconAnchor';
import { TiTicket } from 'react-icons/ti';
import { P } from '../P';

const TicIcon = styled.div`
  display: inline-flex;
`;

const monthName: Record<number, string> = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

export const DateTime = ({
  dates,
  time,
}: {
  dates: {
    days: string;
    month: number;
    year: number;
    time?: string;
    notes?: string;
  }[];
  time?: string;
}): JSX.Element => (
  <>
    {dates.map(({ days, month, time: dateTime, year, notes }, i) => {
      const composedTime = notes?.includes('summer intensive')
        ? '9:30am-4pm'
        : dateTime;

      const composedNotes = notes?.includes('Cabaret Party') ? (
        <TicIcon>
          <p>9:30-11pm Cabaret Party</p>
          <IconAnchor
            url="https://sharp-dance-company.ticketleap.com/saturday-night-post-show-cabaret-party/"
            Icon={TiTicket}
          />
        </TicIcon>
      ) : (
        notes
      );

      return (
        <P key={i}>
          {monthName[month]} {days}, {year} {composedTime || time}{' '}
          {composedNotes}
        </P>
      );
    })}
  </>
);
