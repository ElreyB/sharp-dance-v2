import { IconContext } from 'react-icons';
import styled from 'styled-components';
import { A } from '../A';

const StyledA = styled(A)`
  height: 30px;
  width: 30px;
  ${({ theme: { media } }) => media.mobile`
    text-align: center;
    color: black;
    height: 60px;
    width: 60px;
  `}
`;
interface IconAnchorProps {
  Icon: React.ComponentType;
  url?: string;
}

export const IconAnchor: React.FC<IconAnchorProps> = ({ Icon, url }) => {
  if (!url) return null;

  return (
    <IconContext.Provider value={{ size: '100%' }}>
      <StyledA href={url} target="_blank" rel="noopener noreferrer">
        <Icon />
      </StyledA>
    </IconContext.Provider>
  );
};
