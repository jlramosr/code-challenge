import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import NewIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import request from '../../api/request';
import { ARTICLES_QUERY } from '../../api/queries';
import { openDialog } from '../../store/actions/ui';
import HomeStyles from '../../assets/jss/homeStyles';

class Home extends React.Component {
  state = {
    articles: [],
    loading: true,
  }

  async componentDidMount() {
    try {
      const { data: { articles } } = await request(ARTICLES_QUERY);
      this.setState({ articles, loading: false });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate(prevProps, prevState) {

  }

  onFieldChange = event => {
  }

  onClickNew = () => {
    this.props.openDialog({
      edit: false,
    });
  }

  onClickEdit = (event, articleId) => {
    event.preventDefault();
    this.props.openDialog({
      articleId,
      edit: true,
    });
  }

  onClickDelete = async (event, articleId) => {
    event.preventDefault();
  }

  render() {
    const { articles, loading } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Header />
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.title}>
              <Typography variant="h4">Articles</Typography>
              {loading && <CircularProgress className={classes.progress} />}
            </div>
            <Button
              size="small"
              title="New"
              variant="outlined"
              responsive
              onClick={() => this.onClickNew()}
              icon={NewIcon}
            />
          </div>
          <div className={classes.content}>
            {!articles.length && !loading &&
              <Typography variant="overline">No articles found.</Typography>
            }
            <Grid container spacing={24}>
              {articles.map(article => (
                <Grid key={article.id} item xs={12} md={6} xl={4}>
                  <Link className={classes.link} to={`/${article.id}`}>
                    <Paper className={classes.paper}>
                      <div className={classes.itemInfo}>
                        <Typography variant="h5">{article.title}</Typography>
                        <div className={classes.itemExcerpt}>
                          {article.excerpt}
                        </div>
                      </div>
                      <div className={classes.itemActions}>
                        <IconButton
                          aria-label="Edit"
                          color="primary"
                          onClick={event => this.onClickEdit(event, article.id)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="Delete"
                          color="primary"
                          onClick={event => this.onClickDelete(event, article.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </Paper>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.func.isRequired,
};

const mapStateToProps = ({ ui }) => {
  const { dialog: { success } } = ui;
  return {
    success,
  };
};

const mapDispatchToProps = dispatch => ({
  openDialog: ({ edit, articleId }) => dispatch(openDialog({
    edit,
    articleId,
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(HomeStyles)(Home),
);
