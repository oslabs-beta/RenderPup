import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import renderpup from '../../public/renderpup.png';

// MUI functionality to add copyright functionality beneath signup form
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

// MUI functionality that generates signup form theme
const defaultTheme = createTheme();

// signup functionality with onFormSwitch prop drilled from App to allow toggling signin/signup page 
export default function SignUp({onFormSwitch}) {

  //useNavigate hook to navigate between react components 
  const history = useNavigate();

  // handleSignup functionality to input new user data to database, then redirect to SignIn component 
  const handleSignup = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    fetch('/api/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      // takes user data through data object 
      body: JSON.stringify(
        {
          username: data.get('username'),
          password: data.get('password'),
          firstName: data.get('firstName'),
          lastName: data.get('lastName'),
          email: data.get('email')
        })
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        history('/signin')
      })
      .catch(err => console.error(err, 'Signup not successfull'))
  };

  return (
    // MUI functionality to render signup form theme 
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
            {/* have signup page render renderpup logo */}
            <Avatar
              sx={{ m: 1, bgcolor: 'secondary.main' }}
              src={renderpup}
              alt="dogFetchingBall"
            />
            
            <Typography component="h3" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSignup} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>

                  <Link href="#" variant="body2">
                  <span onClick={() => onFormSwitch('login')}>
                  {"Already have an account? Sign in!"}
                  </span>
                  </Link>
                  
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

