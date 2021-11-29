import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Nextlink from 'next/link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import StarIcon from '@mui/icons-material/Star';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Layout from '../../components/Layout';
import { Store } from '../../utils/Store';
import { CART_ADD_ITEM } from '../../utils/constants';

export default function Product({ product }) {
    const { dispatch, state: { cart: { cartItems } } } = useContext(Store);
    const [btnToCart, setBtnToCart] = useState(false);
    useEffect(() => {
        const found = cartItems.find((ele) => ele.id === product.id);
        if (found) {
            setBtnToCart(true);
        }
    }, [cartItems])
    const addToCartHandler = () => {
        dispatch({ type: CART_ADD_ITEM, payload: { ...product } });
    };
    return (
        <Layout title={product.title}>
            <Container maxWidth="lg" sx={{ py: 2 }}>
                <Nextlink href="/" passRef>
                    <Link underline="hover" variant="h6" color="success" sx={{ cursor: 'pointer' }}>Back to Home</Link>
                </Nextlink>
                <Card sx={{ my: 2, display: 'grid', gridTemplateColumns: { sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }, gridTemplateRows: { xs: 'repeat(2, 1fr)', md: 'repeat(1, 1fr)' } }}>
                    <Box sx={{ width: '100%', height: '100%', backgroundColor: '#fff', position: 'relative' }}>
                        <Image src={product.image} alt={`${product.title} image`} layout="fill" objectFit="contain" />
                    </Box>
                    <Box sx={{ display: 'grid', gap: 2, py: 3, px: { xs: 3, sm: 5 } }}>
                        <Typography variant="h4" component="h1">
                            {product.title}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {product.category}
                        </Typography>
                        <Box sx={{ display: 'flex', p: 1, alignItems: 'center' }}>
                            <Typography variant="h6" component="h4">
                                {product.rating.rate}
                            </Typography>
                            <StarIcon sx={{ color: '#d32f2f', ml: 0.5 }} />
                            <Divider orientation="vertical" sx={{ mx: 1 }} />
                            <Typography variant="h6" component="h4">
                                {`${product.rating.count} Ratings`}
                            </Typography>
                        </Box>
                        <Divider />
                        <Typography component="h3" sx={{ fontSize: '1.8rem' }}>
                            {`Rs. ${product.price * 100}`}
                            <Typography variant="body1" component="p" sx={{ color: '#d32f2f' }}>
                                inclusive of all taxes
                            </Typography>
                        </Typography>
                        <Typography variant="h6" component="p">
                            {product.description}
                        </Typography>
                        {btnToCart ? (
                            <Nextlink href="/cart" passRef>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    size="large"
                                    startIcon={<ShoppingCartIcon sx={{ color: '#d32f2f' }} />}
                                >
                                    go to cart
                                </Button>
                            </Nextlink>
                        ) : (
                            <Button
                                variant="outlined"
                                color="inherit"
                                size="large"
                                startIcon={<ShoppingCartIcon sx={{ color: '#d32f2f' }} />}
                                onClick={addToCartHandler}
                            >
                                add to cart
                            </Button>
                        )}
                    </Box>
                </Card>
            </Container>
        </Layout >
    )
}

export async function getServerSideProps(context) {
    const { data } = await axios.get(`https://fakestoreapi.com/products/${context.query.id}`);
    return { props: { product: data } };
}