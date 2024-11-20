import { AnchorHTMLAttributes, forwardRef, CSSProperties } from "react";
import { NavLink as BaseNavLink, NavLinkProps } from "react-router-dom";
import styled, { css } from "styled-components/macro";

interface CustomNavLinkProps extends NavLinkProps {
  activeClassName?: string;
  activeStyle?: CSSProperties;
}

const NavLink = forwardRef<HTMLAnchorElement, CustomNavLinkProps>(
  ({ activeClassName, activeStyle, ...props }, ref) => {
    return (
      <BaseNavLink
        ref={ref}
        {...props}
        className={({ isActive }) =>
          [props.className, isActive ? activeClassName : null]
            .filter(Boolean)
            .join(" ")
        }
        style={({ isActive }) => ({
          ...props.style,
          ...(isActive ? activeStyle : null),
        })}
      />
    );
  }
);

const linkStyles = css`
  color: ${({ theme: {colors} }) => theme.colors.black};
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

const StyledNavLink = styled(NavLink)`
  ${linkStyles}
`;

const Anchor = styled.a`
  ${linkStyles}
`;

interface AProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
  exact?: boolean;
  href?: string;
  target?: string;
  children: ReactNode;
}

export const A = ({
  children,
  exact = true,
  href,
  target = "_blank",
  to,
  ...props
}: AProps) => {
  if (href) {
    return (
      <Anchor {...{ href, target }} {...props}>
        {children}
      </Anchor>
    );
  }

  return (
    <StyledNavLink {...props} to={to!} activeClassName="link-active">
      {children}
    </StyledNavLink>
  );
};
