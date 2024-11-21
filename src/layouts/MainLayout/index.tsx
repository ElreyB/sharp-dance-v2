import React from 'react';
import styled from 'styled-components/macro';
import { Footer } from '../../styledGuide';

const Wrapper = styled.div`
  margin: 0 auto;
  z-index: 0;
`;

const Main = styled.main`
  position: relative;
`;

interface MainLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode; // Ensures children are required
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, ...props }) => {
  return (
    <Wrapper {...props}>
      <Main>{children}</Main>
      <Footer />
    </Wrapper>
  );
};

export default MainLayout;
