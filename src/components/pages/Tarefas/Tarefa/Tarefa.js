import React from 'react';

import {
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
  Typography,
  ButtonBase,
  CircularProgress,
} from '@mui/material';

import img from '../../../../img/tarefas.jpg';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteTarefa, concluida } from '../../../../actions/tarefas';

export default function Tarefa({ tarefa, setCurrentId }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const obj = JSON.parse(localStorage.getItem('usuario'));
  const display = obj.userType === 'Professor' ? '' : 'none';

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

  const openTarefa = () => {
    history.push(`tarefa/${tarefa._id}`);
  };

  const edit = () => {
    setCurrentId(tarefa._id);
    history.push('/cadastroTarefa');
  };

  return (
    <Card sx={{ maxWidth: 300 }}>
      {!tarefa ? (
        <CircularProgress />
      ) : (
        <>
          <ButtonBase sx={{ width: '100%' }} onClick={openTarefa}>
            <CardMedia
              component="img"
              height="140"
              image={img}
              alt="green iguana"
            />
          </ButtonBase>
          <CardContent>
            <Stack
              sx={{ mt: 1, mb: 2 }}
              direction="row"
              justifyContent={'space-between'}
              spacing={1}
              alignItems={'center'}
            >
              <Chip
                label={tarefa.status}
                size="small"
                sx={{ backgroundColor: color(), color: 'white' }}
              />
              <Button
                disabled={obj.userType === 'Professor' ? false : true}
                size="small"
                sx={{ justifyContent: 'end', margin: 0, position: 'relative' }}
                onClick={edit}
              >
                <MoreVertIcon fontSize="medium" />
              </Button>
            </Stack>

            <Typography gutterBottom variant="h5" component="div">
              {tarefa.name}
            </Typography>
            <Typography
              sx={{ minHeight: 80 }}
              variant="body2"
              color="text.secondary"
            >
              {tarefa.desc.length > 130
                ? tarefa.desc.substring(0, 100) + ' ...'
                : tarefa.desc}
            </Typography>
          </CardContent>
          <CardActions sx={{ flexWrap: 'wrap' }}>
            <Button
              disabled={tarefa.status === 'Concluida' ? true : false}
              size="small"
              onClick={() => dispatch(concluida(tarefa._id))}
            >
              <TaskAltIcon />
              Concluir
            </Button>
            <Button
              sx={{ display: display }}
              size="small"
              onClick={() => dispatch(deleteTarefa(tarefa._id))}
            >
              <DeleteIcon />
              Delete
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
}
