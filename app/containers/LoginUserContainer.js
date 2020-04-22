import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompact';

import { UserLogin } from 'components';
import { loginUser } from '../actions/index';

class LoginUserContainer extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    onDidUserLogin: PropTypes.func.isRequired,
  };

  handleLoginButtonClick = async (values) => {
    try {
      await this.props.loginUser(values);
      this.props.onDidUserLogin();
    } catch (err) {
      switch (err.response.status) {
        case 401: throw new Error('Username or password are incorrect');
        default: throw new Error('Server error');
      }
    }
  };

  render() {
    return (
      <UserLogin
        onLoginButtonClick={this.handleLoginButtonClick}
      />
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  loginUser: values => loginUser(values, dispatch),
});

const withState = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const EnhancedLoginUserContainer = compose(
  withState,
)(LoginUserContainer);

export default EnhancedLoginUserContainer;
