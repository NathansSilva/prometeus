import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  FETCH_TAREFA,
} from '../constants/actionTypes';
import * as api from '../api';

export const getTarefas = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTarefas();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getTarefa = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchTarefa(id);
    dispatch({ type: FETCH_TAREFA, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createTarefas = (tarefa) => async (dispatch) => {
  try {
    const { data } = await api.createTarefas(tarefa);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateTarefa = (id, tarefa) => async (dispatch) => {
  try {
    const { data } = await api.updateTarefa(id, tarefa);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTarefa = (id) => async (dispatch) => {
  try {
    await api.deleteTarefa(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const concluida = (id) => async (dispatch) => {
  try {
    const { data } = await api.concluida(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
