import React from 'react';
import styled from 'styled-components';
import {
  // BIOS,
  CLASSES,
  CONTACT,
  DIANE,
  DONATIONS,
  EVENTS,
  MEDIA,
  INTENSIVE,
} from '../../constants';
import { Li } from './Li';
import { Ul } from './Ul';

const links: { to: string; label: string; sub: string[] }[] = [
  { to: DIANE, label: 'Diane Sharp-Nachsin', sub: [] },
  // { to: BIOS, label: "Meet the SHARP Family", sub: [] },
  { to: MEDIA, label: 'Repertoire', sub: [] },
  // TODO: better way to show or remove link
  // { to: INTENSIVE, label: 'Intensive', sub: [] },
  {
    to: EVENTS,
    label: 'Performances',
    sub: [],
  },
  { to: CLASSES, label: 'Classes', sub: [] },
  { to: CONTACT, label: 'Contact', sub: [] },
  { to: DONATIONS, label: 'Donations', sub: [] },
];

const StyledNav = styled.nav``;

const StyledUl = styled(Ul)`
  height: 100%;
`;

const SubUl = styled(Ul)`
  border-top: 20px solid transparent;
  background-color: inherit;
  position: relative;
`;

export const Nav = React.forwardRef((props, ref) => {
  return (
    <StyledNav {...props}>
      <StyledUl>
        {links.map(({ to, label }) => (
          <Li to={to} key={label} label={label}>
            {/* {sub.length > 0 && (
              <SubUl key={`${label}-ul`}>
                {sub.map((li) => (
                  <Li {...li} key={li.label} />
                ))}
              </SubUl>
            )} */}
          </Li>
        ))}
      </StyledUl>
    </StyledNav>
  );
});
