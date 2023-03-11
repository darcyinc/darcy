import { styled } from 'solid-styled-components';

export const FeedHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;

  background-color: #3a4256;
  padding: 10px;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  width: 100%;

  > svg {
    font-size: 1.3rem;

    &:hover {
      color: #ccc !important;
      cursor: pointer;
    }
  }
`;

export const SortOptions = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 30px;

  width: 100%;

  svg {
    font-size: 1.2rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  label {
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;
  }

  select {
    padding: 5px;
    border-radius: 5px;
    border: none;
    width: 100%;

    background-color: #191b22;

    &:hover {
      background-color: #2f364a;
      cursor: pointer;
    }

    option {
      background-color: #191b22;
    }
  }
`;
