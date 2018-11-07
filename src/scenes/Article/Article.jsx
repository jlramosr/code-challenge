import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Home from '@material-ui/icons/Home';
import Header from '../../components/Header/Header';
import ArticleStyles from '../../assets/jss/articleStyles';

const Article = () => {
  const { classes } = this.props;
  return (
    <div className={classes.root}>
      <Header
        actions={[
          { to: '/', title: 'Home', icon: Home },
        ]}
      />
    </div>
  );
};

Article.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(ArticleStyles)(Article);
