import axios from 'axios';
import { urlServer } from '../constants/url';

const url = urlServer;

const urlUsers = url + 'usuarios';
const urlTarefas = url + 'tarefas';

export const fetchUsers = () => axios.get(urlUsers);
export const createUsers = (newUser) => axios.post(urlUsers, newUser);

export const fetchTarefas = () => axios.get(urlTarefas);
export const createTarefas = (newTarefa) => axios.post(urlTarefas, newTarefa);
export const updateTarefa = (id, updateTarefa) =>
  axios.patch(`${urlTarefas}/${id}`, updateTarefa);

export const deleteTarefa = (id) => axios.delete(`${urlTarefas}/${id}`);
export const concluida = (id) => axios.patch(`${urlTarefas}/${id}/concluida`);
export const fetchTarefa = (id) => axios.get(`${urlTarefas}/${id}`);
