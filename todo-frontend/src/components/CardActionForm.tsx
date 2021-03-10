import * as React from 'react';
import { Card } from '@models';
import { Form, Frame, H2 } from './shared';

interface CardActionFormProps {
  onInfosSubmit: () => void;
  onInfosChange: React.ChangeEventHandler<HTMLInputElement>;
  cancelHandler: () => void;
  cardInfos?: Card | Record<string, string>;
}

export const CardActionForm: React.FC<CardActionFormProps> = ({
  onInfosChange,
  cancelHandler,
  onInfosSubmit,
  cardInfos
}) => {
  return (
    <Frame>
      <H2>{cardInfos ? 'Alteração' : 'Novo cartão'}</H2>
      <Form.Container onSubmit={onInfosSubmit}>
        <Form.Label>{'Titulo'}</Form.Label>
        <Form.Input
          onChange={onInfosChange}
          value={cardInfos?.title}
          name="title"
          type="text"
          required={true}
        />

        <Form.Label>{'Conteúdo'}</Form.Label>
        <Form.Input
          type="textarea"
          onChange={onInfosChange}
          value={cardInfos?.content}
          name="content"
        />

        <Form.Button type="submit">
          {cardInfos ? 'Salvar' : 'Criar'}
        </Form.Button>
        <Form.Button onClick={cancelHandler} type="reset">
          {'Cancelar'}
        </Form.Button>
      </Form.Container>
    </Frame>
  );
};
