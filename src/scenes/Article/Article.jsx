import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Home from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import { fetchArticles, removeArticle } from '../../store/actions/articles';
import { openDialog } from '../../store/actions/ui';
import ArticleStyles from '../../assets/jss/articleStyles';

class Article extends Component {

  onClickEdit = () => {
    this.props.openDialog();
  }

  onClickDelete = async () => {
    this.props.removeArticle();
  }

  render() {
    const { classes, loading, values } = this.props;
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
            <Button
              size="small"
              title="Edit"
              variant="outlined"
              responsive
              onClick={this.onClickEdit}
              icon={EditIcon}
            />
            <Button
              size="small"
              title="Delete"
              variant="outlined"
              responsive
              onClick={this.onClickDelete}
              icon={DeleteIcon}
            />
          </div>
        </div>
        <div className={classes.main}>
          <div className={classes.author}>
            <Typography variant="overline">by {values.author}</Typography>
          </div>
          <div className={classes.tags}>
            {values.tags.map(tag => <Chip key={tag} label={tag} className={classes.chip}/>)}
          </div>
        </div>
        <div className={classes.content}>
          <Typography>{values.content}</Typography>
        </div>
      </div>
    );
  }
}

Article.propTypes = {
  classes: PropTypes.shape().isRequired,
  loading: PropTypes.bool,
  openDialog: PropTypes.func.isRequired,
  removeArticle: PropTypes.func.isRequired,
  values: PropTypes.shape(),
};

Article.defaultProps = {
  loading: true,
  values: {
    tags: [],
  },
};

const mapStateToProps = (state, props) => {
  const { byId, flow: { fetchingOne } } = state.articles;
  const { match: { params } } = props;
  const articleId = params.id;
  return {
    articleId,
    loading: fetchingOne,
    values: byId[articleId],
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { match: { params } } = props;
  const articleId = params.id;
  return {
    fetchArticles: () => dispatch(fetchArticles()),
    removeArticle: () => dispatch(removeArticle(articleId)),
    openDialog: () => dispatch(openDialog(articleId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(
    withStyles(ArticleStyles)(Article),
  ),
);
