import { P } from '../P';

export const Location = ({
  location,
  address,
  currentShow,
}: {
  location?: string;
  address?: string;
  currentShow?: boolean;
}): JSX.Element | null => {
  if (!location && !address) return null;

  return currentShow ? (
    <>
      <P>{location}</P>
      <P>{address}</P>
    </>
  ) : (
    <P>{[location, address].filter((a) => !!a).join(' - ')}</P>
  );
};
