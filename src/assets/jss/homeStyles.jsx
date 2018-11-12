export default theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 64px)',
    [theme.breakpoints.up('sm')]: {
      minHeight: 'calc(100vh - 72px)',
    },
  },
  subheader: {
    alignItems: 'center',
    display: 'flex',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    padding: '16px 16px 4px',
    [theme.breakpoints.up('sm')]: {
      padding: '16px 24px 8px',
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
  unpublished: {
    opacity: 0.6,
    background: '#ffdddd',
    '&:hover': {
      background: '#ffcccc',
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
