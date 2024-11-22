import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Markdown, DonationButton } from '../../styledGuide';
import Loading from '../Loading';
import Page from '../../layouts/Page';

export default function Donations() {
  // Select page data and status from Redux store
  const page = useSelector((state: RootState) => state.page.data);
  const pageStatus = useSelector((state: RootState) => state.page.meta.status);

  // Handle loading state
  if (pageStatus === 'loading') {
    return <Loading />;
  }

  // Handle case where page data might not be available
  if (!page) {
    return <div>Page data not available.</div>;
  }

  const { options, ...headerBanner } = page;

  return (
    <Page headerBanner={headerBanner}>
      <DonationButton />
      <Markdown>{options?.richTextContent || 'No content available.'}</Markdown>
    </Page>
  );
}
