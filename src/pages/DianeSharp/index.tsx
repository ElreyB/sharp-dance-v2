import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchResources } from '../../redux/slices/resourcesSlice';
import { fetchPage } from '../../redux/slices/pageSlice';
import { Markdown } from '../../styledGuide';
import Loading from '../Loading';
import Page from '../../layouts/Page';

export default function DianeSharp() {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors for resources and page data
  const resources = useSelector((state: RootState) => state.resources.data);
  const resourcesStatus = useSelector(
    (state: RootState) => state.resources.meta.status
  );

  const page = useSelector((state: RootState) => state.page.data);
  const pageStatus = useSelector((state: RootState) => state.page.meta.status);

  // Fetch resources and page data if not already fetched
  useEffect(() => {
    if (resourcesStatus === 'idle') {
      dispatch(fetchResources());
    }
    if (pageStatus === 'idle') {
      dispatch(fetchPage('diane'));
    }
  }, [resourcesStatus, pageStatus, dispatch]);

  // Show loading spinner while data is being fetched
  if (resourcesStatus === 'loading' || pageStatus === 'loading') {
    return <Loading />;
  }

  // Handle case where resources or page data could not be fetched
  if (!resources || !page) {
    return <div>Failed to load the necessary data.</div>;
  }

  // Find the director from the staff category
  const director = resources.staff?.find(({ director }) => director);

  if (!director) {
    return <div>No director information available.</div>;
  }

  const { bio, images, imgCredit, name } = director;
  const { options, ...headerBanner } = page;

  // Construct additional header information
  const additionalHeader = {
    ...headerBanner,
    title: `${headerBanner.title}: ${name}`,
    images,
    imgCredit,
  };

  return (
    <Page headerBanner={additionalHeader}>
      <Markdown>{bio || 'No biography available.'}</Markdown>
    </Page>
  );
}
