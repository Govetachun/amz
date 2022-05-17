import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  navbar: {
    background:
      'linear-gradient(to right,rgba(251,231,233), rgba(231,207,238), rgba(251,231,233),rgba(251,231,233) ,rgba(251,231,233),rgba(231,207,238))',
    '& a': {
      color: 'rgba(60, 51, 79, 1)',
      marginLeft: 10,
    },
  },
  bg: {
    background: 'linear-gradient(rgba(245,221,245,0.3), rgba(243,190,169,0.3))',
  },
  brand: {
    width: '70%',
    paddingTop: 10,
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: '80vh',
    marginBottom: 50,
  },
  footer: {
    marginTop: 10,
    textAlign: 'center',
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
  },
  navbarButton: {
    color: 'rgba(60, 51, 79, 1)',
    textTransform: 'initial',
  },
  transparentBackgroud: {
    backgroundColor: 'transparent',
  },
  error: {
    color: '#f04040',
  },
  fullWidth: {
    width: '100%',
  },
  reviewForm: {
    maxWidth: 800,
    width: '100%',
  },

  reviewItem: {
    marginRight: '1rem',
    borderRight: '1px #808080 solid',
    paddingRight: '1rem',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  menuButton: { padding: 0 },
  mt1: { marginTop: '1rem' },
  // search
  searchSection: {
    // display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
    },
    display: 'flex',

    alignItems: 'center',
    width: '150%',
  },
  searchForm: {
    border: '1px solid rgba(60, 51, 79, 1)',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      height: '30px',
    },
  },
  searchInput: {
    paddingLeft: 5,
    color: 'rgba(60, 51, 79, 1)',
    '& ::placeholder': {
      color: 'rgba(60, 51, 79, 1)',
    },
  },
  iconButton: {
    backgroundColor: 'rgba(60, 51, 79, 1)',
    padding: 5,
    float: 'right',
    borderRadius: '0 5px 5px 0',
    '& span': {
      color: '#ffffff',
    },
    [theme.breakpoints.down('xs')]: {
      height: '30px',
      display: 'none',
    },
  },
  sort: {
    marginRight: 5,
  },

  fullContainer: { height: '100vh' },
  mapInputBox: {
    position: 'absolute',
    display: 'flex',
    left: 0,
    right: 0,
    margin: '10px auto',
    width: 300,
    height: 40,
    '& input': {
      width: 250,
    },
  },
}));
export default useStyles;
