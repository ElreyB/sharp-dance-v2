import { useState } from 'react';
import styled from 'styled-components/macro';
import { A } from '../A';
import { LANDING } from '../../constants';
import HamburgerButton from '../HamburgerButton';
import { Nav } from '../Nav';
import SideDrawer from '../SideDrawer';
import { SocialIcons } from '../SocialIcons';

// Styled Components
const Wrapper = styled.div`
  border: 0px solid transparent;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  white-space: nowrap;
  height: 110px;
  background-color: ${({ theme }) => theme.colors.black};
  width: 100%;
  ${({ theme }) => theme.media.phone`
    justify-content: space-between;
  `}
`;

const LogoLink = styled(A)`
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  display: block;
  padding-left: 5px;
`;

const StyledHamburger = styled(HamburgerButton)`
  align-self: center;
  ${({ theme }) => theme.media.desktop`
  display: none
  `}
`;

const StyledNav = styled(Nav)`
  @media (max-width: 1357px) and (min-width: 1184px) {
    font-size: 13px;
  }
  ${({ theme }) => theme.media.mobile`
  display: none
  `}
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding-left: 20px;
  height: 100%;
`;

const HamburgerWrapper = styled.div`
  display: flex;
  padding: 8px 16px;
`;

const Image = styled.img`
  width: 355px;
  ${({ theme }) => theme.media.phone`
    display: none;
  `}
`;

const PhoneLogo = styled(Image)`
  width: 200px;
  display: none;
  ${({ theme }) => theme.media.phone`
  display: initial;
  `}
`;

const StyledSocialIcons = styled(SocialIcons)`
  ${({ theme }) => theme.media.mobile`
  display: none
  `}

  & a {
    color: ${({ theme: { colors } }) => colors.white};
  }
`;

// Header Component
export function Header(): JSX.Element {
  const [show, setShow] = useState(false);

  return (
    <Wrapper>
      <LogoWrapper>
        <LogoLink to={LANDING}>
          <Image
            src={`${process.env.PUBLIC_URL}/images/SHARP-logo.png`}
            width="355px"
            alt="sharp dance"
          />
          <PhoneLogo
            src={`${process.env.PUBLIC_URL}/images/white-logo-name.png`}
            width="355px"
            alt="sharp dance"
            style={{ paddingTop: '10px' }}
          />
        </LogoLink>
      </LogoWrapper>
      <SideDrawer show={show} onClick={() => setShow(!show)} />
      <StyledNav />
      <StyledSocialIcons />
      <HamburgerWrapper>
        <StyledHamburger onClick={() => setShow(!show)} />
      </HamburgerWrapper>
    </Wrapper>
  );
}
