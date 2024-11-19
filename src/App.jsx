import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPerformances } from './redux/slices/performancesSlice';


const App = () => {
  const dispatch = useDispatch();
  const { performances, status, error } = useSelector(state => state.performances);


  useEffect(() => {
    if (status === 'idle') dispatch(fetchPerformances());
  }, [status,dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return (
      <p>
        Error: {error.mesage}
      </p>
    );
  }

  console.log({ performances });

  return <div>classedk</div>;
};

export default App;
