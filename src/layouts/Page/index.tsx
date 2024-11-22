import React from 'react';
import { Banner } from '../../styledGuide';
import styled, { css } from 'styled-components';

const PageContent = styled.div(
  ({ theme }) => css`
    max-width: 1050px;
    margin: 50px auto;
    min-height: 100vh;
    padding: ${theme.spacing.XL};
  `
);

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode; // Ensures children are required
  headerBanner?: Record<string, any>; // Props passed to the `Banner` component
}

const Page: React.FC<PageProps> = ({ children, headerBanner, ...props }) => {
  return (
    <PageContent {...props}>
      {headerBanner && <Banner {...headerBanner} />}
      {children}
    </PageContent>
  );
};

export default Page;
