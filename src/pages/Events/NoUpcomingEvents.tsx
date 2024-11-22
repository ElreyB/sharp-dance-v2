import React from 'react';
import styled from 'styled-components';
import { Image, P } from '../../styledGuide';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  max-width: 1050px;
  width: 100%;
`;

const StyledP = styled(P)`
  margin-top: 16px; /* Add spacing between text and image */
  text-align: center; /* Ensure text is centered */
`;

const StyledImage = styled(Image)`
  max-width: 50%; /* Limit image width for responsive design */
  text-align: center;
`;

export default function NoUpcomingEvents() {
  return (
    <Wrapper>
      <StyledImage
        imageSize="50%"
        alt="puzzle"
        src="https://firebasestorage.googleapis.com/v0/b/sharp-dance.appspot.com/o/site%2Fmedia%2Fpuzzle%2F6.jpg?alt=media&token=e4ebd608-54c1-4aae-a0d3-5db4dd60511b"
      />
      <StyledP>Currently no performances.</StyledP>
    </Wrapper>
  );
}
