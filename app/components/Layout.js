import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MenuContainer } from 'containers';
import i18n from '../i18n';
import LocaleDropdown from './LocaleDropdown';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: #f0f2f5;
`;

const ContentContainer = styled.div`
  min-height: calc(100vh - 64px - 144px);
  width: 100%;
`;

const LocaleButton = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 112;
`;

const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
};

const Layout = ({ children, router: { pathname }, auth }) => {
  const isLearn = pathname.indexOf('/learn') >= 0;
  const isNLearn = pathname.indexOf('/nlearn') >= 0;
  const isDetail = pathname.indexOf('/detail') >= 0;
  const isAdmin = auth.user && auth.user.role === 'admin';
  const isSchoolUser = auth.user && (auth.user.role === 'schoolUser');
  const loggedIn = (auth.user && auth.user._id);

  return (
    <Container>
      {loggedIn && <MenuContainer linksHidden={isLearn || isNLearn || isDetail} />}
      <ContentContainer maxWidth={!isLearn}>{children}</ContentContainer>
      {!isLearn && isAdmin && (
        <LocaleButton>
          <LocaleDropdown onClick={changeLanguage} />
        </LocaleButton>
      )}
    </Container>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

Layout.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.shape({
      _id: PropTypes.string,
      role: PropTypes.string,
    }),
  }).isRequired,
  children: PropTypes.node.isRequired,
  router: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

Layout.defaultProps = {
  router: {
    pathname: '',
  },
};

export default connect(mapStateToProps)(Layout);
