import React from 'react';
import PropTypes from 'prop-types';
import { LoginUserContainer } from 'containers';

class Login extends React.PureComponent {
  static propTypes = {
    onDidUserLogin: PropTypes.func.isRequired,
  };

  handleDidUserLogin = () => {
    this.props.onDidUserLogin();
  }

  render() {
    return <LoginUserContainer onDidUserLogin={this.handleDidUserLogin} />;
  }
}

export default Login;
