export default theme => ({
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
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  progress: {
    marginLeft: 16,
  },
  content: {
    padding: 24,
    flex: 1,
  },
  link: {
    textDecoration: 'none',
  },
  paper: {
    display: 'flex',
    padding: 16,
    '&:hover': {
      background: '#E8EAF6',
    },
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden',
    paddingRight: 8,
  },
  itemExcerpt: {
    paddingTop: 12,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 200,
    fontSize: 12,
    fontFamily: 'Arial, "Palatino Linotype", serif',
    color: '#777',
  },
  itemActions: {
    alignSelf: 'center',
  },
});
