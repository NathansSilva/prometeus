import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  FETCH_TAREFA,
} from '../constants/actionTypes';

export default (tarefas = [], action) => {
  switch (action.type) {
    case DELETE:
      return tarefas.filter((t) => t._id !== action.payload);
    case UPDATE:
      return tarefas.map((tarefa) =>
        tarefa._id === action.payload._id ? action.payload : tarefa
      );
    case FETCH_ALL:
      return action.payload;
    case FETCH_TAREFA:
      return { tarefa: action.payload };
    case CREATE:
      return [...tarefas, action.payload];
    default:
      return tarefas;
  }
};
