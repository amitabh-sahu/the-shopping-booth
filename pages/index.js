import axios from 'axios';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Layout from '../components/Layout';
import Product from '../components/Product';

export default function Home({ products }) {
  return (
    <Layout title={`The Shopping Booth`}>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 6, md: 9, lg: 12 }}>
          {products.map((product, index) => (
            <Grid item xs={2} sm={3} md={3} lg={3} key={index}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get('https://fakestoreapi.com/products');
  return { props: { products: data } };
}