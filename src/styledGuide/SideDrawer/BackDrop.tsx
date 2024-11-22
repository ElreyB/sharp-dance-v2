import React from 'react';
import styled from 'styled-components';

const LayOver = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
`;

interface BackDropProps {
  onClick?: () => void; // Optional onClick handler
}

export const BackDrop: React.FC<BackDropProps> = ({ onClick }) => {
  return <LayOver onClick={onClick} />;
};
