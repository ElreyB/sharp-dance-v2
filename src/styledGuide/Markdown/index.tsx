import React from 'react';
import { marked } from 'marked';
import styled from 'styled-components';

const Div = styled.div`
  & > p {
    width: auto !important;
  }
`;

// Props Interface
interface MarkdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: string; // The markdown content must be a string
}

export function Markdown({
  children = '',
  ...props
}: MarkdownProps): JSX.Element {
  return (
    <Div {...props} dangerouslySetInnerHTML={{ __html: marked(children) }} />
  );
}
