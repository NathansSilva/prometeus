import { combineReducers } from 'redux';

import usuarios from './usuarios';
import tarefas from './tarefas';

export default combineReducers({ usuarios, tarefas });
