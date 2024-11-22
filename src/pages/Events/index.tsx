import React, { useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Schedule } from '../../styledGuide';
import Loading from '../Loading';
import { groupPerformancesByYear, olderYearsFirst } from '../../utils';
import { EVENTS } from '../../constants';
import NoUpcomingEvents from './NoUpcomingEvents';
import Page from '../../layouts/Page';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPerformances } from '../../redux/slices/performancesSlice';
import { RootState, AppDispatch } from '../../redux/store';

const Wrapper = styled.div``;

const H3 = styled.h3`
  text-align: center;
`;

const StyledSchedule = styled(Schedule)`
  margin-bottom: ${({ theme: { spacing } }) => spacing.L};
`;

const renderPerformances = ([year, perfs]: [string, any[]]) =>
  perfs.length > 0 && (
    <Fragment key={year}>
      <H3>{year}</H3>
      {perfs.map((perf, i) => (
        <StyledSchedule {...perf} key={`${year}-${perf.name}-${i}`} />
      ))}
    </Fragment>
  );

export default function Events({
  location,
}: {
  location: { pathname: string };
}) {
  const dispatch = useDispatch<AppDispatch>();
  const performances = useSelector(
    (state: RootState) => state.performances.data
  );
  const status = useSelector(
    (state: RootState) => state.performances.meta.status
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPerformances());
    }
  }, [status, dispatch]);

  const isEventPage = location?.pathname === EVENTS;

  if (status === 'loading') {
    return <Loading />;
  }

  const performanceArr = Object.entries(groupPerformancesByYear(performances))
    .sort(olderYearsFirst)
    .map(renderPerformances);

  return (
    <Page headerBanner={{ title: 'Events' }}>
      <Wrapper>
        {isEventPage && performanceArr.length === 0 ? (
          <NoUpcomingEvents />
        ) : (
          performanceArr
        )}
      </Wrapper>
    </Page>
  );
}
