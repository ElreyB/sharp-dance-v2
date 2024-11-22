import * as React from 'react';
import styled from 'styled-components';
import { Image } from '../Image';

// Styled Components
const StyledImage = styled(Image)`
  max-width: 100%;
  text-align: center;

  ${Image.Img} {
    min-width: 300px;

    ${({ theme: { media } }) => media.mobile`
      min-width: 100px;
      max-width: 100%;
    `};
  }
`;

const H1 = styled.h1`
  text-align: center;
  margin-bottom: 10px;
`;

const H2 = styled.h2`
  text-align: center;
`;

const BannerHeader = styled.header``;

// Props Interface
interface ImageSource {
  src: string;
  title?: string;
}

interface BannerProps {
  title?: string;
  subtitle?: string;
  images?: string | ImageSource | string[] | ImageSource[]; // Allow multiple image types
  image?: string; // Alternative image prop for a single string
  alt?: string; // Alt text for the image
  imgCredit?: string; // Credit for the image
  inputCount?: number; // Additional optional input count
  className?: string; // Allow styled-components styling
  pageName?: string;
}

// Helper function to normalize the image source
const getImageSource = (
  images?: string | ImageSource | string[] | ImageSource[],
  fallback?: string
): string | { src: string } | { src: string }[] => {
  if (typeof images === 'string') {
    return images;
  }
  if (Array.isArray(images)) {
    return images.map((img) =>
      typeof img === 'string' ? { src: img } : img
    ) as { src: string }[];
  }
  if (images && typeof images === 'object') {
    return { src: (images as ImageSource).src || fallback || '' };
  }
  return fallback || '';
};

// Component
export const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  images,
  image,
  alt,
  imgCredit,
  inputCount,
  pageName,
  ...props
}) => {
  // Normalize images or image into the expected type
  const imgSrc = Array.isArray(images)
    ? images.map((img) => (typeof img === 'string' ? { src: img } : img))
    : typeof images === 'string'
      ? { src: images }
      : images || (image ? { src: image as string } : undefined);

  return (
    <BannerHeader {...props}>
      <H1>{title}</H1>
      {imgSrc && <StyledImage src={imgSrc} alt={alt} credit={imgCredit} />}
      {subtitle && <H2>{subtitle}</H2>}
    </BannerHeader>
  );
};
