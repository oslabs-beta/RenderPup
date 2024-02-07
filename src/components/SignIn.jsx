import React, { useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import renderpup from '../../public/renderpup.png';

// MUI functionality to add copyright functionality beneath signin form
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
      https://renderpup.com/
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


// MUI functionality that generates sign form theme
const defaultTheme = createTheme();

export default function SignIn({onFormSwitch}) {
  //useNavigate hook to navigate to different react components
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem('loggedIn') !== null) {
      navigate(sessionStorage.getItem('loggedIn'))
    }
  }, [])

  // handle submit functionality to redirect to dashboard 
  const handleSubmit = (event) => {
     // event to prevent entire page from being reloaded 
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // fetch req from endpoint that takes in username/pw data
    fetch('/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      //expect login data to to be in an object format that's extracted from data.get object 
      body: JSON.stringify(
        {
          username: data.get('username'),
          password: data.get('password')
        })
      })
      // 
      .then(async data => {
        // parse response from fetch req into json format 
        const response = await data.json();
        // if there's sa truthy response (correct username/pw), redirect to dashboard component using usenavigate hook
        if (response === true) {
          navigate('/dashboard')
        } else {
          console.log('Incorrect username or password');
        }
      })
      .catch(err => {
        console.error(err, 'error when logging in')
      });
    
  };

  return (
    // MUI functionality for signin form
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
                <Grid container justifyContent="flex-end" item>

                  <Link href="#" variant="body2">
                  <span onClick={() => onFormSwitch('signup')}>
                  {"Don't have an account? Sign up!"}
                  </span>
                  </Link>

                </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}