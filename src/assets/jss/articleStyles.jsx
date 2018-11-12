export default theme => ({
  root: {
    padding: 0,
    marginTop: 64,
    [theme.breakpoints.up('sm')]: {
      marginTop: 72,
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  subheader: {
    alignItems: 'center',
    display: 'flex',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    padding: '4px 16px',
    [theme.breakpoints.up('sm')]: {
      padding: '8px 24px',
    },
    overflow: 'hidden',
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  progress: {
    marginLeft: 16,
  },
  main: {
    display: 'flex',
    padding: '12px 24px',
  },
  author: {
    overflow: 'hidden',
  },
  tags: {
    flex: 1,
    textAlign: 'right',
  },
  chip: {
    marginLeft: 8,
    marginTop: 2,
    marginBottom: 2,
  },
  content: {
    padding: '2px 16px',
  },
});
