import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchPage } from '../../redux/slices/pageSlice';
import { fetchPerformances } from '../../redux/slices/performancesSlice';
import { fetchOrganizations } from '../../redux/slices/organizationsSlice';
import { FullPageVideo, Schedule } from '../../styledGuide';
import { groupPerformancesByYear, olderYearsFirst } from '../../utils';
import HeroCarousel from './HeroCarousel';
import Loading from '../Loading';
import { ABOUT, BIOS, CLASSES } from '../../constants';
import { NavLink } from 'react-router-dom';

const CustomPage = styled.div``;

const StyledVideo = styled(FullPageVideo)`
  ${({ theme }) => theme.media.phone`
      display: none;
    `}
`;

const Main = styled.main`
  margin: 40px auto;
  text-align: center;
  color: ${({ theme: { colors } }) => colors.black};
  font-weight: 700;
  font-size: 18px;
  line-height: 36.57px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  border: 5px solid black;
  max-width: ${({ theme: { breakpoints } }) => breakpoints.lg};

  ${({ theme }) => theme.media.mobile`
       max-width: 100%;
       border: none;
       padding: 0 10px;
    `}
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-around;
  margin-top: 72px;
  padding: 0;
`;

const Li = styled.li`
  list-style: none;
  display: flex;
`;

const AnchorButton = styled(NavLink)`
  color: ${({ theme: { colors } }) => colors.white};
  background-color: ${({ theme: { colors } }) => colors.black};
  text-decoration: none;
  padding: 5px 10px;
  width: 100%;
  border: 1px solid white;
  text-transform: uppercase;
`;

const StyledA = styled.a`
  color: ${({ theme: { colors } }) => colors.white};
  background-color: ${({ theme: { colors } }) => colors.black};
  text-decoration: none;
  margin-top: 32px;
  padding: 10px 80px;
  width: 100%;
  ${({ theme }) => theme.media.mobile`
      padding: 0;
    `}
`;

const Section = styled.section`
  background-color: ${({ theme: { colors } }) => colors.primaryColors.silver};
  color: ${({ theme: { colors } }) => colors.black};
  font-weight: 700;
  font-size: 16px;
  line-height: 36.57px;
  margin: 40px auto;
  display: flex;
  justify-content: center;
`;

const SponsorTitle = styled.h2`
  text-align: center;
`;

const SponsorSection = styled.div`
  display: flex;
  flex-direction: column;
  align-content: start;
  margin: 0;
  width: 100%;
`;

const StyledImage = styled.div`
  margin: 8px;
  background-size: contain;
  width: 200px;
  height: 200px;
  background-repeat: no-repeat;
  background-position: center;
`;

const StyledSponsors = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ShowMain = styled(Main)`
  border: 0;
  flex-basis: 50%;
`;

const ShowSection = styled(Main)`
  justify-content: space-evenly;
  align-items: center;

  ${({ theme }) => theme.media.desktop`
      flex-direction: row;
    `}
`;

const ImageSection = styled.section`
  display: flex;
  ${({ theme }) => theme.media.mobile`
      flex-wrap: wrap;
      display: none;
    `}
`;

const ImageContainer = styled.div`
  flex: 25%;
  ${({ theme }) => theme.media.mobile`
      flex: 50%;
    `}
`;

const StyledSchedule = styled(Schedule)`
  margin-bottom: ${({ theme: { spacing } }) => spacing.L};
`;

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const page = useSelector((state: RootState) => state.page.data);
  const pageStatus = useSelector((state: RootState) => state.page.meta.status);
  const upcomingPerformances = useSelector(
    (state: RootState) => state.performances.data
  );
  const orgs = useSelector((state: RootState) => state.organizations.data);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (pageStatus === 'idle') {
      dispatch(fetchPage('home'));
      dispatch(fetchPerformances());
      dispatch(fetchOrganizations());
    }
  }, [dispatch, pageStatus]);

  if (pageStatus === 'loading' || !page) {
    return <Loading />;
  }

  const { options } = page;
  const images = Array.isArray(page?.images) ? page.images : [];
  const currentShowImg = images.filter(({ title }) => title === 'current-show');
  const imageSection = images.filter(({ title }) => title !== 'current-show');

  const renderPerformances = ([year, perfs]: [string, any[]]) =>
    perfs.length > 0 && (
      <Fragment key={year}>
        {perfs.map((perf, i) => (
          <Fragment key={`${year}-${perf.name}-${i}`}>
            <StyledSchedule {...perf} currentShow />
            {perf.purchaseUrl && (
              <StyledA
                href={perf.purchaseUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Buy Tickets
              </StyledA>
            )}
          </Fragment>
        ))}
      </Fragment>
    );

  const upcomingShow = Object.entries(
    groupPerformancesByYear(upcomingPerformances)
  )
    .sort(olderYearsFirst)
    .map(renderPerformances)[0];

  return (
    <CustomPage>
      {isLoading ? <Loading /> : null}
      {options.video && (
        <StyledVideo src={options.video} onReady={() => setLoading(false)} />
      )}
      <HeroCarousel />
      <Main>
        <div>
          The mission of SHARP Dance Company is to connect people and
          communities to raw human emotion by presenting story-driven movement
          that is inspired by socially conscious issues.
        </div>
        <Ul>
          <Li>
            <AnchorButton to={ABOUT}>Learn more</AnchorButton>
          </Li>
          <Li>
            <AnchorButton
              to={`/press-kit.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Press Kit
            </AnchorButton>
          </Li>
          <Li>
            <AnchorButton to={BIOS}>SHARP Family</AnchorButton>
          </Li>
        </Ul>
      </Main>
      <ImageSection>
        {imageSection.map(({ src, title }) => (
          <ImageContainer key={title}>
            <img alt={title} src={src} width="100%" />
          </ImageContainer>
        ))}
      </ImageSection>
      <Section>
        <ShowSection>
          <ShowMain>
            <img
              src={currentShowImg[0]?.src}
              width="100%"
              alt={currentShowImg[0]?.title}
            />
          </ShowMain>
          <ShowMain>{upcomingShow}</ShowMain>
        </ShowSection>
      </Section>
      <SponsorSection>
        <SponsorTitle>Affiliates and Donors</SponsorTitle>
        <StyledSponsors>
          {orgs.map((org, i) => (
            <StyledImage
              key={i}
              style={{ backgroundImage: `url("${org.logo.src}")` }}
            />
          ))}
        </StyledSponsors>
      </SponsorSection>

      <Section>
        <ShowSection>
          <ShowMain>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/sharp-dance.appspot.com/o/pages%2F4%2Fimage?alt=media&token=0e35446b-f65e-4ca6-8f33-7c10c074e8a1"
              width="100%"
              alt="sharp dance"
            />
          </ShowMain>
          <ShowMain>
            <p>Open Company Classes</p>
            <p>Mondays from 10am-11am</p>
            <br />
            <p>Equilibrium Dance Academy 1802 S. Broad Street</p>
            <br />
            <AnchorButton to={CLASSES}>See more</AnchorButton>
          </ShowMain>
        </ShowSection>
      </Section>
    </CustomPage>
  );
}
