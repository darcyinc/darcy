import styled from 'styled-components';

interface IButtonProps {
  $bgColor: string;
}

export const BaseButton = styled.button<IButtonProps>`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  appearance: none;
  border: 0;
  border-radius: 2rem;
  background: ${({ $bgColor }) => $bgColor};

  height: 50px;
  width: 100%;

  > span {
    font-size: 1rem;
  }

  > svg {
    fill: #fff;
  }

  &:hover {
    opacity: 0.8;
  }
`;
