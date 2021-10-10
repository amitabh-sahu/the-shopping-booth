import React, { useContext } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import { Store } from '../utils/Store';
import { CART_ADD_ITEM } from '../utils/constants';

export default function Product({ product }) {
    const { dispatch } = useContext(Store);
    const addToCartHandler = () => {
        dispatch({ type: CART_ADD_ITEM, payload: { ...product } });
    };
    return (
        <Card sx={{ maxWidth: 320, m: 'auto' }}>
            <NextLink
                href={{
                    pathname: `/product/${(product.title).split(/[\W_]+/g).join('-')}`,
                    query: { id: product.id }
                }}
                passHref
            >
                <CardActionArea>
                    <Box sx={{ width: '100%', backgroundColor: '#fff', display: 'flex', justifyContent: 'center' }}>
                        <Image src={product.image} alt={`${product.title} image`} width={300} height={300} objectFit="contain" />
                    </Box>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                            {product.title}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography component="h6" sx={{ fontSize: '1.35rem' }}>
                                {`Rs. ${product.price * 100}`}
                            </Typography>
                            <Typography component="p" sx={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem' }}>
                                {product.rating.rate}
                                <StarIcon sx={{ color: '#d32f2f', ml: 0.5 }} />
                            </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </NextLink>
            <CardActions>
                <Button variant="outlined" color="inherit" sx={{ width: '100%', mx: 1 }} onClick={addToCartHandler}>Add to cart</Button>
            </CardActions>
        </Card>
    );
}