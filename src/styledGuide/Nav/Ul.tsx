import styled from 'styled-components';

const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;

  position: relative;

  & > li > ul {
    display: none;
    position: absolute;
    top: 24px;

    &:before {
      position: absolute;
      content: '';
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-bottom: 1px solid ${({ theme }) => theme.colors.white};
      border-left: 1px solid ${({ theme }) => theme.colors.white};
      border-right: 1px solid ${({ theme }) => theme.colors.white};
      background-color: inherit;
    }
  }

  & > li:hover > ul {
    display: block;
    z-index: 2;
  }
`;

export const Ul: React.FC<React.HTMLAttributes<HTMLUListElement>> = (props) => {
  return <StyledUl {...props} />;
};
