import { FETCH_ALL, CREATE } from '../constants/actionTypes';

export default (usuarios = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...usuarios, action.payload];
    default:
      return usuarios;
  }
};
