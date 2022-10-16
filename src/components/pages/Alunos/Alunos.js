import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import teste from '../../../img/fazer-tarefas.svg';
import styles from './styles.css';
import { Button, Typography } from '@mui/material';

export default function Alunos() {
  return (
    <>
      <CssBaseline />

      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h6"
          sx={{
            fontWeight: 'bold',
            fontFamily: 'arial',
            textAlign: 'center',
            mt: 2,
          }}
        >
          Opções Disponiveis no momento
        </Typography>
        <Box sx={{ height: '50vh', textAlign: 'center', marginY: 5 }}>
          <img src={teste} alt="" className="img" />
        </Box>
        <Button
          size="large"
          fullWidth
          variant="contained"
          sx={{ bgcolor: 'darkblue' }}
        >
          Ver Tarefas
        </Button>
      </Container>
    </>
  );
}
