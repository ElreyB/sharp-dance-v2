import React, { useRef, useState, useEffect, forwardRef } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { useWindowResize } from './useWindowSize';

// Constants
const MAX_WIDTH = 1200;
const ASPECT_RATIO = 9 / 16; // 16:9 aspect ratio

// Styled components
const StyledPlayer = styled(ReactPlayer)`
  margin: 0 auto;
  height: initial;
`;

const StyledGrid = styled.div`
  position: relative;
  width: 100vw;
  background-color: black;
`;

// Props for the FullPageVideo component
interface FullPageVideoProps {
  src: string; // Required video source URL
  className?: string; // Optional CSS class for styling
  onReady?: () => void; // Callback when the video is ready
}

export const FullPageVideo: React.FC<FullPageVideoProps> = ({
  src,
  className,
  onReady,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('100vh');

  // Resize logic to adjust the video player based on window size
  const resize = () => {
    if (containerRef.current) {
      const iframe = containerRef.current.querySelector('iframe');

      if (iframe) {
        const desiredHeight =
          Math.min(MAX_WIDTH, window.innerWidth) * ASPECT_RATIO;
        const iframeSize = iframe.getBoundingClientRect();

        if (iframeSize.height !== desiredHeight) {
          setHeight(`${desiredHeight}px`);
        }
      }
    }
  };

  // Hook to handle window resize
  useWindowResize(resize);

  // Ensure video resizes on initial mount
  useEffect(() => {
    resize();
  }, []);

  return (
    <StyledGrid ref={containerRef}>
      <Video
        muted
        playing
        src={src}
        className={className}
        width="100%"
        height={height}
        onReady={onReady}
        loop
      />
    </StyledGrid>
  );
};

// Props for the Video component
interface VideoProps {
  src: string; // Required video source
  controls?: boolean; // Optional controls display
  muted?: boolean; // Should the video be muted
  playing?: boolean; // Should the video autoplay
  className?: string; // Optional CSS class
  width?: string; // Width of the video player
  height?: string; // Height of the video player
  onReady?: () => void; // Callback when the video is ready
  loop?: boolean; // Should the video loop
}

export const Video = forwardRef<HTMLDivElement, VideoProps>(
  ({ src, controls = false, className, ...props }, ref) => {
    if (!src) return null;

    return (
      <StyledPlayer
        url={src}
        className={className}
        controls={controls}
        config={
          controls
            ? undefined
            : { vimeo: { playerOptions: { background: true } } }
        }
        ref={ref as React.RefObject<ReactPlayer>}
        {...props}
      />
    );
  }
);

Video.displayName = 'Video';
