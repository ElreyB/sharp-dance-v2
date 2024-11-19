import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuotes } from './redux/slices/quotesSlice';


const App = () => {
  const dispatch = useDispatch();
  const { quotes, status, error } = useSelector(state => state.quotes);


  useEffect(() => {
    if (status === 'idle') dispatch(fetchQuotes());
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

  console.log({ quotes });

  return <div>classedk</div>;
};

export default App;
