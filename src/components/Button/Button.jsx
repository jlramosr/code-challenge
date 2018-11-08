import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ButtonStyles from '../../assets/jss/buttonStyles';

const ButtonContainer = props => {
  const { classes, icon, onClick, responsive, size, title, variant, width } = props;
  const showText = !responsive || width !== 'xs';
  return (
    <Button
      size={size}
      variant={variant || 'outlined'}
      color="primary"
      onClick={onClick}
      className={classes.root}
    >
      {icon &&
        <Icon
          component={icon}
          className={classnames(classes.icon, showText && classes.iconWithText)}
        />
      }
      {showText && title}
    </Button>
  );
};

const CustomButton = props => {
  const { to, ...restProps } = props;

  if (!to) {
    return <ButtonContainer {...restProps} />;
  }

  return (
    <Link className={props.classes.link} to={to}>
      <ButtonContainer {...restProps} />
    </Link>
  );
};

ButtonContainer.propTypes = {
  classes: PropTypes.shape().isRequired,
  icon: PropTypes.func,
  onClick: PropTypes.func,
  responsive: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  width: PropTypes.string,
};

CustomButton.propTypes = {
  classes: PropTypes.shape().isRequired,
  icon: PropTypes.func,
  onClick: PropTypes.func,
  responsive: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  variant: PropTypes.string,
  width: PropTypes.string,
};

CustomButton.defaultProps = {
  responsive: false,
  size: 'medium',
};

export default withWidth()(withStyles(ButtonStyles)(CustomButton));
