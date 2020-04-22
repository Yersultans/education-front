import React, { PureComponent } from 'react';
import Link from 'next/link';
import { compose } from 'recompact';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import { withRouter } from 'next/router';
import Images from '../theme/Images';

const { logo } = Images;

const Menu = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 30vw;
  height: 100vh;
  display: flex;
  overflow: auto;
  flex-direction: column;
  align-self: flex-start;
`;
const StyledImg = styled.img`
  align-self: center;
  margin-top: 16px;
`;
const TeacherInfoDiv = styled.div`
  background-color: white;
  margin: 40px;
  padding: 25px;
  border-radius: 8px;
`;
const StyledName = styled.h3`
  font-weight: 200 !important;
  font-size: 20px;
  line-height: 24px;
  color: #333;
`;

const StyledSchoolText = styled.p`

`;
const StyledTab = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  width: 70%;
  margin: 20px 50px 0 50px;
  padding: 10px;
  cursor: pointer;
  ${p => p.selected && `
    background: rgba(23, 70, 221, 0.1);
    border-radius: 8px;
  `};

  :hover {
    background: rgba(23, 70, 221, 0.1);
    border-radius: 8px;
  }
`;

const StyledIcon = styled(ReactSVG)`
  ${p => p.selected
    && `
    path{
      fill: #1746DD;
      fill-opacity: 1;
    }
  `}
`;

const TabText = styled.div`
  color: rgba(36, 45, 52, 0.5);
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  align-self: center;
  margin-left: 10px;
  margin-top: 1px;
  ${p => p.selected
    && `
    color: #1746DD;
  `}
`;
const LogOutTab = styled(StyledTab)`
  margin: auto 60px 50px 50px;
`;

const links = [
  {
    label: 'Classes',
    url: '/classes',
    iconUrl: '',
    dot: false,
    allowedUsers: ['schoolAdmin', 'teacher'],
  },
  {
    label: 'Categories',
    url: '/categories',
    iconUrl: '',
    dot: false,
    allowedUsers: ['schoolAdmin', 'schoolUser', 'teacher', 'admin', 'user', 'contentManager'],
  },
  {
    label: 'Projects',
    url: '/projects',
    iconUrl: '',
    dot: false,
    allowedUsers: ['schoolAdmin', 'schoolUser', 'teacher', 'admin', 'user', 'contentManager'],
  },
  {
    label: 'Lessons',
    url: '/sessions',
    dot: false,
    allowedUsers: ['schoolAdmin', 'teacher', 'schoolUser'],
  },
  {
    label: 'Courses',
    url: '/ncourse',
    dot: false,
    allowedUsers: ['contentManager', 'teacher'],
  },
  {
    label: 'Admin',
    url: '/admin',
    dot: false,
    allowedUsers: ['schoolAdmin'],
  },
  {
    label: 'SchoolUsers',
    url: '/schoolUsers',
    dot: false,
    allowedUsers: ['schoolAdmin'],
  },
  {
    label: 'Teachers',
    url: '/teachers',
    iconUrl: '',
    dot: false,
    allowedUsers: ['schoolAdmin', 'admin'],
  },
  {
    label: 'NLesson',
    url: '/nlesson',
    dot: false,
    allowedUsers: ['contentManager'],
  },
];

class NMenu extends PureComponent {
  renderLinks = (user, pathname) => {
    const linksByRole = links.filter(link => user && link.allowedUsers.includes(user.role));
    return linksByRole.map(({ url, label }) => (
      <Link
        key={label}
        href={{
          pathname: url, query: {}, shallow: true,
        }}
        passHref
      >
        <StyledTab
          selected={pathname === '/' ? !url.indexOf('/projects') : label.indexOf(label) === url.indexOf(pathname)}
          isCurrent={pathname === url}
        >
          <StyledIcon
            src={`static/images/${label}.svg`}
            selected={pathname === '/' ? !url.indexOf('/projects') : label.indexOf(label) === url.indexOf(pathname)}
          />
          <TabText selected={pathname === '/' ? !url.indexOf('/projects') : label.indexOf(label) === url.indexOf(pathname)}>{label}</TabText>
        </StyledTab>
      </Link>
    ));
  };

  render() {
    const { user, router, onLogoutButtonClick } = this.props;
    return (
      <Menu>
        <StyledImg src={logo} />
        <TeacherInfoDiv>
          <StyledName>{`${user.firstName} ${user.lastName}`}</StyledName>
          <StyledSchoolText>{user.school ? user.school.name : user.role}</StyledSchoolText>
        </TeacherInfoDiv>
        {this.renderLinks(user, router.pathname)}
        <LogOutTab onClick={onLogoutButtonClick} href="/login">
          <img src="static/images/logout.svg" alt="Logout" />
          <TabText>Logout</TabText>
        </LogOutTab>
      </Menu>
    );
  }
}

NMenu.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    school: PropTypes.oneOfType([
      PropTypes.shape({
        name: PropTypes.string,
      }),
      PropTypes.string,
    ]).isRequired,
    role: PropTypes.string,
  }).isRequired,
  router: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  onLogoutButtonClick: PropTypes.func.isRequired,
};

NMenu.defaultProps = {
  router: {
    pathname: '',
  },
};

const mapStateToProps = ({ auth }) => ({ user: auth.user });
const withState = connect(
  mapStateToProps,
  null,
);
const EnchantedMenu = compose(
  withRouter,
  withState,
)(NMenu);

export default EnchantedMenu;
