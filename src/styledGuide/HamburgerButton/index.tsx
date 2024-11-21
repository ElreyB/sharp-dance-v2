import React from 'react';
import styled, { css } from 'styled-components/macro';
import { Button } from '../Button';

const Line = styled.div`
  width: 50px;
  height: 5px;
  background: ${({ theme }) => theme.colors.white};
`;

interface StyledButtonProps {
  closed?: boolean;
}

const StyledButton = styled(Button)<StyledButtonProps>`
  justify-content: space-around;
  height: 50%;
  width: 30px;
  background: transparent;
  border-color: transparent;
  cursor: pointer;
  padding: 4px;
  margin-right: 30px;

  &:hover > ${Line} {
    background: ${({ theme }) => theme.colors.blue};
  }

  ${({ closed }) =>
    closed &&
    css`
      div:nth-child(1) {
        transform: rotate(-45deg) translate(-4px, 3px);
      }

      div:nth-child(2) {
        opacity: 0;
      }

      div:nth-child(3) {
        transform: rotate(45deg) translate(-4px, -4px);
      }
    `}
`;

// Props interface for the component
interface HamburgerButtonProps {
  onClick?: () => void;
  closed?: boolean;
}

const HamburgerButton = React.forwardRef<
  HTMLButtonElement,
  HamburgerButtonProps
>(({ onClick, closed = false, ...props }, ref) => (
  <StyledButton onClick={onClick} closed={closed} ref={ref} {...props}>
    <Line />
    <Line />
    <Line />
  </StyledButton>
));

HamburgerButton.displayName = 'HamburgerButton';

export default HamburgerButton;
