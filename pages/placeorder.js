import {
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Card,
  List,
  ListItem,
  CircularProgress,
} from '@material-ui/core';
import dynamic from 'next/dynamic';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import NextLink from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import useStyles from '../utils/styles';
import CheckoutWizard from '../components/checkoutWizard';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';
import Cookies from 'js-cookie';
function PlaceOrder() {
  const classes = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;
  const round2 = (num) => Math.round((num * 100 + Number.EPSILON) / 100);
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price - c.quantity, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.1);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, []);
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const placeOrderHandler = async () => {
    closeSnackbar();
    try {
      setLoading(true);
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'CART_CLEAR' });
      Cookies.remove('cartItems');
      setLoading(false);
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3}></CheckoutWizard>
      <Typography component="h1" variant="h1">
        Place Order
      </Typography>
      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Địa chỉ đặt hàng
                </Typography>
              </ListItem>
              <ListItem>
                {shippingAddress.fullName},{shippingAddress.address},{' '}
                {shippingAddress.city},{shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </ListItem>
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Phương thức thanh toán
                </Typography>
              </ListItem>
              <ListItem>{paymentMethod}</ListItem>
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Đơn hàng
                </Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Ảnh</TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell align="right">Số lượng</TableCell>
                        <TableCell align="right">Giá</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                ></Image>
                              </Link>
                            </NextLink>
                          </TableCell>

                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Typography>{item.name}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>{item.quantity}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>{item.price}.000Đ</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography variant="h2">Tóm tắt đơn hàng</Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography> Sản phẩm: </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right"> {itemsPrice}.000Đ</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography> Tax: </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right"> {taxPrice}.000Đ</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography> Giao hàng: </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right"> {shippingPrice},000Đ</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Tổng:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      <strong> {totalPrice}.000Đ</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  onClick={placeOrderHandler}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Nơi đặt hàng
                </Button>
              </ListItem>
              {loading && (
                <ListItem>
                  <CircularProgress />
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
