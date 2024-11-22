import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Page from '../../layouts/Page';
import { LANDING } from '../../constants';

const StyledLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.blue};
`;

const Error404: React.FC = () => {
  return (
    <Page>
      <h2>404 - Page Not Found</h2>
      <h3>Oops, looks like you went off stage!</h3>
      <StyledLink to={LANDING}>Return to the homepage</StyledLink>
    </Page>
  );
};

export default Error404;
