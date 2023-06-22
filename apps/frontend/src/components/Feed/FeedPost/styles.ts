import styled from 'styled-components';

import colorToRgba from '@/lib/utils/colorToRgba';

export const Container = styled.article`
  cursor: pointer;
  display: flex;
  gap: 7px;
  padding: 6px 16px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.grayBorder};
  width: 100%;

  @media (max-width: 768px) {
    padding: 6px 9px;
  }

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
    word-break: break-word;
    font-size: 15px;
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

export const PostFooter = styled.footer`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;

  margin-top: 10px;

  > button {
    cursor: pointer;

    display: flex;
    align-items: center;
    gap: 1px;

    background: none;
    border: none;
    color: ${({ theme }) => theme.text.secondary};
    transition: 0s;

    svg {
      font-size: 32px;
      padding: 5px;
      border-radius: 50%;
    }

    &.like {
      &:hover {
        color: ${({ theme }) => theme.colors.red};
        > svg {
          color: ${({ theme }) => theme.colors.red};
          background-color: ${({ theme }) =>
            colorToRgba(theme.colors.red, 0.1)};
        }
      }

      &.liked {
        color: ${({ theme }) => theme.colors.red};
        > svg {
          fill: ${({ theme }) => theme.colors.red};
        }
      }
    }

    &.retweet {
      &:hover {
        color: ${({ theme }) => theme.colors.green};
        > svg {
          color: ${({ theme }) => theme.colors.green};
          background-color: ${({ theme }) =>
            colorToRgba(theme.colors.green, 0.1)};
        }
      }

      &.retweeted {
        color: ${({ theme }) => theme.colors.green};
      }
    }

    &.comment:hover {
      color: ${({ theme }) => theme.colors.blue};
      > svg {
        color: ${({ theme }) => theme.colors.blue};
        background-color: ${({ theme }) => colorToRgba(theme.colors.blue, 0.1)};
      }
    }
  }
`;
