import React from 'react';
import styled from 'styled-components';
import { getPerformanceURL } from './mediaLogic';
import { random } from 'lodash';
import { A } from '../../styledGuide';
import Page from '../../layouts/Page';

// Styled Components
const MediaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Border = styled.div<{ photo: { src: string } }>`
  border: 10px solid ${({ theme }) => theme.colors.white};
  background-image: url(${({ photo }) => photo.src});
  height: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const MediaAnchor = styled(A)`
  display: inline-block;
  width: 50%;
  padding: ${({ theme }) => `${theme.spacing.L} ${theme.spacing.S}`};
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const H2 = styled.h2`
  text-align: center;
  color: ${({ theme: { colors } }) => colors.mainTC};
`;

interface Album {
  id: string;
  title: string;
  images: { src: string }[];
}

interface Image {
  src: string;
  alt?: string; // Optional alt text
}

interface MediaProps {
  title: string;
  headerBanner: {
    title: string;
    images: Image[]; // Adjusted to reflect actual type
    imgCredit?: string;
  };
  media: Album[];
}
// Media Order Constant
const mediaOrder = [
  'I am here',
  '669',
  'Seven Windows',
  'The Garden Tour',
  'Roller Coaster',
  'Blind Faith',
];

const Media: React.FC<MediaProps> = ({ headerBanner, media }) => {
  // Filter media albums
  const filterMedia = media.filter((album) => Number(album.id) !== 6);

  // Arrange media albums in a specific order
  const mediaToDisplay = mediaOrder.map((mediaTitle) =>
    filterMedia.find(
      ({ title }) => mediaTitle.toLowerCase() === title.toLowerCase()
    )
  );

  return (
    <Page headerBanner={headerBanner}>
      <MediaContainer>
        {filterMedia.length > 0 ? (
          mediaToDisplay.map((album, i) => {
            if (!album) return null;
            const { title, images } = album;
            const photo = images[random(0, images.length - 1)];

            return (
              <MediaAnchor to={getPerformanceURL(title)} key={title}>
                <H2>{title}</H2>
                <Border photo={photo} />
              </MediaAnchor>
            );
          })
        ) : (
          <H2>No albums available</H2>
        )}
      </MediaContainer>
    </Page>
  );
};

export default Media;
