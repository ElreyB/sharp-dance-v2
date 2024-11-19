import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResources } from './redux/slices/resourcesSlice';


const App = () => {
  const dispatch = useDispatch();
  const { resources, status, error } = useSelector(state => state.resources);


  useEffect(() => {
    if (status === 'idle') dispatch(fetchResources());
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

  console.log({ resources });

  return <div>classedk</div>;
};

export default App;
