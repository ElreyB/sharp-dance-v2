import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store'; // Adjust the path
import { fetchOrganizations } from '../../redux/slices/organizationsSlice';
import { fetchPage } from '../../redux/slices/pageSlice';
import styled from 'styled-components';
import Loading from '../Loading';
import Page from '../../layouts/Page';
import { Markdown } from '../../styledGuide';

const SponserTitle = styled.h2`
  margin-top: 30px;
`;

const StyledFooterContent = styled.div`
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

const About: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: organizations, meta: organizationsMeta } = useSelector(
    (state: RootState) => state.organizations
  );
  const { data: page, meta: pageMeta } = useSelector(
    (state: RootState) => state.page
  );

  useEffect(() => {
    if (organizationsMeta.status === 'idle') {
      dispatch(fetchOrganizations());
    }
    if (pageMeta.status === 'idle') {
      dispatch(fetchPage('about'));
    }
  }, [dispatch, organizationsMeta.status, pageMeta.status]);

  if (organizationsMeta.status === 'loading' || pageMeta.status === 'loading') {
    return <Loading />;
  }

  if (!page || !organizations.length) {
    return <Loading />;
  }

  const { options, ...headerBanner } = page;

  return (
    <Page headerBanner={headerBanner}>
      <Markdown>{options.content}</Markdown>
      <StyledFooterContent>
        <SponserTitle>Affiliates and Donors</SponserTitle>
        <StyledSponsors>
          {organizations.map((org, index) => (
            <StyledImage
              key={index}
              style={{ backgroundImage: `url("${org.logo.src}")` }}
            />
          ))}
        </StyledSponsors>
      </StyledFooterContent>
    </Page>
  );
};

export default About;
