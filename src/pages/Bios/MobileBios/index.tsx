import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchResources } from '../../../redux/slices/resourcesSlice';
import { RootState, AppDispatch } from '../../../redux/store';
import { Bio } from '../../../styledGuide';

const H2 = styled.h2`
  text-align: center;
  ${({ theme }) =>
    `margin:${theme.spacing.M} ${theme.spacing.M} ${theme.spacing.XL} ${theme.spacing.M}`};
  color: ${({ theme }) => theme.colors.red};
`;

const Wrapper = styled.div`
  ${({ theme }) => theme.media.desktop`
      // Will update when DesktopBios is finished
      // display: none;
    `}
`;

const getBio = (bio: any) => <Bio {...bio} key={bio.name} />;
const isNotDirector = (bio: { director?: boolean }) => !bio.director;

const Section: React.FC<{ title: string; data: any[] }> = ({ title, data }) => {
  if (!data || data.length === 0) return null;

  return (
    <>
      <H2>{title}</H2>
      {data.map(getBio)}
    </>
  );
};

export default function MobileBios() {
  const dispatch = useDispatch<AppDispatch>();
  const { resources, status } = useSelector(
    (state: RootState) => state.resources
  );

  // Dispatch the fetchResources thunk on mount if status is idle
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchResources());
    }
  }, [dispatch, status]);

  // Organize resources into categories
  const performers = resources.filter((res) => res.role === 'performer');
  const apprentices = resources.filter((res) => res.role === 'apprentice');
  const guestPerformers = resources.filter(
    (res) => res.role === 'guest_performer'
  );
  const staff = resources.filter((res) => res.role === 'staff');
  const board = resources.filter((res) => res.role === 'board');
  const exboard = resources.filter((res) => res.role === 'exboard');

  // Render sections
  return (
    <Wrapper>
      <Section title="Dancers" data={performers} />
      <Section title="Apprentices" data={apprentices} />
      <Section title="Guest Performers" data={guestPerformers} />
      <Section
        title="Staff / Collaborators"
        data={staff.filter(isNotDirector)}
      />
      <Section title="Executive Board Members" data={exboard} />
      <Section title="Board Members" data={board} />
    </Wrapper>
  );
}
