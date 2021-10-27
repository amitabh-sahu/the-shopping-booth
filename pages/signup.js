import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Nextlink from 'next/link';
import axios from 'axios';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Store } from '../utils/Store';
import Layout from '../components/Layout';
import MuiTheme from '../components/MuiTheme';
import { AUTH_USER } from '../utils/constants';

export default function SignUp() {
    const router = useRouter();
    const { redirect } = router.query;
    const { dispatch } = useContext(Store);
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = (prop) => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post('/api/users/signup', values);
            dispatch({ type: AUTH_USER, payload: data });
            setValues({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                showPassword: false,
            });
            router.push(redirect || '/');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <Layout title={`Sign Up | The Shopping Booth`}>
            <Card sx={{
                display: 'grid',
                maxWidth: 600,
                placeItems: 'center',
                mx: 'auto',
                my: '10vh',
                p: 3,
            }}>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <MuiTheme>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="fname"
                                    value={values.firstName}
                                    onChange={handleChange('firstName')}
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
                                    autoComplete="lname"
                                    value={values.lastName}
                                    onChange={handleChange('lastName')}
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
                                    value={values.email}
                                    onChange={handleChange('email')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    autoComplete="current-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.confirmPassword}
                                    onChange={handleChange('confirmPassword')}
                                />
                            </Grid>
                        </Grid>
                    </MuiTheme>
                    <Button
                        onClick={handleClickShowPassword}
                        aria-label="toggle password visibility"
                        endIcon={values.showPassword ? <VisibilityOff /> : <Visibility />}>
                        Show
                    </Button>
                    <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Nextlink href="/" passHref>
                                <Link underline="hover" style={{ cursor: 'pointer' }}>
                                    Home
                                </Link>
                            </Nextlink>
                        </Grid>
                        <Grid item>
                            <Typography>
                                Already have an account?{' '}
                                <Nextlink href={redirect ? `/signin?redirect=${redirect}` : '/signin'} passHref>
                                    <Link underline="hover" style={{ cursor: 'pointer' }}>
                                        Sign In
                                    </Link>
                                </Nextlink>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </Layout>
    );
}