import React from 'react';
import { TiGlobeOutline, TiTicket } from 'react-icons/ti';
import styled from 'styled-components';
import { P } from '../P';
import { IconAnchor } from './IconAnchor';
import { DateTime } from './DateTime';
import { Location } from './Locations';

const Wrapper = styled.div``;

const H3 = styled.h3`
  text-align: center;
  flex: 1;
  ${({ theme: { media } }) => media.mobile`
   font-size: 30px;
  `}
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Description = styled(P)``;

const Footnote = styled(P)`
  font-style: italic;
`;

const Header = styled.header`
  display: flex;
  ${({ theme: { media } }) => media.mobile`
    flex-direction: column;
  `}
`;

interface ScheduleProps {
  address?: string;
  dates?: {
    days: string;
    month: number;
    year: number;
    time?: string;
    notes?: string;
  }[];
  time?: string;
  description?: string;
  footnote?: string;
  location?: string;
  name?: string;
  purchaseUrl?: string;
  website?: string;
  currentShow?: boolean;
}

export const Schedule: React.FC<ScheduleProps> = ({
  address,
  dates = [],
  time,
  description,
  location,
  name,
  purchaseUrl,
  website,
  currentShow,
  footnote,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <Header>
        {name && <H3>{name}</H3>}
        {!currentShow && (
          <IconWrapper>
            <IconAnchor url={purchaseUrl} Icon={TiTicket} />
            <IconAnchor url={website} Icon={TiGlobeOutline} />
          </IconWrapper>
        )}
      </Header>
      {description && <Description>{description}</Description>}
      <Location
        location={location}
        address={address}
        currentShow={currentShow}
      />
      {footnote && <Footnote>{footnote}</Footnote>}
      <DateTime dates={dates} time={time} />
    </Wrapper>
  );
};
