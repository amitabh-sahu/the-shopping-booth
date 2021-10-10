import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Nextlink from 'next/link';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Store } from '../utils/Store';
import Layout from '../components/Layout';
import Stepper from '../components/Stepper';
import MuiTheme from '../components/MuiTheme';
import { SHIPPING_DETAILS } from '../utils/constants';

export default function Shipping() {
    const router = useRouter();
    const { state: { cart: { shippingDetails }, userInfo }, dispatch } = useContext(Store);
    const [values, setValues] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        country: '',
        pinCode: '',
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: SHIPPING_DETAILS, payload: values });
        setValues({
            name: '',
            address: '',
            city: '',
            state: '',
            country: '',
            pinCode: '',
        });
        router.push('/payment');
    };
    useEffect(() => {
        if (userInfo) {
            shippingDetails && (setValues({
                name: shippingDetails.name,
                address: shippingDetails.address,
                city: shippingDetails.city,
                country: shippingDetails.country,
                pinCode: shippingDetails.pinCode,
            }));
        }
        else {
            router.push('/signin?redirect=/shipping');
        }
    }, []);

    return (
        <Layout title={`Shipping | The Shopping Booth`}>
            <Container maxWidth="lg" sx={{ py: 2 }}>
                <Nextlink href="/" passRef>
                    <Link underline="hover" variant="h6" color="success" sx={{ cursor: 'pointer' }}>Back to Home</Link>
                </Nextlink>
                <Card component="form" onSubmit={handleSubmit} sx={{ px: 3, pt: 3, pb: 1, my: 2, display: 'grid', gap: 2 }}>
                    <MuiTheme>
                        <Stepper activeStep={1} />
                        <TextField
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            value={values.name}
                            onChange={handleChange('name')}
                            autoFocus
                        />
                        <TextField
                            required
                            fullWidth
                            id="address"
                            label="Address"
                            name="address"
                            autoComplete="address"
                            value={values.address}
                            onChange={handleChange('address')}
                        />
                        <TextField
                            required
                            fullWidth
                            id="city"
                            label="City"
                            name="city"
                            autoComplete="city"
                            value={values.city}
                            onChange={handleChange('city')}
                        />
                        <TextField
                            required
                            fullWidth
                            id="state"
                            label="State"
                            name="state"
                            autoComplete="state"
                            value={values.state}
                            onChange={handleChange('state')}
                        />
                        <TextField
                            required
                            fullWidth
                            id="country"
                            label="Country"
                            name="country"
                            autoComplete="country"
                            value={values.country}
                            onChange={handleChange('country')}
                        />
                        <TextField
                            required
                            fullWidth
                            id="pinCode"
                            label="Pin Code"
                            name="pinCode"
                            autoComplete="pinCode"
                            value={values.pinCode}
                            onChange={handleChange('pinCode')}
                        />
                    </MuiTheme>
                    <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
                        Save and proceed
                    </Button>
                </Card>
            </Container>
        </Layout>
    );
}