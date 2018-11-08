import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Check';
import { closeDialog } from '../../store/actions/ui';
import articleDialogStyles from '../../assets/jss/articleDialogStyles';

const emptyArticle = {
  author: '',
  content: '',
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

  onRemoveTag = tagRemoved => {
    this.setState(previousState => ({ 
      tags: previousState.tags.filter(tag => tag !== tagRemoved),
    }));
  }

  onFieldChange = fieldName => event => {
    this.setState({
      [fieldName]: event.target.value,
    });
  }

  saveData = /*async*/ () => {
    const { author, content, published, tags, title } = this.state;
    const { edit, articleId } = this.props;
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
    const { author, content, published, tags, title } = this.state;
    const { articleId, classes, open } = this.props;
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
          <FormControl className={classes.field}>
            <InputLabel htmlFor="tags">Tags</InputLabel>
            <Select
              multiple
              value={tags}
              onChange={this.onFieldChange('tags')}
              input={<Input id="tags" />}
              /*renderValue={selected => {
                const tagsSelected = selected.map(tags => tags.find(tag2 => tag2 === selected))
                return (
                  <div className={classes.chips}>
                    {tagsSelected.map(tag => (
                      <Chip
                        onDelete={() => this.onRemoveTag(tag)}
                        key={tag}
                        label={tag}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )
              }}*/
            >
              {tags.map(tag => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      </Dialog>
    );
  }
}

ArticleDialog.propTypes = {
  articleId: PropTypes.string,
  classes: PropTypes.shape().isRequired,
  closeDialog: PropTypes.func.isRequired,
  open: PropTypes.bool,
  values: PropTypes.shape(),
};

ArticleDialog.defaultProps = {
  open: true,
  values: {},
};

const mapStateToProps = state => {
  const { byId } = state.articles;
  const { dialog: { articleId, open } } = state.ui;
  const values = articleId ? byId[articleId] : emptyArticle;
  return { articleId, open, values };
};

const mapDispatchToProps = dispatch => ({
  closeDialog: () => dispatch(closeDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(articleDialogStyles)(ArticleDialog),
);
