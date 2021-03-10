import * as React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { FaPlus } from 'react-icons/fa';

import { Card, CardDTO, LIST } from './models';
import { api } from './data/api';
import { filterListHelper, moveCardHelper } from './tools';
import {
  Modal,
  UserActionForm,
  CardActionForm,
  HDisplay,
  Kanban,
  H2,
  VerticalSeparator
} from './components';
import { useForm, useLocalState } from './hooks';

const App: React.FC = (): JSX.Element => {
  const { updateLocalState, getLocalState, localState } = useLocalState<{
    token: string | null;
  }>({
    token: null
  });
  const [showUserModal, setShowUserModal] = React.useState(false);
  const [showFormModal, setShowFormModal] = React.useState(false);
  const [actionType, setActionType] = React.useState<'create' | 'update'>(
    'create'
  );

  const {
    value: userInfos,
    handleChange: onUserInfosChange,
    handleSetValue: handleSetUserValue
  } = useForm();
  const {
    value: cardInfos,
    handleChange: onCardInfosChange,
    handleSetValue: handleSetCardValue
  } = useForm();

  const [cardList, setCardList] = React.useState<CardDTO[]>([]);
  const newList = filterListHelper(cardList, 'NEW');
  const todoList = filterListHelper(cardList, 'TODO');
  const doingList = filterListHelper(cardList, 'DOING');
  const doneList = filterListHelper(cardList, 'DONE');

  const handleEndAction = () => {
    setShowUserModal(false);
    setShowFormModal(false);

    handleSetUserValue(null);
    handleSetCardValue(null);
  };

  const handleLoginSignupSubmit = () => {
    api
      .login(userInfos)
      .then(response => {
        updateLocalState({ token: response.data.token }, 'token');
        handleEndAction();
      })
      .catch(err => {
        window.alert('Não foi possível fazer login. Tentando signup...');
        console.log(err.message);
        api
          .signup(userInfos)
          .then(response => {
            updateLocalState({ token: response.data.token }, 'token');
            handleEndAction();
            window.alert('Olá! Crie suas tarefas já!');
          })
          .catch(err => {
            console.log(err.message);
            window.alert(
              `Não foi possível realizar a solicitação. Erro: ${err.message}`
            );
          });
      });

    handleEndAction();
  };
  const handleEdit = (card: CardDTO) => {
    setActionType('update');
    handleSetCardValue(card);
    setShowFormModal(true);
  };
  const handleCardInfosSubmit = () => {
    const checkedLocalState = getLocalState('token');
    if (checkedLocalState?.token) {
      if (actionType === 'update') {
        api
          .updateCard(cardInfos.id, checkedLocalState.token, cardInfos)
          .then(response => {
            const oldCard = cardInfos;
            const newList = cardList.filter(card => card.id !== oldCard.id);
            setCardList([response.data.updatedTask, ...newList]);
            handleEndAction();
          })
          .catch(err => {
            window.alert(
              `Não foi possível realizar a solicitção. Erro:${err.message}`
            );
            handleEndAction();
          });
      } else if (actionType === 'create') {
        const cardDTO: Card = { ...cardInfos, list: 'NEW' };
        api
          .createCard(checkedLocalState.token, cardDTO)
          .then(response => {
            setCardList([response.data.createdTask, ...cardList]);
            handleEndAction();
          })
          .catch(err =>
            window.alert(
              `Não foi possível realizar a solicitção. Erro:${err.message}`
            )
          );
      }
    }
  };
  const handleDelete = (cardToDelete: CardDTO) => {
    if (
      window.confirm(`Confirmar exclusão do cartão "${cardToDelete.title}"?`)
    ) {
      if (localState?.token) {
        api
          .deleteCard(cardToDelete.id, localState.token)
          .catch(err =>
            window.alert(
              `Não foi possível realizar a solicitção. Erro:${err.message}`
            )
          );
        const newList = cardList.filter(card => card.id !== cardToDelete.id);
        setCardList(newList);
      }
    }
  };

  const handleToNext = (cardToMove: CardDTO) => {
    const listIndex = LIST[cardToMove.list];
    if (listIndex === 3) {
      return;
    }

    const newList = moveCardHelper(cardToMove, cardList, listIndex, 'next');
    setCardList(newList);
  };
  const handleToPrevious = (cardToMove: CardDTO) => {
    const listIndex = LIST[cardToMove.list];
    if (listIndex === 0) {
      return;
    }

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
          if (err.message.includes('400')) {
            setShowUserModal(true);
            window.alert('Sessão expirada. Faça login novamente.');
          } else {
            window.alert(
              'Não foi possíve carregar a lista de cartões. Tente recarregar a página.'
            );
          }
        });
    } else {
      setShowUserModal(true);
    }
  }, []);
  React.useEffect(() => {
    return () => {
      const checkedLocalState = getLocalState('token');
      if (checkedLocalState?.token) {
        const updateList = cardList.map(card => {
          return api.updateCard(
            card.id,
            checkedLocalState.token as string,
            card
          );
        });

        Promise.all(updateList);
      }
    };
  }, []);

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
          actionType={actionType}
          cardInfos={cardInfos}
          onInfosSubmit={handleCardInfosSubmit}
          onInfosChange={onCardInfosChange}
          cancelHandler={handleEndAction}
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
                <Kanban.CardActionButton
                  onClick={() => {
                    setActionType('create');
                    setShowFormModal(true);
                  }}
                >
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
