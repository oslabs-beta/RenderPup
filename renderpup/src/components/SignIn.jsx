// import * as React from 'react';
import React, { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import renderpup from '../../public/renderpup.png';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
      https://RenderPup.com/
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn({onFormSwitch}) {
  //useNavigate hook to navigate to different react components
  const history = useNavigate();
  // const [redirectUrl, setRedirectUrl] = useState(null);

  // useEffect(() => {
  //   console.log('here?')
  //   const fetchData = async () => {
  //     console.log('in fetchdata')
  //     try {
  //       const response = await fetch('/dashboard');
  //       const data = await response.json();
  //       console.log('data!!!:', data);
  //       console.log('here!!!')

  //       if (data === '/'){
  //         console.log('data.redirect:', data);
  //         //redirects back to login
  //         history(`${data}`);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching dashboard:', error);
  //     }
  //   };

  //   fetchData();
  //   console.log('meeeeee');
  // }, [redirectUrl]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    fetch('/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          username: data.get('username'),
          password: data.get('password')
        })
      })
      .then(async data => {
        const response = await data.json();
        if (response === true) {
          history('/dashboard')
          // onFormSwitch
        } else {
          console.log('Incorrect username or password');
        }
      })
      .catch(err => {
        console.error(err, 'error when logging in')
      });
    // history.navigate.push('/dashboard')
    
  };

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            {/* have signin page render renderpup logo */}
            <Avatar
              sx={{ m: 1, bgcolor: 'secondary.main' }}
              src={renderpup}
              alt="dogFetchingBall"
            />
            
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>

                  <Link href="#" variant="body2">
                  <span onClick={() => onFormSwitch('signup')}>
                  {"Don't have an account? Sign up!"}
                  </span>
                  </Link>
      
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}