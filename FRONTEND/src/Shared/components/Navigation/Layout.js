import React, {useState, useContext} from 'react';
import { AppBar, Box, Button, CssBaseline, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Typography, Drawer, Toolbar, Container } from '@mui/material';
import { MenuRounded } from '@mui/icons-material';

import { AuthContext } from '../../context/authenticate-context';
import { NavLink } from 'react-router-dom';
import { blue } from '@mui/material/colors';


const drawerWidth = 240;
let navItems;

export const Layout = props => {
    const auth = useContext(AuthContext);
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = () => {
      setDrawerIsOpen(true)
    };
  
    const closeDrawerHandler = () => {
      setDrawerIsOpen(false)
    };

    if(auth.token){
        navItems = [
        {
            text: 'Home',
            path: '/'
        }
    ]
    }

    const isAdmin = auth.token && auth.role === 'admin' || auth.role === 'administrator'

    if(isAdmin) {
        navItems = [
            {
                text: 'Home',
                path: '/',
                action: (event) => {
                  event.preventDefault(
                  )
                }
            },

            {
                text: 'Applicants',
                path: '/applicants',
                action: (event) => {
                  event.preventDefault(
                  )
                }
            }
        ]
    }
    if(!auth.token){
        navItems = [
            {
                text: 'Login',
                path: '/auth',
                action: (event) => {
                  event.preventDefault(
                  )
                }
            }
        ]
    }
   
    const handleLogOut = () => {
      auth.logOut(auth.userId);
    };
    
  return (
    <Box>
       {/* App Bar */}
       <CssBaseline />
       <AppBar elevation={3} component="nav"  sx={{ backgroundColor: '#ffffff', height: '70px' }}>
          <Toolbar>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={openDrawerHandler}
                sx={{ mr: 2, display: { md: 'none' }, color: 'black' }}
              >
                 <MenuRounded />
              </IconButton>
              <Typography 
                variant="h4"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' }, color: '#000000', fontWeight: 'bold'}}
              >
                Indigent Register
              </Typography>
              <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', justifyItems: 'space-around', width: {md: '50%', lg: '35%'}, alignItems: 'center'}}}>
                {navItems.map((item,index) => (
                  
                  <ListItem key={index}>
                    <ListItemButton component={NavLink} to={item.path}  activeclassname="active" sx={{ '&:hover': {color: blue[500] }, '&.active': {color: blue[500]}, color: "#090912"}}  >
                       <ListItemText primary={item.text} /> 
                    </ListItemButton>
                  </ListItem>
               ))}
                { auth.token &&
                  <Container>
                    <Button variant="text" onClick={handleLogOut} sx={{padding: 0, height: '30px', textTransform: 'none', color: '#090912', fontSize: 18}}>
                      <Typography variant="p" sx={{fontWeight: 400}}> Logout</Typography>
                    </Button>
                  </Container>
                }
              </Box>
             
          </Toolbar>
        </AppBar>
        <Drawer 
          variant="temporary"
          open={drawerIsOpen}
          onClose={closeDrawerHandler}
          ModalProps={{
          keepmounted: "true", 
          }}
          sx={{
            display: { xs: 'block', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            textAlign: 'center',
            }}
         >
          <Box onClick={openDrawerHandler} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
           <Typography variant="h6" comonent="div" padding={4}>
              Indigent Register
           </Typography>
           <Divider variant="middle"/>
           <List sx={{padding: 2, marginLeft: 2, textAlign: 'center'}}>
              {navItems.map((item,index) => (
                <ListItem key={index}>
                   <ListItemButton component={NavLink} color="primary" to={item.path} activeclassname="active" sx={{ '&:hover': {color: blue[500] }, '&.active': {color: blue[500]}, display: 'flex', flexDirection: ' column'}}  >
                      <ListItemText primary={item.text}/> 
                   </ListItemButton>
                </ListItem>
              ))}
           </List>
          {auth.token &&  
             <Button variant="contained" onClick={handleLogOut} sx={{marginLeft: 10, width: '40%', textTransform: 'none'}}>
                 <Typography> Logout</Typography>
            </Button>}
        </Box>
        </Drawer>
         {props.children}
    </Box>
  )
};