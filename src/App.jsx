import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrganizations } from './redux/slices/organizationSlice';


const App = () => {
  const dispatch = useDispatch();
  const { organizations, status, error } = useSelector(state => state.organizations);


  useEffect(() => {
    if (status === 'idle') dispatch(fetchOrganizations());
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

  console.log({ organizations });

  return <div>classedk</div>;
};

export default App;
