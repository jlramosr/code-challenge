export default theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 56,
    [theme.breakpoints.up('sm')]: {
      marginBottom: 64,
    },
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    maxHeight: 48,
  },
});
