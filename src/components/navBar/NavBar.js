import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MuiAppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../../img/logo-2.svg';
import { Paper } from '@material-ui/core';
import { Divider } from '@mui/material';

import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import Prometeus from '../chatbot/prometeus';

const settings = ['Perfil', 'Logout'];
const menuAluno = ['Ver Tarefas', 'Home'];
const menuProf = ['Criar Tarefas', 'Ver Tarefas', 'Cadastrar Usuário', 'Home'];
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'center',
}));

const NavBar = (props) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const theme = useTheme();
  const appBarColor = '#3478cf';

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(true);

  const changeIcon = (menu) => {
    switch (menu) {
      case 'Home':
        return <CottageOutlinedIcon />;
      case 'Ver Tarefas':
        return <ContentPasteOutlinedIcon />;
      case 'Cadastrar Usuário':
        return <PersonAddAlt1OutlinedIcon />;
      case 'Criar Tarefas':
        return <AddTaskOutlinedIcon />;
      default:
        break;
    }
  };

  const handleDrawer = () => {
    setOpen((open) => !open);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenu = (settings) => {
    switch (settings) {
      case 'Logout':
        history.push('/');
        localStorage.clear();
        break;

      default:
        break;
    }
  };

  const menuRoutes = (menu) => {
    switch (menu) {
      case 'Ver Tarefas':
        history.push('/tarefas');
        return;
      case 'Cadastrar Usuário':
        history.push('/cadastroAluno');
        return;
      case 'Criar Tarefas':
        history.push('/cadastroTarefa');
        return;
      case 'Home':
        history.push(`/${props.user}`);
        return;
      default:
        break;
    }
  };

  const tes = () => {
    switch (pathname) {
      case '/Professor':
      case '/Aluno':
        return 'Home';
      case '/tarefas':
        return 'Tarefas';
      case '/cadastroAluno':
        return 'Cadastro Usuário';
      case '/cadastroTarefa':
        return 'Cadastro Tarefa';

      default:
        break;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        sx={{ backgroundColor: appBarColor }}
        position="fixed"
        open={open}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textTransform: 'uppercase',
                flexGrow: 1,
              }}
            >
              {tes()}
            </Typography>

            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'inherit',
              }}
            >
              Prometeus
            </Typography>

            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="p"
                noWrap
                component="p"
                sx={{
                  color: 'white',
                  fontSize: '15px',
                  marginInline: '10px',
                }}
              >
                {props.nome === '' ? '' : ' Olá, ' + props.nome}
              </Typography>

              <Tooltip title="Configurações">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={props.src} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#042349',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <img src={logo} alt="logo" width="60%" />
          <IconButton
            onClick={handleDrawer}
            sx={{ color: 'white', position: 'absolute', right: '0' }}
          >
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {props.user === 'Professor' ? (
          <List>
            {menuProf.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => menuRoutes(text)}>
                  <ListItemIcon sx={{ color: '#efededd6' }}>
                    {changeIcon(text)}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      color: '#efededd6',
                      fontFamily: 'monospace',
                    }}
                    primary={text}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <List>
            {menuAluno.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => menuRoutes(text)}>
                  <ListItemIcon sx={{ color: '#efededd6' }}>
                    {changeIcon(text)}
                  </ListItemIcon>
                  <ListItemText sx={{ color: '#efededd6' }} primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        <Paper style={{ padding: '50px', borderRadius: '15px' }} elevation={6}>
          {props.children}
          <Prometeus />
        </Paper>
      </Main>
    </Box>
  );
};
export default NavBar;
