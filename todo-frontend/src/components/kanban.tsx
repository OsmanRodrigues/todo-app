import * as React from 'react';
import styled from 'styled-components';
import {
  FaTrash,
  FaArrowCircleLeft,
  FaArrowAltCircleRight,
  FaEdit
} from 'react-icons/fa';
import {
  boxShadowStyle,
  buttonRawStyle,
  ColumnGap,
  ZIndex
} from '@styles/constants';
import { CardActions, CardDTO } from '@models';

interface CardProps extends CardActions {
  cardInfos: CardDTO;
}

const View = styled.main`
  width: 100%;
  padding: ${({ theme: { padding } }) => `${padding.xlarge} 0px`};
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

const CardWrapper = styled.article`
  border-top: ${({ theme }) => `1px solid ${theme.colors.secondary}`};
  border-left: ${({ theme }) => `1px solid ${theme.colors.secondary}`};
  border-radius: ${({ theme }) => theme.border.radius};

  width: 100%;
  min-height: 8rem;
  padding: ${({ theme }) => theme.padding.medium};

  box-shadow: ${boxShadowStyle};
`;

const CardTitle = styled.h4``;
const CardContent = styled.p``;
const CardActionArea = styled.div`
  position: relative;
  top: 2rem;
  display: flex;
  justify-content: space-between;
`;
const CardActionButton = styled.button`
  ${buttonRawStyle};
  font-size: ${({ theme }) => theme.typography.medium};
  padding: ${({ theme }) => `0px ${theme.padding.small}`};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.typography.large};
    z-index: ${ZIndex.Low};
  }
`;

const Card: React.FC<CardProps> = ({
  cardInfos,
  onDelete,
  onEdit,
  toNext,
  toPrevious
}) => {
  const { title, content } = cardInfos;

  return (
    <CardWrapper>
      <CardTitle>{title}</CardTitle>
      <CardContent>{content}</CardContent>
      <CardActionArea>
        <div>
          <CardActionButton onClick={onDelete}>
            <FaTrash />
          </CardActionButton>
          <CardActionButton onClick={onEdit}>
            <FaEdit />
          </CardActionButton>
        </div>
        <div>
          <CardActionButton onClick={toPrevious}>
            <FaArrowCircleLeft />
          </CardActionButton>
          <CardActionButton onClick={toNext}>
            <FaArrowAltCircleRight />
          </CardActionButton>
        </div>
      </CardActionArea>
    </CardWrapper>
  );
};

export const Kanban = {
  Card,
  List,
  View
};
