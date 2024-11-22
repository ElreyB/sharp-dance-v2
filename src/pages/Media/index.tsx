import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AllPerformances from './All';
import SinglePerformance from './SinglePerformance';
import { isMatch } from './mediaLogic';
import Loading from '../Loading';
import Page from '../../layouts/Page';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchMedia } from '../../redux/slices/mediaSlice';
import { fetchPage } from '../../redux/slices/pageSlice';

interface Media {
  id: string;
  title: string;
  images: { src: string }[];
}

export default function Media(): JSX.Element {
  const { performanceTitle } = useParams<{ performanceTitle?: string }>();
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const media: Media[] =
    useSelector((state: RootState) => state.media.data) || [];
  const mediaStatus = useSelector(
    (state: RootState) => state.media.meta.status
  );

  const page = useSelector((state: RootState) => state.page.data);
  const pageStatus = useSelector((state: RootState) => state.page.meta.status);

  // Fetch media and page data if not already loaded
  useEffect(() => {
    if (mediaStatus === 'idle') {
      dispatch(fetchMedia());
    }
    if (pageStatus === 'idle') {
      dispatch(fetchPage('media')); // Pass the correct pageName to fetchPage
    }
  }, [dispatch, mediaStatus, pageStatus]);

  // Show loading spinner if data is still loading
  if (mediaStatus === 'loading' || pageStatus === 'loading' || !page) {
    return <Loading />;
  }

  const { options, $pageName, ...headerBanner } = page;

  // Check if performanceTitle is undefined
  if (!performanceTitle) {
    return (
      <AllPerformances media={media} headerBanner={headerBanner} title={''} />
    );
  }

  // Find matching performance by title
  const performance = media.find((perf) =>
    isMatch(perf.title, performanceTitle || '')
  );

  // Render SinglePerformance if a match is found
  if (performance) {
    return <SinglePerformance performance={performance} />;
  }

  // Render AllPerformances if no match is found
  return (
    <AllPerformances media={media} headerBanner={headerBanner} title={''} />
  );
}
