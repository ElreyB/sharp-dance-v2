import styled from 'styled-components/macro';
import React from 'react';

// Styled Component
const StyledButton = styled.button`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  border: 1px solid white;
  flex-direction: column;
  flex-grow: 1;
`;

// Props Interface
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; // Ensures the component has children
  role?: 'button' | 'submit' | 'reset'; // Limits role to valid button types
}

// ForwardRef Component
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, role = 'button', ...props }, ref) => {
    return (
      <StyledButton {...props} ref={ref} role={role}>
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button'; // Set display name for better debugging
