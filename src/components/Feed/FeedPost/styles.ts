import { A } from '@solidjs/router';
import { styled } from 'solid-styled-components';

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .post-date {
    display: flex;
    flex-direction: column;
    align-items: center;

    /* TODO: Finish tooltip */
    span.tooltip {
      display: none;
      position: absolute;
      background-color: #606060;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
      font-size: 0.9rem;
      z-index: 1;
      margin-top: -32px;
    }

    span {
      color: #939393;
    }
  }
`;

export const PostHeaderAuthorInfo = styled(A)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  color: initial;

  img {
    border-radius: 50%;
    border: 1px solid #606060;
    height: 50px;
    width: 50px;
  }

  p.name {
    font-size: 1.2rem;
    font-weight: 600;
  }

  p.handle {
    color: #a3a3a3;
  }
`;

export const PostContent = styled(A)`
  color: initial;
  text-decoration: none;
`;

export const PostFooter = styled.div`
  &,
  button {
    display: flex;
    align-items: center;
  }

  justify-content: space-evenly;

  button {
    gap: 5px;
    font-size: 1.2rem;

    &[data-liked='true'] {
      color: red;
    }

    &[data-reposted='true'] {
      color: dodgerblue;
    }

    &:hover {
      &.like {
        color: tomato;
      }

      &.repost {
        color: royalblue;
      }

      &.comment {
        color: #939393;
      }
    }
  }
`;
