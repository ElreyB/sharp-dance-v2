import {
  AnchorHTMLAttributes,
  forwardRef,
  CSSProperties,
  ReactNode,
} from 'react';
import { NavLink as BaseNavLink, NavLinkProps } from 'react-router-dom';
import styled, { css } from 'styled-components';

// Extend NavLinkProps to include className and style properties
interface CustomNavLinkProps extends Omit<NavLinkProps, 'className' | 'style'> {
  activeClassName?: string;
  activeStyle?: CSSProperties;
  className?: string; // Add className as an optional string
  style?: CSSProperties; // Add style as an optional property
}

// ForwardRef Component for NavLink
const NavLink = forwardRef<HTMLAnchorElement, CustomNavLinkProps>(
  (
    {
      activeClassName = 'link-active',
      activeStyle,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <BaseNavLink
        ref={ref}
        {...props}
        className={
          ({ isActive }) =>
            [
              className, // Include the base className
              isActive ? activeClassName : null, // Add active class if active
            ]
              .filter(Boolean) // Remove falsy values
              .join(' ') // Combine into a single string
        }
        style={({ isActive }) => ({
          ...style, // Apply the provided style
          ...(isActive ? activeStyle : undefined), // Add active styles if active
        })}
      />
    );
  }
);
NavLink.displayName = 'NavLink';

// Link Styles
const linkStyles = css`
  color: ${({ theme: { colors } }) => colors.black};
  text-decoration: none;
  font-weight: normal;

  &.link-active {
    font-weight: bold;
    color: ${({ theme: { colors } }) => colors.favorites.teal};
  }

  &:hover {
    color: ${({ theme: { colors } }) => colors.favorites.teal};
  }

  &:active {
    color: ${({ theme: { colors } }) => colors.favorites.teal};
  }
`;

// Styled Components
const StyledNavLink = styled(NavLink)`
  ${linkStyles}
`;

const Anchor = styled.a`
  ${linkStyles}
`;

// Main A Component
interface AProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
  href?: string;
  target?: string;
  children: ReactNode;
}

export const A = ({
  children,
  href,
  target = '_blank',
  to,
  ...props
}: AProps) => {
  if (href) {
    return (
      <Anchor href={href} target={target} {...props}>
        {children}
      </Anchor>
    );
  }

  return (
    <StyledNavLink {...props} to={to!}>
      {children}
    </StyledNavLink>
  );
};
