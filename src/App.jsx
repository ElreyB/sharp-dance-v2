import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClasses } from './redux/slices/classScheduleSlice';
import { fetchPage } from './redux/slices/pageSlice';
import { fetchMedia } from './redux/slices/mediaSlice';

const App = () => {
  const dispatch = useDispatch();
  const { classSchedule, status, error } = useSelector(state => state.classSchedule);
  const { page, status: pageStatus, error: pageError } = useSelector(state => state.page);
  const { media, status: mediaStatus, error: mediaError } = useSelector(state => state.media);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchClasses());
    if (pageStatus === 'idle') dispatch(fetchPage("home"));
    if (mediaStatus === 'idle') dispatch(fetchMedia());
  }, [status, pageStatus, dispatch]);

  const statuses = [status, pageStatus, mediaStatus];
  const errors = [error, pageError, mediaError];

  if (statuses.includes('loading')) {
    return <p>Loading...</p>;
  }

  if (errors.some(err => err)) {
    return (
      <p>
        Error: {errors.filter(err => err).join(', ')}
      </p>
    );
  }

  console.log({ media });

  return <div>classedk</div>;
};

export default App;
