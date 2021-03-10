import * as React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { FaPlus } from 'react-icons/fa';
import {
  CardActionForm,
  H2,
  HDisplay,
  Kanban,
  Modal,
  UserActionForm,
  VerticalSeparator
} from '@components';
import { Card, CardDTO, LIST, User } from '@models';
import { useForm } from '@hooks/use-form';
import { api } from '@data/api';
import { useLocalState } from '@hooks/use-local-state';
import { filterListHelper, moveCardHelper } from '@tools';

const App: React.FC = (): JSX.Element => {
  const { updateLocalState, getLocalState } = useLocalState<{
    token: string | null;
  }>({
    token: null
  });
  const [showUserModal, setShowUserModal] = React.useState(false);
  const [showFormModal, setShowFormModal] = React.useState(false);

  const {
    value: userInfos,
    handleChange: onUserInfosChange,
    handleSetValue: handleSetUserValue
  } = useForm<User>();
  const {
    value: cardInfos,
    handleChange: onCardInfosChange,
    handleSetValue: handleSetCardValue
  } = useForm<Card>();

  const [cardList, setCardList] = React.useState<CardDTO[]>([]);

  const newList = filterListHelper(cardList, 'NEW');
  const todoList = filterListHelper(cardList, 'TODO');
  const doingList = filterListHelper(cardList, 'DOING');
  const doneList = filterListHelper(cardList, 'DONE');

  const handleCancelAction = () => {
    setShowUserModal(false);
    setShowFormModal(false);

    handleSetUserValue(null);
    handleSetCardValue(null);
  };

  const handleLoginSignupSubmit = () => {
    api
      .login(userInfos)
      .then(response => {
        console.log(response);
        updateLocalState({ token: response.data.token }, 'token');
        handleCancelAction();
      })
      .catch(err => {
        console.log('Usu');
        console.log(err.code);
        api
          .signup(userInfos)
          .then(response => {
            updateLocalState({ token: response.data.token }, 'token');
            handleCancelAction();
          })
          .catch(err => {
            console.log(err.message);
            window.alert(
              `Não foi possível realizar a solicitação. Erro: ${err.message}`
            );
          });
      });

    handleCancelAction();
  };

  const handleCreateSubmit = () => {
    const cardDTO: Card = { ...cardInfos, list: 'NEW' };
    // confirm request
    handleCancelAction();
  };

  const handleEdit = (card: CardDTO) => {
    handleSetCardValue(card);
    setShowFormModal(true);
  };
  const handleDelete = (cardToDelete: CardDTO) => {
    if (
      window.confirm(`Confirmar exclusão do cartão "${cardToDelete.title}"?`)
    ) {
      // confirm request
      const newList = cardList.filter(card => card.id !== cardToDelete.id);
      setCardList(newList);
    }
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

  React.useEffect(() => {
    const checkedLocalState = getLocalState('token');
    if (checkedLocalState?.token) {
      api
        .getCardList(checkedLocalState.token)
        .then(response => setCardList(response.data.tasks))
        .catch(err => {
          console.log(err.message);

          window.alert(
            'Não foi possíve carregar a lista de cartões. Tente recarregar a página.'
          );
        });
    } else {
      setShowUserModal(true);
    }
  }, []);
  console.log(showUserModal);
  return (
    <Container>
      <Modal visible={showUserModal} centerAll={true}>
        <UserActionForm
          userInfos={userInfos}
          onInfosSubmit={handleLoginSignupSubmit}
          onInfosChange={onUserInfosChange}
        />
      </Modal>
      <Modal visible={showFormModal} centerAll={true}>
        <CardActionForm
          cardInfos={cardInfos}
          onInfosSubmit={handleCreateSubmit}
          onInfosChange={onCardInfosChange}
          cancelHandler={handleCancelAction}
        />
      </Modal>
      <Row justify="center">
        <Col sm={12}>
          <HDisplay>ToDo App</HDisplay>
        </Col>
      </Row>
      <Kanban.View>
        <Row>
          <Col sm={12} md={6} lg={3}>
            <Kanban.List>
              <H2>
                New
                <Kanban.CardActionButton onClick={() => setShowFormModal(true)}>
                  <FaPlus />
                </Kanban.CardActionButton>
              </H2>
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
