import * as React from 'react';
import styled from 'styled-components';
import { buttonRawStyle, ColumnGap } from '@styles';

export const HDisplay = styled.h1`
  text-align: center;
`;

export const H2 = styled.h2`
  text-align: center;
`;

export const VerticalSeparator = styled.hr`
  height: ${ColumnGap.Large};
  border: none;
`;

export const Frame = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.border.radius};
  min-width: 18rem;
  min-height: 18rem;
`;

const FormWrapper = styled.form`
  padding: ${({ theme }) => theme.padding.large};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  min-height: 80%;
`;
const Input = styled.input`
  min-height: 2rem;
`;
const Button = styled.button`
  ${buttonRawStyle}
  &:hover {
    cursor: pointer;
  }
`;
const Label = styled.label``;

export interface FormProps {
  onSubmit: (data: React.FormEvent<HTMLFormElement>) => void;
}
export const Container: React.FC<FormProps> = ({ children, onSubmit }) => {
  const submitHandler: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    onSubmit(event);
  };
  return <FormWrapper onSubmit={submitHandler}>{children}</FormWrapper>;
};

export const Form = {
  Container,
  Button,
  Input,
  Label
};
