import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsuarios } from '../../../actions/usuarios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import teste from '../../../img/img-blur.png';
import logo from '../../../img/logo-login.svg';
import { urlClient } from '../../../constants/url';

const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUsuarios());
  }, [dispatch]);

  const [erro, setErro] = useState(false);
  const usuarios = useSelector((state) => state.usuarios);
  const [usersData, setUsersData] = useState({
    name: '',
    password: '',
  });

  const setUser = (url, usuario) => {
    window.location.href = urlClient + url;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usersData.name === '' || usersData.password === '') {
      alert('preencha os campos');
      return;
    }
    const usu = usuarios.filter((item) => item.name === usersData.name);
    console.log(usu);
    if (usu.length > 0) {
      usu[0].password === usersData.password
        ? setUser(usu[0].userType, usu[0])
        : setErro(true);
    } else {
      setErro(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            width: '100%',
            backgroundImage: `url(${teste})`,
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'fixed',

            zIndex: -1,
            bottom: 0,
          }}
        ></Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              backgroundColor: 'white',
              maxWidth: '500px',
              padding: '50px',
              borderRadius: '15px',
              boxShadow: '-4px 11px 14px 5px rgb(0 0 0 / 23%)',
              textAlign: 'center',
            }}
          >
            {erro ? (
              <>
                <Stack sx={{ width: '100%', mb: 3 }} spacing={2}>
                  <Alert severity="error">
                    Erro - Usuario ou senha não encontrado
                  </Alert>
                </Stack>
              </>
            ) : (
              ''
            )}

            <img src={logo} alt="" />
            <Typography sx={{ mb: 3, mt: 3 }} component="h1" variant="h5">
              Login
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Usuario"
              name="name"
              value={usersData.name}
              autoFocus
              onChange={(e) =>
                setUsersData({ ...usersData, name: e.target.value })
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#052f62' }}
            >
              Entrar
            </Button>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
