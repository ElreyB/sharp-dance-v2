import styled from 'styled-components';

const Wrapper = styled.figure`
  overflow: hidden;
`;

const Img = styled.img<{ size: string }>`
  max-height: 515px;
  ${({ size }) => `max-width: ${size}`};
`;

// Utility function to get the source string
const getSrcString = (
  src: string | { src: string } | { src: string }[] | undefined
): string => {
  if (Array.isArray(src)) {
    return src.length > 0 && typeof src[0]?.src === 'string' ? src[0].src : '';
  } else if (typeof src === 'object' && src?.src) {
    return src.src;
  } else if (typeof src === 'string') {
    return src;
  }
  return '';
};

// Props Interface for the Image Component
interface ImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string | { src: string } | { src: string }[];
  alt?: string;
  credit?: string;
  imageSize?: string;
}

export function Image({ src, alt, credit, imageSize, ...props }: ImageProps) {
  const role = alt ? undefined : 'presentation';

  const srcString = getSrcString(src);

  // Ensure combinedAlt is strictly typed as string | undefined
  const combinedAlt: string | undefined =
    alt ||
    (typeof src === 'object' &&
    !Array.isArray(src) &&
    'title' in src &&
    typeof src.title === 'string'
      ? src.title
      : undefined);

  if (!srcString) return null;

  return (
    <Wrapper {...props}>
      <Image.Img
        src={srcString}
        alt={combinedAlt}
        role={role}
        size={imageSize ?? 'initial'}
      />
      {/* {credit && <Credit>Credit: {credit}</Credit>} */}
    </Wrapper>
  );
}

Image.Img = Img;
