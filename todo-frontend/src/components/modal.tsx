import * as React from 'react';
import styled, { css } from 'styled-components';
import { overlayStyle } from '@styles';

interface ModalProps {
  visible?: boolean;
  centerAll?: boolean;
}

const allCentred = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div<ModalProps>`
  ${overlayStyle};
  background-color: rgba(0, 0, 0, 0.5);
  ${({ centerAll }) => centerAll && allCentred};
`;
export const Modal: React.FC<ModalProps> = ({
  visible = false,
  children,
  centerAll
}) => {
  return visible ? <Wrapper centerAll={centerAll}>{children}</Wrapper> : null;
};
