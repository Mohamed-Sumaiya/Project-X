import React, {useState, useContext} from 'react';
import { AppBar, Box, Button, CssBaseline, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Typography, Drawer, Toolbar, Container } from '@mui/material';
import { MenuRounded } from '@mui/icons-material';

import { AuthContext } from '../../context/authenticate-context';
import { Link, NavLink } from 'react-router-dom';
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
            text: 'New Form',
            path: '/'
        }
    ]
    }

    const isAdmin = auth.token && auth.role === 'admin' || auth.role === 'administrator'

    if(isAdmin) {
        navItems = [
            {
                text: 'New Form',
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
                text: 'Authenticate',
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
       <AppBar component="nav"  sx={{ backgroundColor: '#28292A' }}>
          <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={openDrawerHandler}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                 <MenuRounded />
              </IconButton>
              <Typography 
                variant="h4"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                CONDORGREEN
              </Typography>
              <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex', justifyItems: 'space-around'} }}>
                {navItems.map((item,index) => (
                  
                  <ListItem key={index}>
                    <ListItemButton component={NavLink} color="primary" to={item.path}  activeclassname="active" sx={{ '&:hover': {color: blue[500] }, '&.active': {color: blue[500]}}}  >
                       <ListItemText primary={item.text} /> 
                    </ListItemButton>
                  </ListItem>
               ))}
                <Button onClick={handleLogOut}>
                 <Typography> Log Out</Typography>
              </Button>
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
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
         >
          <Box onClick={openDrawerHandler} >
           <Typography variant="h5" comonent="div" padding={4}>
              CONDORGREEN
           </Typography>
           <Divider variant="middle"/>
           <List sx={{padding: 4}}>
              {navItems.map((item,index) => (
                <ListItem key={index}>
                   <ListItemButton component={NavLink} color="primary" to={item.path} activeclassname="active" sx={{ '&:hover': {color: blue[500] }, '&.active': {color: blue[500]}}}  >
                      <ListItemText primary={item.text} /> 
                   </ListItemButton>
                </ListItem>
              ))}
           </List>
           <Button onClick={handleLogOut}>
                 <Typography> Log Out</Typography>
              </Button>
        </Box>
        </Drawer>
         {props.children}
    </Box>
  )
};