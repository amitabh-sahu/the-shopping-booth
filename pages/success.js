import Image from 'next/image';
import Nextlink from 'next/link';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Layout from '../components/Layout';

export default function Payment() {
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
                <Nextlink href="/" passRef>
                    <Button variant="outlined" color="inherit">Shop More</Button>
                </Nextlink>
            </Card>
        </Layout >
    );
}