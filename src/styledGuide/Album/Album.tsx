import React from 'react';
import { H2, H3, H4 } from '../Headings';
import { P } from '../P';
import Slides from './Slides';
import { A } from '../A';

// Define the message types
const message = {
  tour: 'Available for tour',
  performance: 'Available for performance',
  both: 'Available for tour or performance',
};

// Utility function to get the appropriate message
function getMessage(
  availableForTour: boolean,
  availableForPerformance: boolean
): string | undefined {
  if (availableForTour && availableForPerformance) {
    return message.both;
  }
  if (availableForTour) {
    return message.tour;
  }
  if (availableForPerformance) {
    return message.performance;
  }
  return undefined;
}

// Define props interfaces for images and videos
interface MediaSource {
  credit?: string;
  image?: string; // Used for images
  imageTitle?: string;
  showTitle?: string;
  url?: string; // Used for videos
  videoTitle?: string;
}

// Define props for the Album component
export interface AlbumProps {
  availableForPerformance?: boolean;
  availableForTour?: boolean;
  content?: string;
  subtitle?: string;
  title?: string;
  link?: string;
  images?: MediaSource[];
  videos?: MediaSource[];
}

export const Album: React.FC<AlbumProps> = ({
  availableForPerformance,
  availableForTour,
  content,
  images = [],
  videos = [],
  subtitle,
  title,
  link,
  ...props
}) => {
  const availabilityMessage = getMessage(
    availableForTour || false,
    availableForPerformance || false
  );

  // Wrapper component to conditionally wrap the content
  const Wrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = link
    ? ({ children, ...rest }) => (
        <A to={link} {...rest}>
          {children}
        </A>
      )
    : ({ children, ...rest }) => <div {...rest}>{children}</div>;

  return (
    <Wrapper {...props}>
      <div>
        {title && <H2>{title}</H2>}
        {availabilityMessage && <H4>({availabilityMessage})</H4>}
        {subtitle && <H3>{subtitle}</H3>}
        {content && <P>{content}</P>}
      </div>
      <Slides
        sources={[...videos, ...images].map((source) => ({
          src: source.image || source.url,
          title: source.showTitle,
          credit: source.credit,
          caption: source.imageTitle || source.videoTitle,
        }))}
      />
    </Wrapper>
  );
};
