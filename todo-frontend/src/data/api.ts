import {
  AuthenticatedResponse,
  Authorization,
  Card,
  CreateCard,
  GetCardList,
  UpdatedCard,
  User
} from '@models';
import axios from 'axios';

const service = axios.create({
  baseURL: String(process.env.REACT_APP_API_URL)
});

export const api = {
  signup: (body: User): Promise<AuthenticatedResponse<Authorization>> =>
    service.post('signup', body),

  login: (body: User): Promise<AuthenticatedResponse<Authorization>> =>
    service.post('login', body),

  createCard: (
    token: string,
    body: Card
  ): Promise<AuthenticatedResponse<CreateCard>> =>
    service.post('cards', body, { headers: { Authorization: token } }),

  updateCard: (
    cardId: string,
    token: string,
    body: Card
  ): Promise<AuthenticatedResponse<UpdatedCard>> =>
    service.put(`cards/${cardId}`, body, { headers: { Authorization: token } }),

  deleteCard: (
    cardId: string,
    token: string
  ): Promise<AuthenticatedResponse<Authorization>> =>
    service.delete(`cards/${cardId}`, { headers: { Authorization: token } }),

  getCardList: (token: string): Promise<AuthenticatedResponse<GetCardList>> =>
    service.get('cards', { headers: { Authorization: token } })
};
