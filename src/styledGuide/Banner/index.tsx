import * as React from "react";
import styled from "styled-components/macro";
import { Image } from "../Image";

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
  images?: string | string[] | ImageSource | ImageSource[];
  image?: string | string[]; // Alternative image prop
  alt?: string | string[]; // Alt text for the image
  imgCredit?: string; // Credit for the image
  inputCount?: number; // Additional optional input count
  [key: string]: any; // Allow additional props for flexibility
}

export const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  images,
  image,
  alt,
  imgCredit,
  inputCount,
  ...props
}) => {
  const imgSrc = images || image;

  return (
    <BannerHeader {...props}>
      <H1>{title}</H1>
      <StyledImage src={imgSrc} alt={alt} credit={imgCredit} />
      {subtitle && <H2>{subtitle}</H2>}
    </BannerHeader>
  );
};
