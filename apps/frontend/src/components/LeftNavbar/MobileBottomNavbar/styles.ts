import styled from 'styled-components';

import colorToRgba from '@/lib/utils/colorToRgba';

export const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 8px 25px;
  background-color: ${({ theme }) => colorToRgba(theme.background, 0.8)};
  backdrop-filter: blur(5px);
  border-top: 1px solid ${({ theme }) => theme.colors.grayBorder};

  position: fixed;
  bottom: 0;
  left: 0;

  height: 48px;
  width: 100%;

  @media (min-width: 768px) {
    justify-content: space-around;
  }

  > a {
    color: initial;

    &[data-active='true'] svg {
      fill: ${({ theme }) => theme.colors.blue};
    }

    > svg {
      height: 26px;
      width: 26px;
    }
  }
`;
