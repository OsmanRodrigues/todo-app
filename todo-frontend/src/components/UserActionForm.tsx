import * as React from 'react';
import { User } from '@models';
import { Form, Frame, H2 } from './shared';

interface UserActionFormProps {
  onInfosSubmit: () => void;
  onInfosChange: React.ChangeEventHandler<HTMLInputElement>;
  cancelHandler: () => void;
  userInfos?: User | Record<string, string>;
}

export const UserActionForm: React.FC<UserActionFormProps> = ({
  onInfosChange,
  onInfosSubmit,
  userInfos
}) => {
  return (
    <Frame>
      <H2>{'Login/Signup'}</H2>
      <Form.Container onSubmit={onInfosSubmit}>
        <Form.Label>{'E-mail'}</Form.Label>
        <Form.Input
          onChange={onInfosChange}
          value={userInfos?.email}
          name="email"
          type="email"
          required={true}
        />

        <Form.Label>{'Senha'}</Form.Label>
        <Form.Input
          type="password"
          onChange={onInfosChange}
          value={userInfos?.password}
          name="password"
          required={true}
        />

        <Form.Button type="submit">{'Entrar'}</Form.Button>
      </Form.Container>
    </Frame>
  );
};
