import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getTarefas } from '../../../actions/tarefas';
import { Grid, CircularProgress } from '@material-ui/core';
import Tarefa from './Tarefa/Tarefa';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function Tarefas({ setCurrentId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTarefas());
  }, [dispatch]);

  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tarefas = useSelector((state) => state.tarefas);

  const tarefasConcluidas = useSelector((state) => {
    if (state.tarefas.tarefa) {
      return state.tarefas;
    } else {
      return state.tarefas.filter((t) => t.status === 'Concluida');
    }
  });

  return (
    <>
      <Box sx={{ width: '100%', mb: 6 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Todas" />
          <Tab value="four" label="Concluidas" />
        </Tabs>
      </Box>
      {!tarefas.length ? (
        <CircularProgress />
      ) : (
        <Grid container alignItems="stretch" spacing={3}>
          {value === 'one' ? (
            <>
              {tarefas.map((tarefa) => (
                <Grid key={tarefa._id} item xs={12} md={4}>
                  <Tarefa tarefa={tarefa} setCurrentId={setCurrentId} />
                </Grid>
              ))}
            </>
          ) : (
            <>
              {tarefasConcluidas.map((tarefa) => (
                <Grid key={tarefa._id} item xs={12} sm={4}>
                  <Tarefa tarefa={tarefa} setCurrentId={setCurrentId} />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      )}
    </>
  );
}
