import { css, styled } from 'solid-styled-components';

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  background-color: #282c37;

  margin-left: auto;
  margin-right: auto;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  min-height: 100%;
  max-width: 600px;
  width: 100%;
`;

export const MobileFeedHeader = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 5px;

  span {
    font-size: 1.5rem;
    font-weight: bold;
  }

  @media (min-width: 600px) {
    display: none;
  }
`;

export const FeedDivider = styled.div`
  border-bottom: 1px solid #d9d9d9;
  height: 1px;
  width: 100%;
`;

export const loadMore = css`
  color: #fff;
  &:hover {
    color: #ccc;
    cursor: pointer;
  }
`;
