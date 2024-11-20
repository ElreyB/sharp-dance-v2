import React, { useRef, useState, useEffect, forwardRef } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components/macro";
import { useWindowResize } from "./useWindowSize";

const MAX_WIDTH = 1200;

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

// Component Props
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
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("100vh");

  // Adjust video size based on window resize or iframe ratio
  const resize = () => {
    const wrapper = ref.current;

    if (wrapper) {
      const iframe = wrapper.querySelector("iframe");

      if (iframe) {
        const iframeSize = iframe.getBoundingClientRect();
        const ratio = 9 / 16; // Aspect ratio for 16:9
        const desiredHeight = Math.min(MAX_WIDTH, window.innerWidth) * ratio;

        if (iframeSize.height !== desiredHeight) {
          setHeight(`${desiredHeight}px`);
        }
      }
    }
  };

  // Hook to handle window resize
  useWindowResize(resize);

  // Ensure video resizes on mount
  useEffect(() => {
    resize();
  }, []);

  return (
    <StyledGrid>
      <Video
        muted
        playing
        src={src}
        ref={ref}
        className={className}
        width="100%"
        height={height}
        onPlay={resize}
        onReady={onReady}
        onProgress={resize}
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
  onPlay?: () => void; // Callback when the video starts playing
  onReady?: () => void; // Callback when the video is ready
  onProgress?: () => void; // Callback for progress events
  loop?: boolean; // Should the video loop
}

export const Video = forwardRef<HTMLDivElement, VideoProps>(
  ({ src, controls = false, ...props }, ref) => {
    if (!src) return null;

    return (
      <StyledPlayer
        url={src}
        ref={ref}
        {...props}
        controls={controls}
        config={
          controls
            ? undefined
            : { vimeo: { playerOptions: { background: true } } }
        }
      />
    );
  }
);

Video.displayName = "Video";
