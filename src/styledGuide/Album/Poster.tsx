import React from 'react';
import styled from 'styled-components/macro';
import { isImageURL } from './utils';
// import fallbackVideo from './thumbnail.svg';

const width = 100;
const height = (width * 9) / 16;

// TypeScript hook for fetching thumbnail
const useThumbnail = (src: string): string | undefined => {
  const [thumbnail, setThumbnail] = React.useState<string | undefined>();

  React.useEffect(() => {
    async function fetchThumbnail() {
      try {
        const res = await fetch(`https://noembed.com/embed?url=${src}`);
        const json = await res.json();

        setThumbnail(json.thumbnail_url_with_play_button || json.thumbnail_url);
      } catch {
        console.error('error image'); // Fallback on error
      }
    }

    if (isImageURL(src)) {
      setThumbnail(src);
    } else {
      fetchThumbnail();
    }
  }, [src]);

  return thumbnail;
};

// Styled components
const StyledPoster = styled.div`
  background-color: #eee;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  line-height: 0;
  overflow: hidden;
  position: relative;
  width: ${width}px;
  height: ${height}px;
`;

const FakeButton = styled.div`
  margin: ${({ theme }) => theme.spacing.XS};
  cursor: pointer;
`;

// Poster component props
interface PosterProps {
  src: string; // Source URL for the image/video
  onClick?: () => void; // Optional click handler
}

const Poster: React.FC<PosterProps> = ({ src, onClick }) => {
  const thumbnail = useThumbnail(src);

  return (
    <FakeButton onClick={onClick} role="button" tabIndex={0}>
      {/* <StyledPoster
        style={{
          backgroundImage: `url(${thumbnail})`,
        }}
      /> */}
    </FakeButton>
  );
};

export default Poster;
