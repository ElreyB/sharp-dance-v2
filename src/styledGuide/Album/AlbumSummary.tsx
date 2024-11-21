import React from "react";
import styled from "styled-components/macro";
import { Album, AlbumProps } from ".";

// Styled component wrapping the Album with additional styles
export const AlbumSummary = styled((props: AlbumProps) => (
  <Album {...props} subtitle="" />
))`
  p,
  .slides {
    max-height: 100px;
    overflow: hidden;
    position: relative;
  }

  p:before,
  .slides:before {
    bottom: 0;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }

  p:before {
    box-shadow: inset 0px -20px 20px 0px rgba(0, 0, 0, 0.75);
  }

  .slides:before {
    box-shadow: inset 0px -5px 5px 0px rgba(0, 0, 0, 0.75);
  }
`;
