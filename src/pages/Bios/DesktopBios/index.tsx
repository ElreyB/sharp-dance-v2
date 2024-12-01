import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import Loading from '../../Loading';
import {
  fetchResources,
  ResourcesState,
} from '../../../redux/slices/resourcesSlice';
import { fetchPage } from '../../../redux/slices/pageSlice';
import { RootState, AppDispatch } from '../../../redux/store';
import { Button } from '../../../styledGuide';

const navLabels = ['Dancers', 'Apprentices', 'Guest Performers', 'Staff'];

// Styled Components
const Wrapper = styled.div`
  width: 1200px;
  height: 1200px;
  position: relative;
  border-radius: 50%;
  border: 1px solid teal;
  margin: 50px auto;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.media.mobile`
      display: none;
    `}
`;

const NavResourcesDiv = styled.div<{ $isFront: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  position: absolute;
  width: 400px;
  height: 300px;
  visibility: ${({ $isFront }) => (!$isFront ? 'visible' : 'hidden')};
`;

const NavButton = styled(Button)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.mainTC};

  :hover {
    color: ${({ theme }) => theme.colors.favorites.teal};
  }
  :focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.favorites.teal};
  }
`;

const AvatarImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: black;
  transition:
    transform 1s,
    opacity 1s;
`;

const ImageButton = styled.button`
  width: 150px;
  height: 150px;
  border: none;
  position: absolute;
  border-radius: 50%;
  transition:
    transform 1s,
    background-color 1s;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.favorites.teal};
  }
`;

const InfoDiv = styled.div<{ $isFront: boolean }>`
  width: 1200px;
  height: 1200px;
  border-radius: 50%;
  margin: 50px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  visibility: ${({ $isFront }) => (!$isFront ? 'hidden' : 'visible')};

  ${({ theme }) => theme.media.mobile`
      display: none;
    `}
`;

const Section = styled.section`
  width: 50%;
  height: 100%;
  background-color: black;
  color: white;

  :first-of-type {
    border-radius: 100% 30% 30% 100%;
  }

  :last-of-type {
    cursor: pointer;
    border-radius: 30% 100% 100% 30%;
    :hover {
      opacity: 0.5;
    }
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: inherit;
  color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 50px;
  border-radius: 100% 0 0 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 0 100% 100% 0;
  object-fit: cover;
`;

// Utility Function for Image Source
const getImageSource = (data: any) => {
  if (data.images) {
    const headshot = data.images.find((img: any) =>
      img.title.includes('headshot')
    );
    return {
      image: headshot?.src || data.images[0]?.src,
      // title: headshot?.title || data.images[0]?.title,
    };
  }
  return { image: data.image?.src, title: data.image?.title };
};

export default function DesktopBios() {
  const dispatch = useDispatch<AppDispatch>();
  const resources = useSelector((state: RootState) => state.resources.data);

  const performers = resources?.performers || [];
  const apprentices = resources?.apprentices || [];
  const guestPerformers = resources?.guestPerformers || [];
  const staff = resources?.staff || [];
  const resourcesStatus = useSelector(
    (state: RootState) => state.resources.meta.status
  );
  const page = useSelector((state: RootState) => state.page.data);

  const [selectedRole, setSelectedRole] = useState('performers');
  const [selectedResources, setSelectedResources] = useState(performers || []);
  const [selectedInfo, setSelectedInfo] = useState<any>(null);

  // Refs to store image/button elements
  const imageRefs = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    if (resourcesStatus === 'idle') {
      dispatch(fetchResources());
    }
    if (!page) {
      dispatch(fetchPage('bios'));
    }
  }, [dispatch, resourcesStatus, page]);

  useLayoutEffect(() => {
    if (!selectedInfo && imageRefs.current.length > 0) {
      const circle = document.getElementById('box');
      if (!circle) return;

      const imgs = imageRefs.current;

      const total = imgs.length;

      // Get circle diameter and radius
      const diam = parseFloat(
        window.getComputedStyle(circle).getPropertyValue('width')
      );
      const radius = diam / 2;

      // Get the width of the images
      const imgW = imgs[0].getBoundingClientRect().width;

      // Calculate the radius of the inner circle
      const radius2 = radius - imgW;

      const angleIncrement = (2 * Math.PI) / total;

      for (let i = 0; i < total; i++) {
        const img = imgs[i];

        // Calculate the current angle
        const angle = Math.PI / 2 - i * angleIncrement;

        // Calculate positions
        const left = radius - imgW / 2 + radius2 * Math.cos(angle);
        const top = radius - imgW / 2 - radius2 * Math.sin(angle);

        // Apply positions
        img.style.left = `${Math.round(left)}px`;
        img.style.top = `${Math.round(top)}px`;
      }
    }
  }, [selectedInfo, selectedResources]);

  useEffect(() => {
    switch (selectedRole) {
      case 'performers':
        setSelectedResources(performers || []);
        break;
      case 'apprentices':
        setSelectedResources(apprentices || []);
        break;
      case 'guest performers':
        setSelectedResources(guestPerformers || []);
        break;
      case 'staff':
        setSelectedResources(staff || []);
        break;
      default:
        setSelectedResources(performers || []);
    }
  }, [selectedRole, performers, apprentices, guestPerformers, staff]);

  if (resourcesStatus === 'loading' || !page) {
    return <Loading />;
  }

  const { image, title } = getImageSource(selectedInfo || {});

  return (
    <Wrapper id="box">
      <InfoDiv $isFront={!!selectedInfo} onClick={() => setSelectedInfo(null)}>
        <Section>
          <ContentWrapper>
            <span>{selectedInfo?.name}</span>
            <span>{selectedInfo?.title}</span>
            {selectedInfo?.bio}
          </ContentWrapper>
        </Section>
        <Section>
          <Image src={image} alt={title} />
        </Section>
      </InfoDiv>

      <NavResourcesDiv $isFront={!!selectedInfo}>
        {navLabels.map((label, index) => (
          <NavButton
            key={index}
            onClick={() => setSelectedRole(label.toLowerCase())}
          >
            <span>{label}</span>
          </NavButton>
        ))}
      </NavResourcesDiv>
      {!selectedInfo &&
        selectedResources.map((resource: any, index: number) => {
          const { image, title } = getImageSource(resource);
          return (
            <ImageButton
              ref={(el) => {
                if (el) imageRefs.current[index] = el;
              }}
              type="button"
              data-div="test"
              key={index}
              onClick={() => setSelectedInfo(resource)}
            >
              <AvatarImage src={image} alt={title} />
            </ImageButton>
          );
        })}
    </Wrapper>
  );
}
