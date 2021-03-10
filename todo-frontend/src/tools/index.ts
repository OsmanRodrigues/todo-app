import { CardDTO, LIST } from '../models';

export const filterListHelper = (
  list: CardDTO[],
  listName: keyof typeof LIST
): CardDTO[] => {
  return list.filter(card => card.list === listName);
};

export const moveCardHelper = (
  cardToMove: CardDTO,
  cardList: CardDTO[],
  currentListIndex: number,
  target: 'previous' | 'next'
): CardDTO[] => {
  const newListIndex =
    target === 'previous' ? currentListIndex - 1 : currentListIndex + 1;
  const cardUpdated = { ...cardToMove, list: LIST[newListIndex] } as CardDTO;
  const filteredList = cardList.filter(card => card.id !== cardToMove.id);
  const newList = [cardUpdated, ...filteredList];

  return newList;
};
