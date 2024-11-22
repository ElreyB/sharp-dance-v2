import styled from 'styled-components';
import { A } from '../A';
import { Label } from '../Label';

const StyledLi = styled.li`
  border: 0px solid transparent;
  display: flex;
  flex-flow: row wrap;
  flex-grow: 0;
  flex-shrink: 0;
  width: auto;
  white-space: nowrap;
  padding: 0 ${({ theme }) => theme.spacing.S};

  & a:focus,
  &:hover > a,
  & li:hover a {
    color: ${({ theme }) => theme.colors.blue};
  }

  &,
  & a {
    z-index: 1;
  }
`;

const StyledAnchor = styled(A)`
  flex-grow: 0;
  flex-shrink: 0;
  width: auto;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.white};
`;

interface LiProps extends React.LiHTMLAttributes<HTMLLIElement> {
  to?: string; // Link destination, optional
  label: React.ReactNode; // Label for the item, required
  children?: React.ReactNode; // Nested children (e.g., submenu)
}

export const Li: React.FC<LiProps> = ({ to, label, children, ...props }) => {
  return (
    <StyledLi {...props}>
      {to && <StyledAnchor to={to}>{label}</StyledAnchor>}
      {!to && <Label>{label}</Label>}
      {children}
    </StyledLi>
  );
};
