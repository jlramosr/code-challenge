import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import NewIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { fetchArticles, removeArticle } from '../../store/actions/articles';
import { openDialog } from '../../store/actions/ui';
import HomeStyles from '../../assets/jss/homeStyles';

class Home extends React.Component {
  state = {
    showError: false,
  }

  componentDidMount() {
    this.props.fetchArticles();
  }

  componentDidUpdate(prevProps) {
    if (this.props.error && this.props.error !== prevProps.error) {
      this.setState({ showError: true });
    }
  }

  onCloseError = () => {
    this.setState({ showError: false });
  }

  onClickNew = () => {
    this.props.openDialog(null);
  }

  onClickEdit = (event, articleId) => {
    event.preventDefault();
    this.props.openDialog(articleId);
  }

  onClickDelete = async (event, articleId) => {
    event.preventDefault();
    await this.props.removeArticle(articleId);
  }

  render() {
    const { articles, classes, error, loading } = this.props;

    return (
      <React.Fragment>
        <Header />
        <div className={classes.container}>
          <div className={classes.subheader}>
            <div className={classes.title}>
              <Typography variant="h4">Articles</Typography>
              {loading && <CircularProgress className={classes.progress} />}
            </div>
            {(!loading && !error) &&
              <Button
                size="small"
                title="New"
                variant="outlined"
                responsive
                onClick={() => this.onClickNew()}
                icon={NewIcon}
              />
            }
          </div>
          <div className={classes.content}>
            {!articles.length && !loading &&
              <Typography variant="overline">No articles found.</Typography>
            }
            <Grid container spacing={24}>
              {articles.map(article => (
                <Grid key={article.id} item xs={12} md={6} xl={4}>
                  <Link className={classes.link} to={`/${article.id}`}>
                    <Paper
                      className={classnames(
                        classes.paper,
                        !article.published && classes.unpublished,
                      )}
                    >
                      <div className={classes.itemInfo}>
                        <Typography variant="h5">{article.title}</Typography>
                        <div className={classes.itemExcerpt}>
                          {article.content}
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
          <Footer />
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.showError}
          autoHideDuration={6000}
          onClose={this.onCloseError}
          message={<span id="message-id">Error fetching articles</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.onCloseError}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape),
  classes: PropTypes.shape().isRequired,
  error: PropTypes.shape(),
  fetchArticles: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  openDialog: PropTypes.func.isRequired,
  removeArticle: PropTypes.func.isRequired,
};

Home.defaultProps = {
  articles: [],
  error: null,
  loading: true,
};

const mapStateToProps = state => {
  const { allIds, byId, flow: { errorFetchingAll, fetchingAll } } = state.articles;
  return {
    articles: allIds.map(id => byId[id]),
    error: errorFetchingAll,
    loading: fetchingAll,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchArticles: () => dispatch(fetchArticles()),
  openDialog: articleId => dispatch(openDialog(articleId)),
  removeArticle: articleId => dispatch(removeArticle(articleId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(HomeStyles)(Home),
);
