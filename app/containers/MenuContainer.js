import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { NMenu } from '../components';
import { logoutUser } from '../actions';

class MenuContainer extends React.PureComponent {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    linksHidden: PropTypes.bool.isRequired,
  };

  handleLogoutButtonClick = () => {
    const { logout } = this.props;
    Router.push('/login');
    logout();
  };

  render() {
    const { linksHidden } = this.props;
    return (
      !linksHidden && (
        <NMenu
          {...this.props}
          onLogoutButtonClick={this.handleLogoutButtonClick}
        />
      )
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => logoutUser(dispatch),
});

export default connect(null, mapDispatchToProps)(MenuContainer);
