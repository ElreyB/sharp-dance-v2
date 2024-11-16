import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClasses } from './redux/slices/classScheduleSlice';

const App = () => {
  const dispatch = useDispatch();
  const {classSchedule, status, error} = useSelector((state) => state.classSchedule);

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
