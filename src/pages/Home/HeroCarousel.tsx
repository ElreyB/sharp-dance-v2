import React, { useEffect } from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchPage } from '../../redux/slices/pageSlice';

const StyledCarousel = styled(Carousel)`
  display: none;
  ${({ theme }) => theme.media.phone`
      display: initial;
    `}
`;

export default function HeroCarousel() {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors for page data and fetch status
  const page = useSelector((state: RootState) => state.page.data);
  const pageStatus = useSelector((state: RootState) => state.page.meta.status);

  useEffect(() => {
    if (pageStatus === 'idle') {
      dispatch(fetchPage('home')); // Fetch the "home" page data
    }
  }, [dispatch, pageStatus]);

  // Handle loading state
  if (pageStatus === 'loading' || !page || !page.images) {
    return null;
  }

  // Ensure `images` is always an array
  const imagesArray = Array.isArray(page.images) ? page.images : [page.images];

  // Filter images excluding the title "current-show"
  const imageSection = imagesArray.filter(
    ({ title }) => title !== 'current-show'
  );

  return (
    <StyledCarousel
      fade
      interval={2000}
      variant="dark"
      controls={false}
      indicators={false}
    >
      {imageSection.map(({ src, title }, index) => (
        <Carousel.Item key={index}>
          <img alt={title} src={src} className="d-block w-100" />
        </Carousel.Item>
      ))}
    </StyledCarousel>
  );
}
