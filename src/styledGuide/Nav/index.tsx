import React from "react";
import styled from "styled-components/macro";
import {
  // BIOS,
  CLASSES,
  CONTACT,
  DIANE,
  DONATIONS,
  EVENTS,
  MEDIA,
  INTENSIVE,
} from "../../constants";
import { Li } from "./Li";
import { Ul } from "./Ul";

const links = [
  { to: DIANE, label: "Diane Sharp-Nachsin" },
  // { to: BIOS, label: "Meet the SHARP Family" },
  { to: MEDIA, label: "Repertoire" },
  // TODO: better way to show or remove link
  { to: INTENSIVE, label: "Intensive" },
  {
    to: EVENTS,
    label: "Performances",
  },
  { to: CLASSES, label: "Classes" },
  { to: CONTACT, label: "Contact" },
  { to: DONATIONS, label: "Donations" },
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
        {links.map(({ to, label, sub = [] }) => (
          <Li to={to} key={label} label={label}>
            {sub.length > 0 && (
              <SubUl key={`${label}-ul`}>
                {sub.map((li) => (
                  <Li {...li} key={li.label} />
                ))}
              </SubUl>
            )}
          </Li>
        ))}
      </StyledUl>
    </StyledNav>
  );
});
