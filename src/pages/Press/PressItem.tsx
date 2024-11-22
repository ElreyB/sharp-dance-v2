import React from 'react';
import styled from 'styled-components';
import { Image } from '../../styledGuide';
import { A, P } from '../../styledGuide';

// Styled Components
const Wrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};
  padding: ${({ theme: { spacing } }) => `${spacing.XL} 0`};
`;

const H3 = styled.h3`
  text-align: center;
`;

const Content = styled.div``;

const AuthorDate = styled(P)`
  text-align: right;
`;

const Logo = styled(Image)`
  text-align: center;
`;

// Utility Function
const makeIntoLink = (
  content: React.ReactNode,
  url?: string
): React.ReactNode => {
  if (url) {
    return <A href={url}>{content}</A>;
  }
  return content;
};

// Props Interface
interface PressItemProps {
  author?: string;
  date?: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
  logo: {
    src: string;
    title: string;
  };
  outlet: string;
  url?: string;
}

// Functional Component
export function PressItem({
  author,
  date,
  description,
  logo,
  outlet,
  url,
}: PressItemProps): JSX.Element {
  return (
    <Wrapper>
      {/* Render outlet name as a link if logo image is not present */}
      {!logo.src && makeIntoLink(<H3>{outlet}</H3>, url)}
      {/* Render logo image */}
      {makeIntoLink(<Logo src={logo.src} alt={logo.title} />, url)}
      <Content>
        {/* Render description if available */}
        {description && <P>{description}</P>}
        {/* Render author and date if either is available */}
        {(author || date) && (
          <AuthorDate>
            - {author} {date}
          </AuthorDate>
        )}
      </Content>
    </Wrapper>
  );
}
