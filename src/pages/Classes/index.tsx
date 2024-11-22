import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { A, Markdown, H3, Schedule } from '../../styledGuide';
import { FaInstagram } from 'react-icons/fa';
// import Loading from '../Loading';
import Page from '../../layouts/Page';
import { fetchPage } from '../../redux/slices/pageSlice';
import { fetchClasses } from '../../redux/slices/classScheduleSlice';
import { RootState, AppDispatch } from '../../redux/store';

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

const IconLink = styled(A)`
  width: 33.33%;
  padding: 0 4px;
  text-align: center;
`;

const StyledImage = styled.img`
  margin: ${({ theme: { spacing } }) => `${spacing.M} 0`};
  width: 100%;
  height: 500px;
`;

function ClassSchedule({ season, ...upcomingClasses }: { season: string }) {
  return (
    <div>
      {season && <H3>{season}</H3>}
      <Schedule {...upcomingClasses} />
    </div>
  );
}

export default function Classes() {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors for page and classSchedule
  const { data: page, meta: pageMeta } = useSelector(
    (state: RootState) => state.page
  );
  const { data: classSchedule, meta: classScheduleMeta } = useSelector(
    (state: RootState) => state.classSchedule
  );

  useEffect(() => {
    if (pageMeta.status === 'idle') {
      dispatch(fetchPage('classes'));
    }
    if (classScheduleMeta.status === 'idle') {
      dispatch(fetchClasses());
    }
  }, [dispatch, pageMeta.status, classScheduleMeta.status]);

  // Handle loading states
  if (pageMeta.status === 'loading' || classScheduleMeta.status === 'loading') {
    return <div>Loading</div>;
  }

  // Fallback for missing page or class schedule
  if (!page || classSchedule.length === 0) {
    return <div>Loading</div>;
  }

  const { options, $pageName, ...headerBanner } = page;

  return (
    <Page headerBanner={headerBanner}>
      {options.content && <Markdown>{options.content}</Markdown>}
      <IconLink href="https://www.instagram.com/sharpdancephilly/">
        <FaInstagram size={40} />
      </IconLink>
      {/* <A href="https://www.google.com/maps/place/Equilibrium+Dance+Academy,+LLC/@39.9279158,-75.1714042,17z/data=!4m5!3m4!1s0x89c6c60e52a24873:0xaa0c34b5ed568918!8m2!3d39.9279156!4d-75.1692154">
        <StyledImage
          src={ + '/images/sharp-google-maps.png'}
          width="200px"
          height="500px"
          alt="sharp dance"
        />
      </A> */}
      {classSchedule.length > 0 ? (
        <>
          {classSchedule.map((schedule, i) => (
            <ClassSchedule {...schedule} key={i} />
          ))}
        </>
      ) : (
        <H3>{options.noClasses}</H3>
      )}
    </Page>
  );
}
