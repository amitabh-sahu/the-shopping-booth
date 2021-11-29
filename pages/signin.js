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
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Store } from '../utils/Store';
import Layout from '../components/Layout';
import MuiTheme from '../components/MuiTheme';
import { AUTH_USER, SHIPPING_DETAILS } from '../utils/constants';
import useLoader from '../hooks/useLoader';

export default function SingIn() {
    const router = useRouter();
    const { redirect } = router.query;
    const { dispatch } = useContext(Store);
    const [loader, showLoader, hideLoader] = useLoader();
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    });
    const guest = {
        email: 'guest@theshoppingbooth.com',
        password: 'guestlogin',
        sipping: {
            name: 'Guest',
            address: 'Purani Basti',
            city: 'Raipur',
            state: 'Chhatiisgarh',
            country: 'India',
            pinCode: '492001',
        },
    };
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        showLoader();
        try {
            const { data } = await axios.post('/api/users/signin', values);
            dispatch({ type: AUTH_USER, payload: data });
            setValues({
                email: '',
                password: '',
                showPassword: false,
            });
            router.push(redirect || '/');
        } catch (err) {
            alert(err.message);
        }
        hideLoader();
    };
    const handleGuestLogin = async () => {
        showLoader();
        try {
            const { data } = await axios.post('/api/users/signin', guest);
            dispatch({ type: SHIPPING_DETAILS, payload: guest.sipping });
            await dispatch({ type: AUTH_USER, payload: data });
            router.push(redirect || '/');
        } catch (err) {
            alert(err.message);
        }
        hideLoader();
    };

    return (
        <Layout title={`Sign In | The Shopping Booth`}>
            <Card sx={{
                display: 'grid',
                maxWidth: 'max-content',
                placeItems: 'center',
                mx: 'auto',
                my: '10vh',
                p: 3,
            }}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <MuiTheme>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={values.email}
                            onChange={handleChange('email')}
                            autoFocus
                        />
                        <FormControl sx={{ my: 1, width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password * </InputLabel>
                            <OutlinedInput
                                required
                                fullWidth
                                id="password"
                                name="password"
                                label="Password * "
                                autoComplete="current-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </MuiTheme>
                    <Box sx={{ display: 'grid', gap: 1, mt: 1, mb: 2 }}>
                        <Button type="submit" fullWidth variant="contained">
                            Sign In
                        </Button>
                        <Button variant="contained" fullWidth onClick={handleGuestLogin}>
                            Visit as Guest
                        </Button>
                    </Box>
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
                                Don&apos;t have an account?{' '}
                                <Nextlink href={redirect ? `/signup?redirect=${redirect}` : '/signup'} passHref>
                                    <Link underline="hover" style={{ cursor: 'pointer' }}>
                                        Sign Up
                                    </Link>
                                </Nextlink>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                {loader}
            </Card>
        </Layout>
    );
}