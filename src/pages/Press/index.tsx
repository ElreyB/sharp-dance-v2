import React from 'react';
import styled from 'styled-components';
import { Quote } from '../../styledGuide';
import Loading from '../Loading';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { random } from 'lodash';

import { A, P } from '../../styledGuide';
import Page from '../../layouts/Page';

// Styled Components
const Anchor = styled(A)`
  display: inline-block;
  font-style: italic;
  width: auto;
  color: black;
`;

const RequestPresKit = styled(P)`
  font-size: 18px;
  margin-bottom: ${({ theme: { spacing } }) => spacing.L};
`;

const ErrorMessage = styled(P)`
  color: red;
  text-align: center;
`;

// Functional Component
const Press: React.FC = () => {
  const page = useSelector((state: RootState) => state.page.data);
  const pageStatus = useSelector((state: RootState) => state.page.meta.status);
  const quotes = useSelector((state: RootState) => state.quotes.data) || [];
  const quotesStatus = useSelector(
    (state: RootState) => state.quotes.meta.status
  );

  if (pageStatus === 'loading' || quotesStatus === 'loading') {
    return <Loading />;
  }

  if (pageStatus === 'failed' || quotesStatus === 'failed') {
    return (
      <ErrorMessage>
        Failed to load page or quotes data. Please try again later.
      </ErrorMessage>
    );
  }

  if (!page) {
    return <Loading />;
  }

  const { options, $pageName, ...headerBanner } = page;

  return (
    <Page headerBanner={headerBanner}>
      <RequestPresKit>
        Click{' '}
        <Anchor title="Email" href={`/press-kit.pdf`}>
          here
        </Anchor>{' '}
        for
        <Anchor title="Email" href={`/press-kit.pdf`}>
          Press Kit.
        </Anchor>
      </RequestPresKit>
      {quotes?.length > 0 && (
        <Quote {...quotes[random(0, quotes.length - 1)]} />
      )}
      {/* Additional Press Item Rendering Logic */}
      {/*
      {press
        .filter((item) => !!item.description)
        .map(({ id, ...props }) => (
          <PressItem {...props} key={id} />
        ))}
      */}
    </Page>
  );
};

export default Press;
