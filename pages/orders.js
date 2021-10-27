import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Nextlink from 'next/link';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import axios from 'axios';
import moment from 'moment';

export default function Orders() {
    const router = useRouter();
    const [orders, setorders] = useState([]);
    const { state: { userInfo } } = useContext(Store);

    useEffect(() => {
        if (!userInfo) {
            router.push('/signin');
        }
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get(`/api/orders/${userInfo.result.id}`)
                setorders(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchOrders();
    }, []);

    return (
        <Layout title={'Orders | The Shopping Booth'}>
            <Container maxWidth="lg" sx={{ py: 2 }}>
                <Nextlink href="/" passRef>
                    <Link underline="hover" variant="h6" color="success" sx={{ cursor: 'pointer' }}>Back to Home</Link>
                </Nextlink>
                <Box sx={{ display: 'grid', gap: 2 }}>
                    {orders.map((order) => (
                        <Card key={order._id} sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 1 }}>
                                <Box>
                                    <Typography>ORDER PLACED</Typography>
                                    <Typography>{moment(order.orderDate).fromNow()}</Typography>
                                </Box>
                                <Box>
                                    <Typography>TOTAL</Typography>
                                    <Typography>&#8377;&#160;{order.amount.total}</Typography>
                                </Box>
                                <Box sx={{ textAlign: 'end' }}>
                                    <Typography>{order._id}</Typography>
                                    <Typography>{order.itemsImg.length} Items</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', overflowX: 'auto' }}>
                                {order.itemsImg.map((image, index) => (
                                    <Box key={index} sx={{ width: 250, backgroundColor: '#fff', display: 'flex', justifyContent: 'center' }}>
                                        <Image src={image} alt={`image`} width={200} height={200} objectFit="contain" layout="fixed" />
                                    </Box>
                                ))}
                            </Box>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Layout >
    );
}