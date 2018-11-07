import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
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
import { closeDialog } from 'store/actions/ui';
import articleDialogStyles from '../../assets/jss/articleDialogStyles';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ArticleDialog extends React.Component {
  state = {
    author: null,
    content: null,
    published: false,
    tags: [],
    title: null,
  }

  componentDidUpdate(prevProps) {
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

  finishDialog = success => {
    this.setState({
      author: null,
      content: null,
      published: false,
      tags: [],
      title: null,
    });
    this.props.closeDialog(success);
  }

  saveData = /*async*/ () => {
    const { author, content, published, tags, title } = this.state;
    const { edit, articleId } = this.props;
  }

  closeDialog = () => {
    this.finishDialog(false);
  }

  handleClose = () => {
    this.finishDialog(false);
  };

  render() {
    const { author, content, published, tags, title } = this.state;
    const { category, classes, edit, open } = this.props;
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
              { edit ? 'Edit article' : 'New article' }
            </Typography>
            <IconButton color="inherit" aria-label="Save" onClick={this.saveData}>
              <SaveIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <form className={classes.container} noValidate autoComplete="off">
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
    )
  }
}

const mapStateToProps = ({ ui }) => {
  const { dialog: { articleId, edit, open } } = ui;
  return { articleId, edit, open };
};

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: success => dispatch(closeDialog(success)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(articleDialogStyles)(ArticleDialog)
)
