import React, { useEffect, useSelector } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchClasses } from './redux/slices/classScheduleSlice';

const App = () => {
  const dispatch = useAppDispatch();
  const { classSchedule, status, error } = useAppSelector((state) => state);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchClasses());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  console.log({classSchedule})

  return (
    <div>
      classedk
    </div>
  );
};

export default App;
