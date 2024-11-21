import React from "react";
import styled from "styled-components/macro";
import { isImageURL } from "./utils";

import { Video } from "../Video";

const StyledView = styled.div`
  line-height: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 90vw;
  position: relative;
  text-align: center;
  overflow: hidden;
`;

// Define the type for each view data object
interface ViewData {
  src: string;
  [key: string]: any; // Allow additional properties for flexibility
}

// Props for the View component
interface ViewProps {
  data: ViewData; // The current view's data
  views: ViewData[]; // Array of all views
  currentIndex: number; // The index of the currently active view
}

const View: React.FC<ViewProps> = ({ data, views, currentIndex }) => {
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    setPlaying(views[currentIndex]?.src === data.src);

    return () => setPlaying(false);
  }, [currentIndex, data, views]);

  return (
    <StyledView>
      {isImageURL(data.src) ? (
        <img src={data.src} alt="" />
      ) : (
        <Video src={data.src} playing={playing} controls />
      )}
    </StyledView>
  );
};

export default View;
