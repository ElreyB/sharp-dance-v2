import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPress } from './redux/slices/pressSlice';


const App = () => {
  const dispatch = useDispatch();
  const { press, status, error } = useSelector(state => state.press);


  useEffect(() => {
    if (status === 'idle') dispatch(fetchPress());
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

  console.log({ press });

  return <div>classedk</div>;
};

export default App;
