import React, { useEffect, useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import FileBase from 'react-file-base64';
import { Typography, CircularProgress, Divider } from '@material-ui/core/';
import { Button, Chip, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getTarefa, updateTarefa } from '../../../actions/tarefas';
import {
  Box,
  Container,
  Grid,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import img from '../../../img/tarefas.jpg';

const theme = createTheme();

export default function TarefaDatails({ user, setCurrentId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tarefa } = useSelector((state) => state.tarefas);
  const { id } = useParams();
  const [file, setFile] = useState();

  useEffect(() => {
    dispatch(getTarefa(id));
  }, [id, dispatch]);

  const color = () => {
    switch (tarefa.status) {
      case 'Pendente':
        return '#e57373';
      case 'Concluida':
        return '#81c784';
      default:
        break;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {!tarefa ? (
        <CircularProgress />
      ) : (
        <Container maxWidth="lg">
          <Stack
            sx={{ mt: 1, mb: 2 }}
            direction="row"
            justifyContent={'space-between'}
            spacing={1}
            alignItems={'center'}
          >
            <Button onClick={() => history.push('/Tarefas')}>
              <KeyboardBackspaceIcon fontSize="large" />
            </Button>

            <Chip
              label={tarefa.status}
              size="small"
              sx={{ backgroundColor: color(), color: 'white' }}
            />
          </Stack>

          <Box
            sx={{
              mt: 6,
              mb: 2,
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
            justifyContent={'space-between'}
          >
            <Typography variant="h4">{tarefa.name}</Typography>
            <Typography variant="h4">
              {tarefa.pontuacao ? `${tarefa.pontuacao}/100` : '0/100'}
            </Typography>
          </Box>

          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Grid
              item
              xs={12}
              md={8}
              sx={{
                '& .markdown': {
                  py: 3,
                },
              }}
            >
              <Typography variant="h5" gutterBottom>
                Instruções :
              </Typography>
              <Divider />
              <Typography style={{ marginTop: '20px', marginBottom: '20px' }}>
                {tarefa.desc}
              </Typography>
              <Divider />
              <Typography
                style={{ marginTop: '20px', marginBottom: '20px' }}
                variant="h6"
                gutterBottom
              >
                Materiais :
              </Typography>
              {tarefa.file ? (
                <>
                  <Box
                    variant="div"
                    sx={{ width: '100%', marginBottom: '20px' }}
                  >
                    <a title="clique em salvar como" href={tarefa.file}>
                      {' '}
                      Clique aqui
                    </a>
                  </Box>
                </>
              ) : (
                '-'
              )}
              <Divider />
              <Typography
                style={{ marginTop: '20px', marginBottom: '20px' }}
                variant="h6"
                gutterBottom
              >
                Entrega :
              </Typography>
              {tarefa.fileResposta === '' ? (
                <>
                  <Box variant="div" display={'flex'} flexDirection={'column'}>
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) => {
                        setFile(base64);
                      }}
                    />
                    <Button
                      disabled={tarefa.status === 'Concluida' ? true : false}
                      variant="outlined"
                      sx={{ width: 'fit-content', mt: 2 }}
                      onClick={() => {
                        const UpdateTarefa = { ...tarefa, fileResposta: file };
                        dispatch(updateTarefa(id, UpdateTarefa));
                        alert('Resposta enviada');
                      }}
                    >
                      Enviar
                    </Button>
                  </Box>
                </>
              ) : (
                <a href={tarefa.fileResposta}>Resposta</a>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <Box variant="div" sx={{ width: '100%' }}>
                <img width={'100%'} src={img} alt="" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </ThemeProvider>
  );
}
