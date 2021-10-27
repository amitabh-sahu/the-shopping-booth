import { useContext, useEffect } from 'react';
import Image from 'next/image';
import Nextlink from 'next/link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CLEAR_CART } from '../utils/constants';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

export default function Payment() {
    const { dispatch } = useContext(Store);
    useEffect(() => {
        dispatch({ type: CLEAR_CART });
    }, [])

    return (
        <Layout title={'Order Placed | The Shopping Booth'}>
            <Card sx={{
                display: 'grid',
                maxWidth: 'max-content',
                placeItems: 'center',
                mx: 'auto',
                my: '10vh',
                gap: 2,
                p: 3,
            }}>
                <Image src="/success.png" alt={`empty cart image`} width={128} height={128} objectFit="contain" />
                <Typography variant="h6" component="p">
                    Your order has been placed successfully. Thank you for shopping with us.
                </Typography>
                <Box>
                    <Nextlink href="/" passRef>
                        <Button variant="outlined" color="inherit" sx={{ mx: 1 }}>Shop More</Button>
                    </Nextlink>
                    <Nextlink href="/orders" passRef>
                        <Button variant="outlined" color="inherit" sx={{ mx: 1 }}>My Orders</Button>
                    </Nextlink>
                </Box>
            </Card>
        </Layout >
    );
}