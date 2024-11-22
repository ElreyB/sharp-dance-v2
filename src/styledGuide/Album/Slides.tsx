import React from 'react';
import Poster from './Poster';
import Carousel from './Carousel';
// import View from './view';
import styled from 'styled-components';

// Styled components
const PosterWrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;

  ${({ theme: { media } }) => media.mobile`
    justify-content: space-evenly;
  `};
`;

export default function Slides({ sources }: { sources: { src: string }[] }) {
  const [currentModal, setCurrentModal] = React.useState<number | null>(null);

  return (
    <>
      <PosterWrapper className="slides">
        {sources.map(({ src }, i) => (
          <Poster key={i} src={src} onClick={() => setCurrentModal(i)} />
        ))}
      </PosterWrapper>

      {/* {currentModal !== null && <Carousel sources={sources} />} */}
    </>
  );
}
