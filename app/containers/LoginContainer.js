
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Login } from '../components';

const LoginContainer = ({ router, user }) => {
  const handleDidUserLogin = () => {
    switch (user.role) {
      case 'schoolAdmin':
        return router.push('/admin');
      case 'teacher':
        return router.push('/sessions');
      default:
        return router.push('/projects');
    }
  };

  return <Login onDidUserLogin={handleDidUserLogin} />;
};

LoginContainer.propTypes = {
  router: PropTypes.shape({ push: PropTypes.func }).isRequired,
  user: PropTypes.shape({
    role: PropTypes.string,
  }),
};
LoginContainer.defaultProps = {
  user: null,
};

const mapStateToProps = ({ auth }) => ({ user: auth.user });

export default connect(mapStateToProps, null)(LoginContainer);
