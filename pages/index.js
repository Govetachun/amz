/* eslint-disable @next/next/no-img-element */
import { Grid } from '@material-ui/core';

import Layout from '../components/Layout';
import Product from '../models/Product';
import axios from 'axios';
import db from '../utils/db';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import ProductItem from '../components/ProductItem';
// import Carousel from 'react-material-ui-carousel';
// import useStyles from '../utils/styles';
// import NextLink from 'next/link';
export default function Home(props) {
  // const clasess = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { topRatedProducts } = props;
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };
  return (
    <Layout>
      {/* <Carousel className={clasess.mt1} animation="slide">
        {featuredProducts.map((product) => (
          <NextLink
            key={product._id}
            href={`/product/${product.slug}`}
            passHref
          >
            <Link>
              <img
                src={product.featuredImage}
                alt={product.name}
                className={clasess.featuredImage}
              ></img>
            </Link>
          </NextLink>
        ))}
      </Carousel> */}
      <h2 style={{ color: 'rgba(60, 51, 79, 1)' }}>New Trending now</h2>
      <Grid container spacing={4}>
        {topRatedProducts.map((product) => (
          <Grid item xs={6} md={3} key={product.name}>
            <ProductItem
              product={product}
              addToCartHandler={addToCartHandler}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
export async function getServerSideProps() {
  await db.connect();
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    '-reviews'
  )
    .lean()
    .limit(3);
  const topRatedProductsDocs = await Product.find({}, '-reviews')
    .lean()
    .sort({
      category: 1,
    })
    .limit(52);
  await db.disconnect();
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
    },
  };
}
