import FocusTrap from 'focus-trap-react';
import React from 'react';
import styled from 'styled-components';
import {
  LANDING,
  ABOUT,
  BIOS,
  CLASSES,
  CONTACT,
  DIANE,
  DONATIONS,
  EVENTS,
  MEDIA,
  INTENSIVE,
} from '../../constants';
import { A } from '../A';
import HamburgerButton from '../HamburgerButton';
import { SocialIcons } from '../SocialIcons';
import { BackDrop } from './BackDrop';

const ESCAPE_KEY = 27;

const Nav = styled.nav<{ $show: boolean }>`
  height: 100%;
  overflow: auto;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.red};
  top: 0;
  left: 0;
  z-index: 100;
  transform: ${({ $show }) => ($show ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-out;
  border-right: 1px solid ${({ theme }) => theme.colors.white};
  width: 400px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const NavLink = styled(A)`
  flex-basis: 100%;
  max-width: 100%;
  font-size: 22px;
  padding: ${({ theme }) => `${theme.spacing.XS} ${theme.spacing.M}`};

  ${({ theme }) => theme.media.phone`
       font-size: 28px;
    `}
`;

const StyledSocialIcons = styled(SocialIcons)`
  margin-top: ${({ theme }) => theme.spacing.M};
  margin-bottom: ${({ theme }) => theme.spacing.M};

  & svg {
    width: 30px;
    height: 30px;
  }

  ${({ theme }) => theme.media.phone`
        & svg {
    width: 50px;
    height: 50px;
  }
    `}
`;

const HamburgerWrapper = styled.div`
  padding: 8px 16px;
  margin: 10px 0;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCloseButton = styled(HamburgerButton)`
  margin-top: 12px;
`;

const links = [
  { to: LANDING, label: 'Home' },
  { to: ABOUT, label: 'About' },
  { to: DIANE, label: 'Diane Sharp-Nachsin' },
  { to: BIOS, label: 'Meet the SHARP Family' },
  { to: MEDIA, label: 'Repertoire' },
  // { to: INTENSIVE, label: 'Intensive' },
  { to: EVENTS, label: 'Performances' },
  { to: CLASSES, label: 'Classes' },
  { to: CONTACT, label: 'Contact' },
  { to: DONATIONS, label: 'Donations' },
];

interface SideDrawerProps {
  show: boolean;
  onClick: (close?: boolean) => void;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ show, onClick }) => (
  <>
    {show && <BackDrop onClick={onClick} />}
    <Nav
      $show={show}
      onKeyDown={({ key }) => {
        if (key === 'Escape') {
          onClick();
        }
      }}
    >
      {show && (
        <FocusTrap
          focusTrapOptions={{
            escapeDeactivates: true,
            clickOutsideDeactivates: true,
            initialFocus: 'button',
          }}
          onDeactivate={onClick}
        >
          <Links>
            <HamburgerWrapper>
              <StyledCloseButton onClick={onClick} $closed />
            </HamburgerWrapper>
            {links.map(({ to, label }) => (
              <NavLink to={to} key={to} onClick={() => onClick(false)}>
                {label}
              </NavLink>
            ))}
            <StyledSocialIcons />
          </Links>
        </FocusTrap>
      )}
    </Nav>
  </>
);

export default SideDrawer;
