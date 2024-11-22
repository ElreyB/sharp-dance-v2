import React from 'react';
import { Album, Banner } from '../../styledGuide';
import { MEDIA } from '../../constants';
import styled from 'styled-components';

import { A } from '../../styledGuide';
import Page from '../../layouts/Page';

// Styled component for the back link
const BackLink = styled(A)`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.M};
`;

// Define the Performance type
interface Performance {
  title: string;
  [key: string]: any; // Add other fields as necessary
}

// Props type for SinglePerformance
interface SinglePerformanceProps {
  performance: Performance;
}

const SinglePerformance: React.FC<SinglePerformanceProps> = ({
  performance,
}) => {
  return (
    <Page>
      <BackLink to={MEDIA}>⮐ Back</BackLink>
      <Banner title={performance.title} />
      <Album {...performance} title="" />
    </Page>
  );
};

export default SinglePerformance;
