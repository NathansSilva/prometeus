import React, { useState } from 'react';
import Login from './components/pages/Login/Login';
import NavBar from './components/navBar/NavBar.js';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Switch } from 'react-router';
import Professores from './components/pages/Professores/Professores.js';
import Alunos from './components/pages/Alunos/Alunos.js';
import Tarefas from './components/pages/Tarefas/Tarefas.js';
import CadastroAluno from './components/Cadastro/CadastroAluno.js';
import CadastroTarefa from './components/Cadastro/CadastroTarefa.js';
import TarefaDatails from './components/pages/TarefaDatails/TarefaDetails';

const App = () => {
  const [currentId, setCurrentId] = useState(null);

  const obj = JSON.parse(localStorage.getItem('usuario'));
  const item = !obj ? { name: '', userType: '', photo: '' } : obj;

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/login" />}>
          <Login />
        </Route>
        <NavBar
          currentId={currentId}
          nome={item.name}
          user={item.userType}
          src={item.photo}
        >
          <Route path="/cadastroAluno">
            <CadastroAluno />
          </Route>
          <Route path="/cadastroTarefa">
            <CadastroTarefa currentId={currentId} setCurrentId={setCurrentId} />
          </Route>
          <Route path="/Aluno">
            <Alunos />
          </Route>
          <Route path="/Professor">
            <Professores />
          </Route>
          <Route path="/Tarefas">
            <Tarefas setCurrentId={setCurrentId} />
          </Route>
          <Route path="/Tarefa/:id">
            <TarefaDatails user={item.userType} setCurrentId={setCurrentId} />
          </Route>
        </NavBar>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
