import { loadStripe } from '@stripe/stripe-js';
import React, { useContext } from 'react';
import Image from 'next/image';
import Nextlink from 'next/link';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { CLEAR_CART } from '../utils/constants';
import MuiTheme from '../components/MuiTheme';
import Stepper from '../components/Stepper';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import axios from 'axios';

export default function Payment() {
    const { state: { cart: { cartItems, shippingDetails }, userInfo }, dispatch } = useContext(Store);
    const paymentHandler = async () => {
        const stripe = await loadStripe(process.env.stripe_public_key);
        const checkoutSession = await axios.post('/api/create-checkout-session', {
            email: userInfo.result.email,
            items: cartItems,
        });
        dispatch({ type: CLEAR_CART });
        const result = await stripe.redirectToCheckout({ sessionId: checkoutSession.data.id });
        if (result.error) {
            alert(result.error.message);
        }
    };
    return (
        <Layout title={'Cart | The Shopping Booth'}>
            <Container maxWidth="lg" sx={{ py: 2 }}>
                <Nextlink href="/" passRef>
                    <Link underline="hover" variant="h6" color="success" sx={{ cursor: 'pointer' }}>Back to Home</Link>
                </Nextlink>
                <Card sx={{ my: 2, px: 1, pt: 2, pb: 1 }}>
                    <MuiTheme>
                        <Stepper activeStep={2} />
                    </MuiTheme>
                    <CardContent sx={{ flex: 0.65, display: 'grid', gap: 1 }}>
                        {cartItems.length > 0 && (cartItems.map((item, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ width: 60, backgroundColor: '#fff', display: 'flex', justifyContent: 'center' }}>
                                    <Image src={item.image} alt={`${item.title} image`} width={100} height={100} objectFit="contain" />
                                </Box>
                                <Typography variant="h6" component="p" sx={{ flex: 1, pl: 2 }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="h6" component="p">
                                    &#8377;&#160;{item.price * 100}
                                </Typography>
                            </Box>
                        )))}
                        <Divider />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>

                            <Typography variant="h5" component="h5" sx={{ flex: 1 }}>
                                Total Amount
                            </Typography>
                            <Typography variant="h5" component="h5">
                                &#8377;&#160;{(cartItems.reduce((amount, item) => amount + (item.price * 100), 0))}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant="h5" component="p" sx={{ flex: 1 }}>
                                Shipping Details:
                            </Typography>
                            <Typography variant="h6" component="p">
                                {shippingDetails.name}<br />
                                {`${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state}, ${shippingDetails.country}`}
                                <br />{shippingDetails.pinCode}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions sx={{ flex: 0.35, alignItems: 'flex-start' }}>
                        <Button
                            variant="contained"
                            color="error"
                            size="large"
                            sx={{ width: '100%', fontSize: '1.2rem' }}
                            onClick={paymentHandler}
                        >
                            pay with stripe
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </Layout >
    );
}