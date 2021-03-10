import * as React from 'react';
import { H2, HDisplay, Kanban, VerticalSeparator } from '@components';
import { Col, Container, Row } from 'react-grid-system';
import { CardDTO, LIST } from '@models';

const CardInfo = {
  id: '510cc268-e2bb-4690-abb0-f49e18e9d55b',
  title: 'My hendrix task one',
  content: 'my today task',
  list: 'DONE'
};

const CardListN = Array.from({ length: 3 }).map((item, index) => ({
  ...CardInfo,
  id: CardInfo.id + index + 'N',
  list: 'NEW'
}));
const CardListT = Array.from({ length: 3 }).map((item, index) => ({
  ...CardInfo,
  id: CardInfo.id + index + 'T',
  list: 'TODO'
}));
const CardListD = Array.from({ length: 3 }).map((item, index) => ({
  ...CardInfo,
  id: CardInfo.id + index + 'D',
  list: 'DOING'
}));
const CardListDn = Array.from({ length: 3 }).map((item, index) => ({
  ...CardInfo,
  id: CardInfo.id + index + 'Dn',
  list: 'DONE'
}));

const generalList = [
  ...CardListD,
  ...CardListDn,
  ...CardListN,
  ...CardListT
] as CardDTO[];

const filterListHelper = (list: CardDTO[], listName: keyof typeof LIST) => {
  return list.filter(card => card.list === listName);
};
const moveCardHelper = (
  cardToMove: CardDTO,
  cardList: CardDTO[],
  currentListIndex: number,
  target: 'previous' | 'next'
) => {
  const newListIndex =
    target === 'previous' ? currentListIndex - 1 : currentListIndex + 1;
  const cardUpdated = { ...cardToMove, list: LIST[newListIndex] } as CardDTO;
  const filteredList = cardList.filter(card => card.id !== cardToMove.id);
  const newList = [cardUpdated, ...filteredList];

  return newList;
};

const App: React.FC = (): JSX.Element => {
  const [cardList, setCardList] = React.useState(generalList);

  const newList = filterListHelper(cardList, 'NEW');
  const todoList = filterListHelper(cardList, 'TODO');
  const doingList = filterListHelper(cardList, 'DOING');
  const doneList = filterListHelper(cardList, 'DONE');

  const handleDelete = (cardToDelete: CardDTO) => {
    if (
      window.confirm(`Confirmar exclusão do cartão "${cardToDelete.title}"?`)
    ) {
      // confirm request
      const newList = cardList.filter(card => card.id !== cardToDelete.id);
      setCardList(newList);
    }
  };
  const handleEdit = (card: CardDTO) => {
    console.log(card);
  };
  const handleToNext = (cardToMove: CardDTO) => {
    const listIndex = LIST[cardToMove.list];
    if (listIndex === 3) {
      return;
    }
    // confirm request
    const newList = moveCardHelper(cardToMove, cardList, listIndex, 'next');

    setCardList(newList);
  };
  const handleToPrevious = (cardToMove: CardDTO) => {
    const listIndex = LIST[cardToMove.list];
    if (listIndex === 0) {
      return;
    }
    // confirm request
    const newList = moveCardHelper(cardToMove, cardList, listIndex, 'previous');

    setCardList(newList);
  };

  return (
    <Container>
      <Row justify="center">
        <Col sm={12}>
          <HDisplay>ToDo App</HDisplay>
        </Col>
      </Row>
      <Kanban.View>
        <Row>
          <Col sm={12} md={6} lg={3}>
            <Kanban.List>
              <H2>New</H2>
              {newList.map(item => (
                <Kanban.Card
                  onDelete={() => handleDelete(item)}
                  onEdit={() => handleEdit(item)}
                  toNext={() => handleToNext(item)}
                  toPrevious={() => handleToPrevious(item)}
                  cardInfos={item}
                  key={item.id}
                />
              ))}
            </Kanban.List>
            <VerticalSeparator />
          </Col>
          <Col sm={12} md={6} lg={3}>
            <Kanban.List>
              <H2>ToDo</H2>
              {todoList.map(item => (
                <Kanban.Card
                  onDelete={() => handleDelete(item)}
                  onEdit={() => handleEdit(item)}
                  toNext={() => handleToNext(item)}
                  toPrevious={() => handleToPrevious(item)}
                  cardInfos={item}
                  key={item.id}
                />
              ))}
            </Kanban.List>
            <VerticalSeparator />
          </Col>
          <Col sm={12} md={6} lg={3}>
            <Kanban.List>
              <H2>Doing</H2>
              {doingList.map(item => (
                <Kanban.Card
                  onDelete={() => handleDelete(item)}
                  onEdit={() => handleEdit(item)}
                  toNext={() => handleToNext(item)}
                  toPrevious={() => handleToPrevious(item)}
                  cardInfos={item}
                  key={item.id}
                />
              ))}
            </Kanban.List>
            <VerticalSeparator />
          </Col>
          <Col sm={12} md={6} lg={3}>
            <Kanban.List>
              <H2>Done!</H2>
              {doneList.map(item => (
                <Kanban.Card
                  onDelete={() => handleDelete(item)}
                  onEdit={() => handleEdit(item)}
                  toNext={() => handleToNext(item)}
                  toPrevious={() => handleToPrevious(item)}
                  cardInfos={item}
                  key={item.id}
                />
              ))}
            </Kanban.List>
          </Col>
        </Row>
      </Kanban.View>
    </Container>
  );
};

export default App;
