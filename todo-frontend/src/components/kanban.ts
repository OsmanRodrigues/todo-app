import { boxShadowStyle, ColumnGap } from '@styles';
import styled from 'styled-components';

const View = styled.main`
  width: 100%;
  padding: ${({ theme: { padding } }) => `${padding.xlarge} 0px`};
`;

const Card = styled.article`
  border-top: ${({ theme }) => `1px solid ${theme.colors.secondary}`};
  border-left: ${({ theme }) => `1px solid ${theme.colors.secondary}`};
  border-radius: ${({ theme }) => theme.border.radius};

  width: 100%;
  min-height: 8rem;

  box-shadow: ${boxShadowStyle};
`;

const List = styled.section`
  width: 100%;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
  padding: ${({ theme: { padding } }) => `${padding.large} ${padding.medium}`};
  gap: ${ColumnGap.Small};

  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.4rem;
  }
  &::-webkit-scrollbar-track {
    border-radius: ${({ theme }) => theme.border.radius};
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: ${({ theme }) => theme.border.radius};
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.acessory};
  }

  h2 {
    position: absolute;
    top: 0;
  }
`;

export const Kanban = {
  Card,
  List,
  View
};
