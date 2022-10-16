import React, { useState } from 'react';
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
  Alert,
  Stack,
} from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createUsuario } from '../../actions/usuarios';

const theme = createTheme();

export default function CadastroAluno() {
  const [sucesso, setSucesso] = useState(false);
  const [usersData, setUsersData] = useState({
    name: '',
    email: '',
    password: '',
    userType: '',
    photo: '',
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUsuario(usersData));
    setSucesso(true);
    clear();
  };

  const clear = () => {
    setUsersData({
      name: '',
      email: '',
      password: '',
      userType: '',
      photo: '',
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
          {sucesso ? (
            <>
              <Stack sx={{ width: '100%', mb: 3 }} spacing={2}>
                <Alert severity="success">Usuario cadastrado</Alert>
              </Stack>
            </>
          ) : (
            ''
          )}
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
              value={usersData.name}
              onChange={(e) =>
                setUsersData({ ...usersData, name: e.target.value })
              }
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              value={usersData.email}
              onChange={(e) =>
                setUsersData({ ...usersData, email: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              value={usersData.password}
              onChange={(e) =>
                setUsersData({ ...usersData, password: e.target.value })
              }
            />
            <FormControl fullWidth sx={{ mt: 1, mb: 2 }}>
              <InputLabel id="userType">Tipo Usuario</InputLabel>
              <Select
                labelId="userType"
                id="userType"
                value={usersData.userType}
                label="Tipo Usuario"
                onChange={(e) =>
                  setUsersData({ ...usersData, userType: e.target.value })
                }
              >
                <MenuItem value={'Professor'}>Professor</MenuItem>
                <MenuItem value={'Aluno'}>Aluno</MenuItem>
              </Select>
            </FormControl>
            <div>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setUsersData({ ...usersData, photo: base64 })
                }
              />
            </div>
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
