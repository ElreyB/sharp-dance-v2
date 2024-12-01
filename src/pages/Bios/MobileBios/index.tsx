import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchResources } from '../../../redux/slices/resourcesSlice';
import { RootState, AppDispatch } from '../../../redux/store';
import { Bio, Button } from '../../../styledGuide';

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

const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  const resources = useSelector((state: RootState) => state.resources.data);
  const { status } = useSelector((state: RootState) => state.resources.meta);
  const [displayBioName, setDisplayBioName] = useState('Dancers');

  // Dispatch the fetchResources thunk on mount if status is idle
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchResources());
    }
  }, [dispatch, status]);

  console.log({ resources });

  // Organize resources into categories
  const performers = resources?.performers || [];
  const apprentices = resources?.apprentices || [];
  const guestPerformers = resources?.guestPerformers || [];
  const staff = resources?.staff || [];
  const board = resources?.board || [];
  const exboard = resources?.exboard || [];

  // Render sections
  return (
    <Wrapper>
      <TabWrapper>
        <Button type="button" onClick={() => setDisplayBioName('Dancers')}>
          Dancers
        </Button>
        <Button type="button" onClick={() => setDisplayBioName('Apprentices')}>
          Apperentices
        </Button>
        <Button
          type="button"
          onClick={() => setDisplayBioName('Guest Performers')}
        >
          Guest Performers
        </Button>
        <Button
          type="button"
          onClick={() => setDisplayBioName('Staff / Collaborators')}
        >
          Staff / Collaborators
        </Button>
        <Button type="button" onClick={() => setDisplayBioName('Board')}>
          Board Members
        </Button>
      </TabWrapper>
      {displayBioName === 'Dancers' && (
        <Section title="Dancers" data={performers} />
      )}
      {displayBioName === 'Apprentices' && (
        <Section title="Apprentices" data={apprentices} />
      )}
      {displayBioName === 'Guest Performers' && (
        <Section title="Guest Performers" data={guestPerformers} />
      )}
      {displayBioName === 'Staff / Collaborators' && (
        <Section
          title="Staff / Collaborators"
          data={staff.filter(isNotDirector)}
        />
      )}
      {displayBioName === 'Board' && (
        <>
          <Section title="Executive Board Members" data={exboard} />
          <Section title="Board Members" data={board} />
        </>
      )}
    </Wrapper>
  );
}
