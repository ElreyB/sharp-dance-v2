import styled from 'styled-components';
import { Image } from '../Image';
import { Markdown } from '../Markdown';

// Styled Components
const Wrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.L};
  border: 5px solid black;
  padding: 48px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.media.mobile`
    flex-direction: column;
  `};
`;

const StyledImage = styled(Image)`
  min-width: 267px;
  align-self: center;
`;

const H3 = styled.h3`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 5px;
`;

const Title = styled.span`
  font-style: italic;
`;

const StyledMarkdown = styled(Markdown)`
  margin: 16px 40px;
  ${({ theme }) => theme.media.phone`
     margin: 0 auto;
  `}
  p {
    width: 380px;
  }
`;

// Helper function to find the appropriate image source
const getImageSrc = (images?: ImageSource[]): { image?: string } => {
  let image: string | undefined;
  images?.forEach((img) => {
    if (img.title?.toLowerCase().includes('headshot')) {
      image = img.src;
    } else {
      image = images[0]?.src;
    }
  });
  return { image };
};

// TypeScript Interfaces
interface ImageSource {
  src: string;
  title?: string;
}

interface BioProps {
  name: string;
  role?: string;
  imgCredit?: string;
  bio: string;
  image?: string; // Optional single image source
  images?: ImageSource[]; // Optional array of images
  title: string; // Title or role of the person
  [key: string]: any; // Allow additional props for flexibility
}

export function Bio({
  name,
  role,
  imgCredit,
  bio,
  image,
  images,
  title,
  ...props
}: BioProps) {
  const imgSrc = images || image;

  const { image: imageSrc } = getImageSrc(
    Array.isArray(imgSrc) ? imgSrc : undefined
  );

  return (
    <Wrapper {...props}>
      <H3>
        <Name>{name}</Name>
        <Title>({title})</Title>
      </H3>
      <Content>
        <StyledImage
          src={imageSrc}
          alt={`${name} headshot`}
          credit={imgCredit}
          imageSize="100%"
        />
        <StyledMarkdown>{bio}</StyledMarkdown>
      </Content>
    </Wrapper>
  );
}
