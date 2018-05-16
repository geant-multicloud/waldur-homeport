import * as React from 'react';
import { connect } from 'react-redux';

import { removeCartItem } from '@waldur/marketplace/store/actions';

const PureShoppingCartItemDeleteButton = props => (
  <a className="btn btn-default btn-sm" onClick={props.onClick}>
    <i className="fa fa-times"/>
    {' '}
    Delete
  </a>
);

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => dispatch(removeCartItem(ownProps.item)),
  };
};

export const ShoppingCartItemDeleteButton = connect(null, mapDispatchToProps)(PureShoppingCartItemDeleteButton);
