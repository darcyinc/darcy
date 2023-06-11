import styled from 'styled-components';

export const Container = styled.article`
  cursor: pointer;
  display: flex;
  gap: 7px;
  padding: 6px 16px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.grayBorder};
  width: 100%;

  > img {
    border-radius: 50%;
    height: 42px;
    width: 42px;
  }

  &:hover,
  &:focus-visible,
  &:has(:focus-visible) {
    background-color: ${({ theme }) => theme.effects.hover};
  }
`;

export const PostHeader = styled.header`
  padding-top: 1px;
  font-size: 15px;

  > a {
    text-decoration: none;
  }

  /* User name */
  p {
    color: ${({ theme }) => theme.text.primary};
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }

  p,
  span {
    display: inline-block;
  }

  /* User handle & post creation time */
  span,
  time {
    color: ${({ theme }) => theme.text.secondary};
  }

  > time::before {
    content: '•';
    margin-right: 4px;
  }
`;

export const PostContent = styled.section`
  margin-top: 1px;

  /* Post text */
  > p {
    font-size: 15px;

    > a,
    > a:visited {
      color: ${({ theme }) => theme.colors.blue};
      text-decoration: none;

      &:hover,
      &:focus-visible {
        text-decoration: underline;
        outline: none;
      }
    }
  }

  > button.media {
    cursor: pointer;
    margin-top: 10px;
    background: none;
    border: none;
    border-radius: 15px;

    max-width: 100%;

    > img,
    > video {
      border-radius: 15px;
      width: 100%;
      height: 100%;
      max-height: 512px;
    }
  }
`;
