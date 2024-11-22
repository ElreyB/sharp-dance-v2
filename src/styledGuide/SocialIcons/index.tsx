import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { A } from '../A';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

const IconLink = styled(A)`
  width: 33.33%;
  padding: 0 4px;
  text-align: center;
`;

interface SocialIconsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SocialIcons: React.FC<SocialIconsProps> = (props) => {
  return (
    <Wrapper {...props}>
      <IconLink href="https://www.facebook.com/sharpdance/">
        <FaFacebookF size={24} />
      </IconLink>
      <IconLink href="https://www.instagram.com/sharpdancephilly/">
        <FaInstagram size={24} />
      </IconLink>
      <IconLink href="https://twitter.com/sharpdancephila/">
        <FaTwitter size={24} />
      </IconLink>
    </Wrapper>
  );
};
