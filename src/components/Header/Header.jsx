import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '../../components/Button/Button';
import HeaderStyles from '../../assets/jss/headerStyles';
import logo from '../../assets/img/logo.png';

const Header = props => {
  const { actions, classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <div className={classes.grow}>
            <img src={logo} alt="logo" className={classes.logo} />
          </div>
          {Boolean(actions.length) &&
            actions.map(action => <Button key={action.title} {...action} />)
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.shape().isRequired,
};

Header.defaultProps = {
  actions: [],
};

export default withStyles(HeaderStyles)(Header);
