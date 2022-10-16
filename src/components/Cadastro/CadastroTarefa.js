import React, { useState, useEffect } from 'react';
import {
  Container,
  Button,
  CssBaseline,
  TextField,
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createTarefas, updateTarefa } from '../../actions/tarefas';
import { useHistory } from 'react-router-dom';

const theme = createTheme();

export default function CadastroTarefa({ currentId, setCurrentId }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [tarefaData, setTarefaData] = useState({
    name: '',
    desc: '',
    status: '',
    pontuacao: '',
    file: '',
    fileResposta: '',
  });

  const tarefa = useSelector((state) =>
    currentId ? state.tarefas.find((t) => t._id === currentId) : null
  );

  useEffect(() => {
    if (tarefa) {
      setTarefaData(tarefa);
    }
  }, [tarefa, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      tarefaData.name === '' ||
      tarefaData.desc === '' ||
      tarefaData.status === ''
    ) {
      alert('Preencha os campos');
      return;
    }

    if (currentId) {
      dispatch(updateTarefa(currentId, tarefaData));
      history.push('/tarefas');
    } else {
      dispatch(createTarefas(tarefaData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setTarefaData({
      name: '',
      desc: '',
      status: '',
      pontuacao: '',
      file: '',
      fileResposta: '',
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nome"
              name="nome"
              value={tarefaData.name}
              onChange={(e) =>
                setTarefaData({ ...tarefaData, name: e.target.value })
              }
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="desc"
              label="Descrição"
              value={tarefaData.desc}
              onChange={(e) =>
                setTarefaData({ ...tarefaData, desc: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              disabled={currentId ? false : true}
              name="pontuacao"
              label="Pontuacao"
              value={tarefaData.pontuacao}
              onChange={(e) =>
                setTarefaData({ ...tarefaData, pontuacao: e.target.value })
              }
            />
            <FormControl fullWidth sx={{ mt: 1, mb: 2 }}>
              <InputLabel id="status">Status Tarefa</InputLabel>
              <Select
                labelId="status"
                id="status"
                value={tarefaData.status}
                label="Status Tarefa"
                onChange={(e) =>
                  setTarefaData({ ...tarefaData, status: e.target.value })
                }
              >
                <MenuItem value={'Pendente'}>Pendente</MenuItem>
                <MenuItem
                  disabled={currentId ? false : true}
                  value={'Concluida'}
                >
                  Concluida
                </MenuItem>
              </Select>
            </FormControl>
            <div>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setTarefaData({ ...tarefaData, file: base64 })
                }
              />
            </div>
            {tarefaData.file ? (
              <a href={currentId ? tarefaData.file : ''}>Tarefa</a>
            ) : (
              ''
            )}

            <Button
              size="large"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Button
              onClick={clear}
              size="small"
              fullWidth
              variant="contained"
              color="secondary"
            >
              Limpar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
