import { FETCH_ALL, CREATE } from '../constants/actionTypes';
import * as api from '../api';

export const getUsuarios = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createUsuario = (usuario) => async (dispatch) => {
  try {
    const { data } = await api.createUsers(usuario);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
