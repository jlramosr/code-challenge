import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Check';
import { createArticle, updateArticle } from '../../store/actions/articles';
import { closeDialog } from '../../store/actions/ui';
import articleDialogStyles from '../../assets/jss/articleDialogStyles';

const emptyArticle = {
  author: '',
  content: '',
  newTag: '',
  published: false,
  tags: [],
  title: '',
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ArticleDialog extends React.Component {
  state = emptyArticle;

  componentDidUpdate(prevProps) {
    const { open, values } = this.props;
    if (open && (prevProps.open !== open)) {
      this.setState(values);
    }
  }

  onAddTag = () => {
    this.setState(previousState => ({
      newTag: '',
      tags: [...previousState.tags, previousState.newTag],
    }));
  }

  onRemoveTag = tagRemoved => {
    this.setState(previousState => ({
      tags: previousState.tags.filter(tag => tag !== tagRemoved),
    }));
  }

  onFieldChange = fieldName => event => {
    this.setState({
      [fieldName]: event.target[fieldName === 'published' ? 'checked' : 'value'],
    });
  }

  saveData = () => {
    const { articleId } = this.props;
    const { newTag, ...data } = this.state;
    if (articleId) {
      this.props.updateArticle(articleId, data);
    } else {
      this.props.createArticle(data);
    }
    this.finishDialog();
  }

  finishDialog = () => {
    this.setState(emptyArticle);
    this.props.closeDialog();
  }

  closeDialog = () => {
    this.finishDialog();
  }

  handleClose = () => {
    this.finishDialog();
  };

  render() {
    const { author, content, newTag, published, tags, title } = this.state;
    const { articleId, classes, loading, open } = this.props;
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={this.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton color="inherit" aria-label="Close" onClick={this.closeDialog}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              { articleId ? 'Edit article' : 'New article' }
            </Typography>
            {loading && <CircularProgress />}
            <IconButton
              disabled={!author || !title}
              color="inherit"
              aria-label="Save"
              onClick={this.saveData}
            >
              <SaveIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <form className={classes.container} noValidate autoComplete="off">
          <FormControlLabel
            className={classes.field}
            control={
              <Checkbox
                checked={published}
                onChange={this.onFieldChange('published')}
                value="published"
              />
            }
            label="Published"
          />
          <TextField
            id="title"
            label="Title"
            className={classes.field}
            value={title}
            onChange={this.onFieldChange('title')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="author"
            label="Author"
            value={author}
            className={classes.field}
            onChange={this.onFieldChange('author')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="content"
            label="Content"
            value={content}
            multiline
            rows="4"
            className={classes.field}
            onChange={this.onFieldChange('content')}
            margin="normal"
            variant="outlined"
          />
          <div className={classes.tags}>
            <div className={classes.tagsTitle}>
              <Typography variant="h6">Tags</Typography>
            </div>
            <div className={classes.tagsChips}>
              {tags.map(tag => (
                <Chip
                  onDelete={() => this.onRemoveTag(tag)}
                  key={tag}
                  label={tag}
                  className={classes.chip}
                />
              ))}
            </div>
            <div className={classes.tagsNew}>
              <TextField
                id="newTag"
                label="New Tag"
                value={newTag}
                onChange={this.onFieldChange('newTag')}
                className={classes.field}
                margin="normal"
                variant="outlined"
              />
              <IconButton
                disabled={!newTag}
                color="inherit"
                aria-label="Add Tag"
                onClick={() => this.onAddTag()}
              >
                <SaveIcon />
              </IconButton>
            </div>
          </div>
        </form>
      </Dialog>
    );
  }
}

ArticleDialog.propTypes = {
  articleId: PropTypes.string,
  classes: PropTypes.shape().isRequired,
  closeDialog: PropTypes.func.isRequired,
  createArticle: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  open: PropTypes.bool,
  updateArticle: PropTypes.func.isRequired,
  values: PropTypes.shape(),
};

ArticleDialog.defaultProps = {
  loading: false,
  open: true,
  values: {},
};

const mapStateToProps = state => {
  const { byId, flow } = state.articles;
  const { dialog: { articleId, open } } = state.ui;
  const values = articleId ? byId[articleId] : emptyArticle;
  const loading = flow.changingOne;
  return { articleId, loading, open, values };
};

const mapDispatchToProps = dispatch => ({
  closeDialog: () => dispatch(closeDialog()),
  createArticle: data => dispatch(createArticle(data)),
  updateArticle: (articleId, data) => dispatch(updateArticle(articleId, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(articleDialogStyles)(ArticleDialog),
);
