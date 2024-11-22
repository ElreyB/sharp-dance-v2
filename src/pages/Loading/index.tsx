import React from 'react';
import styled, { keyframes } from 'styled-components';

const backgroundColor = 'black';
const lineColor = 'white';
const animationDuration = 3; // seconds
const lineThickness = 3; // px

// Animations
const leftLineAnimation = keyframes`
  0%, 100% {
    transform: translateX(-100%) scaleX(1);
  }
  25%, 75% {
    transform: translateX(-25%) scaleX(1);
  }
  50% {
    transform: translateX(50%) scaleX(0.3);
  }
`;

const rightLineAnimation = keyframes`
  0%, 100% {
    transform: translateX(100%) scaleX(1);
  }
  25%, 75% {
    transform: translateX(25%) scaleX(1);
  }
  50% {
    transform: translateX(-50%) scaleX(0.3);
  }
`;

// Styled Components
const LinesContainer = styled.div`
  position: relative;
  z-index: 100;
  background-color: ${backgroundColor};
  width: 100vw;
  height: 100vh;
  animation-fill-mode: forwards;

  &::before,
  &::after {
    position: absolute;
    display: block;
    top: 50%;
    width: 50%;
    height: ${lineThickness}px;
    content: '';
    background-color: ${lineColor};
  }

  &::before {
    animation: ${leftLineAnimation} linear ${animationDuration}s infinite;
    left: 0;
    transform: translateX(-100%);
  }

  &::after {
    animation: ${rightLineAnimation} linear ${animationDuration}s infinite;
    right: 0;
    transform: translateX(100%);
  }
`;

// Loading Component
const Loading: React.FC = () => {
  return <LinesContainer />;
};

export default Loading;
