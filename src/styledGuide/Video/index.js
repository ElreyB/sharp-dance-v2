import React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components/macro";
import { useWindowResize } from "./useWindowSize";

const MAX_WIDTH = 1200;

const StyledPlayer = styled(ReactPlayer)`
  margin: 0 auto;
  height: initial;
  /* max-width: ${({ theme: { breakpoints } }) => breakpoints.lg}; */
`;
const StyledGrid = styled.div`
  position: relative;
  width: 100vw;
  background-color: black;
`;
export const FullPageVideo = ({ src, className, onReady }) => {
  const ref = React.useRef(null);
  const [height, setHeight] = React.useState("100vh");

  function resize() {
    const { wrapper } = ref.current || {};

    if (wrapper) {
      const iframe = wrapper.querySelector("iframe");

      if (iframe) {
        const iframeSize = iframe.getBoundingClientRect() || {};
        const ratio = 0.5625; // Percentage ratio for 16:9
        const desiredHeight = Math.min(MAX_WIDTH, window.innerWidth) * ratio;

        if (iframeSize.height !== desiredHeight) {
          setHeight(`${desiredHeight}px`);
        }
      }
    }
  }

  useWindowResize(resize);

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

export const Video = React.forwardRef(
  ({ src, controls = false, ...props }, ref) => {
    if (!src) {
      return null;
    }

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
