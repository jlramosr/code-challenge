import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Home from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import { fetchArticle, removeArticle } from '../../store/actions/articles';
import { openDialog } from '../../store/actions/ui';
import ArticleStyles from '../../assets/jss/articleStyles';

class Article extends Component {
  state = {
    showError: false,
  }

  componentDidMount() {
    this.props.fetchArticle();
  }

  componentDidUpdate(prevProps) {
    if (this.props.error && this.props.error !== prevProps.error) {
      this.setState({ showError: true });
    }
  }

  onCloseError = () => {
    this.setState({ showError: false });
  }

  onClickEdit = () => {
    this.props.openDialog();
  }

  onClickDelete = async () => {
    await this.props.removeArticle();
    this.props.history.push('/');
  }

  render() {
    const { classes, error, loading, values } = this.props;
    const notFound = !loading && error;
    const found = !loading && !error;
    return (
      <div className={classes.root}>
        <Header
          actions={[
            { to: '/', title: 'Home', icon: Home },
          ]}
        />
        <div className={classes.container}>
          <div className={classes.subheader}>
            <div className={classes.title}>
              <Typography variant="h4">{values.title}</Typography>
              {loading && <CircularProgress className={classes.progress} />}
            </div>
            {found &&
              <Button
                disabled
                size="small"
                title="Edit"
                variant="outlined"
                responsive
                onClick={this.onClickEdit}
                icon={EditIcon}
              />
            }
            {found &&
              <Button
                disabled
                size="small"
                title="Delete"
                variant="outlined"
                responsive
                onClick={this.onClickDelete}
                icon={DeleteIcon}
              />
            }
          </div>
        </div>
        {found && (
          <React.Fragment>
            <div className={classes.main}>
              <div className={classes.author}>
                <Typography variant="overline">by {values.author}</Typography>
              </div>
              <div className={classes.tags}>
                {values.tags.map(tag => <Chip key={tag} label={tag} className={classes.chip} />)}
              </div>
            </div>
            <div className={classes.content}>
              <Typography>{values.content}</Typography>
            </div>
          </React.Fragment>
        )}
        {notFound && (
          <Typography variant="overline">Article Not Found</Typography>
        )}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.showError}
          autoHideDuration={6000}
          onClose={this.onCloseError}
          message={<span id="message-id">Error fetching article</span>}
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
      </div>
    );
  }
}

Article.propTypes = {
  classes: PropTypes.shape().isRequired,
  error: PropTypes.shape(),
  fetchArticle: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  loading: PropTypes.bool,
  openDialog: PropTypes.func.isRequired,
  removeArticle: PropTypes.func.isRequired,
  values: PropTypes.shape(),
};

Article.defaultProps = {
  error: null,
  loading: true,
  values: {
    tags: [],
  },
};

const mapStateToProps = (state, props) => {
  const { byId, flow: { fetchingOne, errorFetchingOne } } = state.articles;
  const { match: { params } } = props;
  const articleId = params.id;
  return {
    articleId,
    error: errorFetchingOne,
    loading: fetchingOne,
    values: byId[articleId],
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { match: { params } } = props;
  const articleId = params.id;
  return {
    fetchArticle: () => dispatch(fetchArticle(articleId)),
    removeArticle: () => dispatch(removeArticle(articleId)),
    openDialog: () => dispatch(openDialog(articleId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(
    withStyles(ArticleStyles)(Article),
  ),
);
