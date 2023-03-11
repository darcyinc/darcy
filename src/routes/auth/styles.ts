import { styled } from 'solid-styled-components';

export const PageContainer = styled.div`
  height: 100%;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  height: fit-content;

  // make mobile have a better experience
  @media (max-width: 512px) {
    padding: 0 20px;
    padding-bottom: 60px;
  }
`;

export const SpanDivider = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 50%;
  font-size: 1.3rem;
  font-weight: bolder;
  user-select: none;

  &::before,
  &::after {
    content: '';
    width: 100%;
    height: 2px;
    background-color: #383838;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 70px;

  span {
    font-size: 2rem;
    font-weight: bolder;
    user-select: none;
  }
`;

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 340px;

  @media (max-width: 512px) {
    width: 95%;
  }

  p {
    font-size: 1.5rem;
    font-weight: bolder;
    user-select: none;
  }
`;

export const AuthButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 25px;
  height: 50px;
  width: 100%;
  transition: background-color 0.2s ease-in-out;

  span {
    font-size: 1rem;
    user-select: none;
  }

  &[data-provider='google'] {
    background-color: #fff;

    &:hover {
      background-color: #d6d6d6;
    }

    &:focus {
      outline: 2px solid #5c37ff;
    }

    span {
      color: #000;
    }
  }

  &[data-provider='facebook'] {
    background-color: #1877f2;

    &:hover {
      background-color: #076bee;
    }

    span {
      color: #fff;
    }
  }

  &:hover {
    cursor: pointer;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
`;

export const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 220px;
  width: 100%;
  max-width: 360px;

  input {
    background-color: #2b3446;
    color: #fff;
    padding: 18px 16px;
    border-radius: 7px;
    border: none;
    font-size: 1.05rem;
    height: 50px;
    &::placeholder {
      // 60% opacity
      color: #8b8b8b;
    }
  }

  label {
    color: red;
    font-size: 1.05rem;
    font-weight: bolder;
    margin-left: auto;
    text-align: right;
    // if label is empty, set the height to the default line-height
    height: 1.2rem;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  min-width: 220px;
  width: 100%;
  max-width: 330px;

  span,
  span a {
    color: #7a7b81;
    text-decoration: none;

    & a:hover {
      color: #fff;
      text-decoration: underline;
    }
  }
`;

export const Button = styled.button`
  background-color: #6a17f1;
  border-radius: 30px;
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  text-transform: uppercase;
  padding: 13px 0;
  width: 100%;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #5c37ff;
  }

  &:disabled {
    background-color: #6d6d6d;
    color: #fff;
    cursor: not-allowed;
  }
`;
