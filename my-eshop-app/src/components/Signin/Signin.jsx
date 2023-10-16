import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../../common/Header';
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignIn() {
  const { enqueueSnackbar } = useSnackbar();
  const history = useNavigate();
  const url = 'http://localhost:3001/api/v1/';

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const requestBody = {
      email: data.get("email"),
      password: data.get("password")
    };

    const validate_data = validate(requestBody);
    if (validate_data) {
      console.log(requestBody);
      try {
        const response = await fetch(`${url}auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          console.log("Auth token", response.headers);
          const responseData = await response.json();
          console.log('API Response:', responseData);
          history("/");
          persistLogin(responseData, response);
          enqueueSnackbar("Login successful", { variant: 'success' });
        } else {
          console.error('API Error:', response.statusText);
          enqueueSnackbar(`${response.statusText}`, { variant: 'error' });
        }
      } catch (error) {
        console.error('Fetch Error:', error);
        enqueueSnackbar(`${error}`, { variant: 'error' });
      }
    }
  };

  const validate = (data) => {
    const { email, password } = data;
    if (email === '' && password === '') {
      enqueueSnackbar('Email and password are required', { variant: 'error' });
      return false;
    } else if (email === '') {
      enqueueSnackbar('Email is required', { variant: 'error' });
      return false;
    } else if (password === '') {
      enqueueSnackbar('Password is required', { variant: 'error' });
      return false;
    }
    return true;
  };

  const persistLogin = (data, header) => {
    const { name, email, isAuthenticated } = data;
    console.log(data);
    console.log(name);
    console.log(header.headers.get('x-auth-token'));
    localStorage.setItem("username", name);
    localStorage.setItem("email", email);
    localStorage.setItem("authenticated", isAuthenticated);
    localStorage.setItem("token", header.headers.get('x-auth-token'));
  }

  return (
    <>
      <Header hasHiddenAuthButtons />
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
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
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
