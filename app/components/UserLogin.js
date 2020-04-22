import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LoginForm } from 'components';

class UserLogin extends Component {
  static propTypes = {
    onLoginButtonClick: PropTypes.func.isRequired,
  };

  state = { error: false };

  handleError = (isError) => {
    this.setState({ error: isError });
  };

  handleLoginButtonClick = async (values) => {
    try {
      await this.props.onLoginButtonClick(values);
      this.handleError(false);
    } catch (err) {
      this.handleError(true);
    }
  };

  render() {
    const { error } = this.state;
    return (
      <LoginForm
        onLoginButtonClick={this.handleLoginButtonClick}
        handleError={this.handleError}
        error={error}
      />
    );
  }
}

export default UserLogin;
