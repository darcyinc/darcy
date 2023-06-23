'use client';

import styled from 'styled-components';

export const Container = styled.main`
  display: grid;
  grid-template-columns: 70% auto;

  height: 100vh;
  width: 100%;

  > img {
    border-radius: 0 5px 5px 0;

    object-fit: cover;
    max-height: 100vh;
    width: 100%;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > img {
      display: none;
    }
  }

  @media (max-width: 1200px) {
    grid-template-columns: 55% auto;
  }
`;

export const Form = styled.form`
  animation: fadeIn 1.3s ease-in-out;

  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  margin: auto;
  padding: 20px;
  max-width: 450px;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  > h1 {
    font-weight: bold;
  }

  > label {
    margin-top: 5px;
    width: 100%;

    > input {
      appearance: none;
      background: none;
      border: 1px solid ${({ theme }) => theme.colors.grayBorder};
      border-radius: 1rem;

      outline: 0;
      padding: 10px;

      font-size: 0.95rem;

      width: 100%;

      &::placeholder {
        color: ${({ theme }) => theme.text.secondary};
      }

      &:focus {
        border: 1px solid ${({ theme }) => theme.colors.blue};
      }
    }
  }

  > button[type='submit'] {
    margin: 10px 0;
    text-transform: none;
  }
`;
