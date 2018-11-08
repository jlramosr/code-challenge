import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FooterLinkStyles from '../../assets/jss/footerLinkStyles';

const FooterLink = props => {
  const { classes, img, href } = props;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img src={img} alt="link" className={classes.root} />
    </a>
  );
};

FooterLink.propTypes = {
  classes: PropTypes.shape().isRequired,
  href: PropTypes.string,
  img: PropTypes.node.isRequired,
};

export default withStyles(FooterLinkStyles)(FooterLink);
