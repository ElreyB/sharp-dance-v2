import React from 'react';
import styled, { css } from 'styled-components/macro';
import { P } from '../P';

const Blockquote = styled.blockquote(
  ({ theme }) => css`
    color: ${theme.colors.mainTC};
    line-height: 1.4;
    font-style: italic;
    text-align: center;
    width: 100%;
    margin: 0;
    padding: 22px 0;
  `
);

const Cite = styled.cite``;

const StyledP = styled(P)`
  margin-bottom: 10px;
`;

const Footer = styled.footer<{ align: string }>`
  color: ${({ theme }) => theme.colors.mainTC};
  font-style: normal;
  text-align: ${({ align }) => align};
`;

interface QuoteProps extends React.HTMLAttributes<HTMLElement> {
  source?: string; // Optional source of the quote
  author?: string; // Optional author of the quote
  quote: string; // The quote itself (required)
  alignAuthor?: string; // Alignment of the author text
}

export const Quote: React.FC<QuoteProps> = ({
  source,
  author,
  quote,
  alignAuthor = 'right',
  ...props
}) => {
  if (!quote) {
    return null;
  }

  return (
    <Blockquote {...props}>
      <StyledP>{quote}</StyledP>
      <Footer align={alignAuthor}>
        — {author}, <Cite>{source}</Cite>
      </Footer>
    </Blockquote>
  );
};
