import React from 'react';
import styled from 'styled-components';
// import { SocialIcons } from "../SocialIcons";
import { Mailchimp } from '../Mailchimp';
import { A } from '../A';
import {
  ABOUT,
  BIOS,
  CLASSES,
  CONTACT,
  DIANE,
  DONATIONS,
  EVENTS,
  MEDIA,
} from '../../constants';
import { FaRegCopyright } from 'react-icons/fa';

const StyledFooter = styled.footer`
  background-color: black;
`;

const FooterActions = styled.div`
  display: flex;
  color: white;
  padding: 10px 35px;
  flex-wrap: wrap;
  justify-content: center;

  ${({ theme }) => theme.media.mobile`
    display: none;
  `}
`;

const StyledFooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  flex-basis: 25%;

  &:nth-child(4) {
    flex-basis: 100%;
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
  }
`;

const Credit = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: white;
`;

const NavLink = styled(A)`
  flex-basis: 100%;
  color: white;
`;

const LinkHeader = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;

const Img = styled.img`
  width: 50%;
  margin: 20px auto;
  ${({ theme }) => theme.media.mobile`
    width: 100%;
  `}
`;

const peopleLinks = [
  { to: ABOUT, label: 'About' },
  // TODO: better way to show or remove link
  // { to: INTENSIVE, label: "Intensive" },
  { to: DIANE, label: 'Diane Sharp-Nachsin' },
  { to: BIOS, label: 'Meet the SHARP Family' },
];

const informationLinks = [
  { to: MEDIA, label: 'Repertoire' },
  {
    to: EVENTS,
    label: 'Performances',
  },
  { to: CLASSES, label: 'Classes' },
];

const supportLinks = [
  { to: CONTACT, label: 'Contact' },
  { to: DONATIONS, label: 'Donations' },
];

export function Footer() {
  return (
    <StyledFooter>
      <StyledFooterContent>
        <Img src={'/images/sharp-logo-image-up-2.svg'} alt="sharp dance" />
        <Mailchimp />
      </StyledFooterContent>
      <FooterActions>
        <StyledFooterContent>
          <LinkHeader>Company</LinkHeader>
          {peopleLinks.map(({ to, label }) => (
            <NavLink to={to} key={to}>
              {label}
            </NavLink>
          ))}
        </StyledFooterContent>
        <StyledFooterContent>
          <LinkHeader>Information</LinkHeader>
          {informationLinks.map(({ to, label }) => (
            <NavLink to={to} key={to}>
              {label}
            </NavLink>
          ))}
        </StyledFooterContent>
        <StyledFooterContent>
          <LinkHeader>Support</LinkHeader>
          {supportLinks.map(({ to, label }) => (
            <NavLink to={to} key={to}>
              {label}
            </NavLink>
          ))}
        </StyledFooterContent>
      </FooterActions>
      <Credit>
        <p>
          <FaRegCopyright />
          2022 SHARP Dance Company
        </p>
        <p>Website by: Elrey Belmonti</p>
        <p>
          Photos by: Bill Hebert, Rich Ryan, Kylene Cleaver, Diane Sharp, Ed
          Flores, Andrew Bernstein
        </p>
      </Credit>
    </StyledFooter>
  );
}
