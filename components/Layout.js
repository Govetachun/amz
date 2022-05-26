import {
  AppBar,
  Container,
  createTheme,
  CssBaseline,
  Link,
  ThemeProvider,
  Toolbar,
  Typography,
  Badge,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider,
  ListItemText,
  InputBase,
} from '@material-ui/core';
import Head from 'next/head';
import MenuIcon from '@material-ui/icons/Menu';
import CancelIcon from '@material-ui/icons/Cancel';
import SearchIcon from '@material-ui/icons/Search';
import React, { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import useStyles from '../utils/styles';
import { Store } from '../utils/Store';
import { getError } from '../utils/error';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import logo from '../utils/img/logo.png';
import Image from 'next/image';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Footer from './Footer';

function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: 'rgba(60, 51, 79, 1)',
      },
      secondary: {
        main: '#f0c14b',
      },
    },
  });
  const classes = useStyles();
  const [sildeBarVisible, setSideBarVisible] = useState(false);
  const sideOpenHander = () => {
    setSideBarVisible(true);
  };
  const sideCloseHandler = () => {
    setSideBarVisible(false);
  };
  const [categories, setCategories] = useState([]);
  const { enqueueSnackBar } = useSnackbar();
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      enqueueSnackBar(getError(err), { variant: 'error' });
    }
  };
  const [query, setQuery] = useState('');
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/');
  };
  return (
    <div className={classes.bg}>
      <Head>
        <title>{title ? `${title} - FORIA` : 'FORIA'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar className={classes.toolbar}>
            <Box display="flex" alignItems="center">
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={sideOpenHander}
                className={classes.menuButton}
              >
                <MenuIcon className={classes.navbarButton}></MenuIcon>
              </IconButton>
              <NextLink href="/" passHref>
                <Link className={classes.brand}>
                  <Image alt="logo" src={logo} />
                </Link>
              </NextLink>
            </Box>
            <Drawer
              anchor="left"
              open={sildeBarVisible}
              onClose={sideCloseHandler}
            >
              <List>
                <ListItem>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography>Shopping theo loại</Typography>
                    <IconButton aria-label="close" onClick={sideCloseHandler}>
                      <CancelIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                <Divider light />
                {categories.map((category) => (
                  <NextLink
                    key={category}
                    href={`/search?category=${category}`}
                    passHref
                  >
                    <ListItem button component="a" onClick={sideCloseHandler}>
                      <ListItemText primary={category}></ListItemText>
                    </ListItem>
                  </NextLink>
                ))}
              </List>
            </Drawer>
            <div className={classes.searchSection}>
              <form
                onSubmit={submitHandler}
                className={classes.searchForm}
                style={{ marginTop: '10px', marginBottom: '10px' }}
              >
                <InputBase
                  name="query"
                  className={classes.searchInput}
                  placeholder="Search products"
                  onChange={queryChangeHandler}
                />
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </form>
            </div>
            <div style={{ display: 'flex' }}>
              <NextLink href="/cart" passHref>
                <Link>
                  <h3
                    style={{
                      marginLeft: '45px',
                      marginRight: '30px',
                      marginTop: '0',
                      marginBottom: '0',
                    }}
                  >
                    Giỏ
                  </h3>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      <ShoppingBasketIcon style={{ marginLeft: 50 }} />
                    </Badge>
                  ) : (
                    <ShoppingBasketIcon style={{ marginLeft: 50 }} />
                  )}
                </Link>
              </NextLink>

              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    className={classes.navbarButton}
                  >
                    <h4 style={{ margin: '0' }}>Chào </h4>
                    <h5>{userInfo.name}</h5>
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/profile')}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, '/order-history')
                      }
                    >
                      Lịch sử đặt hàng
                    </MenuItem>
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, '/admin/dashboard')
                        }
                      >
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutClickHandler}>Đăng xuất</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>
                    <Typography component="span">
                      <h4 style={{ margin: '0', marginRight: 30 }}>
                        Đăng nhập
                      </h4>
                      <h4 style={{ margin: '0' }}></h4>
                    </Typography>
                  </Link>
                </NextLink>
              )}
            </div>
            <NextLink href="/login" passHref>
              <Link>
                <Typography
                  component="span"
                  style={{ justifyContent: 'center', paddingRight: '10px' }}
                >
                  <h4 style={{ margin: '0', marginTop: '20px' }}>Trả</h4>
                  <h4 style={{ margin: '0' }}>Đặt</h4>
                </Typography>
              </Link>
            </NextLink>
          </Toolbar>
        </AppBar>

        <Container className={classes.main}>{children}</Container>
      </ThemeProvider>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
