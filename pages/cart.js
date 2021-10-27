import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Nextlink from 'next/link';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Store } from '../utils/Store';
import Layout from '../components/Layout';
import { CART_REMOVE_ITEM } from '../utils/constants';

export default function Cart() {
    const router = useRouter();
    const { state: { cart: { cartItems }, userInfo }, dispatch } = useContext(Store);
    const removeItemHandler = (item) => {
        dispatch({ type: CART_REMOVE_ITEM, payload: item });
    };
    const placeOrderHandler = () => {
        userInfo ? router.push('/shipping') : router.push('/signin?redirect=/shipping');;
    };
    return (
        <Layout title={'Cart | The Shopping Booth'}>
            {cartItems.length > 0 ? (
                <Container maxWidth="lg" sx={{ py: 2 }}>
                    <Nextlink href="/" passRef>
                        <Link underline="hover" variant="h6" color="success" sx={{ cursor: 'pointer' }}>Back to Home</Link>
                    </Nextlink>
                    <Card sx={{ my: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                        <CardContent sx={{ flex: 0.65, display: 'grid', gap: 1 }}>
                            {cartItems.map((item, index) => (
                                <Paper elevation={0} key={index} sx={{ display: 'flex', p: 2 }}>
                                    <Box sx={{ width: 100, backgroundColor: '#fff', display: 'flex', justifyContent: 'center' }}>
                                        <Image src={item.image} alt={`${item.title} image`} width={300} height={300} objectFit="contain" />
                                    </Box>
                                    <Box sx={{ flex: 1, pl: 2 }}>
                                        <Nextlink
                                            href={{
                                                pathname: `/product/${(item.title).split(/[\W_]+/g).join('-')}`,
                                                query: { id: item.id }
                                            }}
                                            passHref
                                        >
                                            <Link underline="none" variant="h6" color="inherit" sx={{ cursor: 'pointer', lineHeight: 1 }}>
                                                {item.title}
                                            </Link>
                                        </Nextlink>
                                        <Typography variant="body1" component="p" sx={{ pt: 1, pb: 2 }}>
                                            {item.category}
                                        </Typography>
                                        <Typography variant="h6" component="p">
                                            &#8377;&#160;{item.price * 100}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <IconButton color="error" onClick={() => removeItemHandler(item)}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                </Paper>
                            ))}
                        </CardContent>
                        <CardActions sx={{ flex: 0.35, alignItems: 'flex-start' }}>
                            <Paper elevation={0} sx={{ width: '100%', p: 2 }}>
                                <Typography variant="h5" component="h5">
                                    ORDER DETAILS
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                                    <Typography variant="h6" component="h6">
                                        Items
                                    </Typography>
                                    <Typography variant="h6" component="h6">
                                        {cartItems.length}
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                                    <Typography variant="h6" component="h6">
                                        Total Amount
                                    </Typography>
                                    <Typography variant="h6" component="h6">
                                        &#8377;&#160;{(cartItems.reduce((amount, item) => amount + (item.price * 100), 0))}
                                    </Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="large"
                                    sx={{ width: '100%', fontSize: '1.2rem' }}
                                    onClick={placeOrderHandler}
                                >
                                    place order
                                </Button>
                            </Paper>
                        </CardActions>
                    </Card>
                </Container>
            ) : (
                <Container maxWidth="lg" sx={{ display: 'grid', placeItems: 'center', gap: 2, py: 2, mx: 'auto', my: '10vh' }}>
                    <Image src="/empty-cart.png" alt="empty cart image" width={128} height={128} objectFit="contain" />
                    <Typography variant="h6" component="p">
                        There is nothing in your cart. Let&apos;s add some items.
                    </Typography>
                    <Nextlink href="/" passRef>
                        <Button variant="outlined" color="inherit">Start Shopping</Button>
                    </Nextlink>
                </Container>
            )}
        </Layout >
    );
}