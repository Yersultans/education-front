import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withNamespaces } from 'react-i18next';
import {
  Form, Icon, Input, Button,
} from 'antd';

const FormItem = Form.Item;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  max-width: 1024px;
  z-index: 1;
  margin: auto;
  height: calc(100vh - 144px - 64px);

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 24px;
  }
`;

const Title = styled.p`
  font-size: 48px;
  margin-bottom: 24px;
  color: #333;
  margin-top: -68px;
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  color: red;
  text-align: center;
`;

const RightDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  align-items: center;

  @media (max-width: 768px) {
    padding-top: 24px;
    width: 100%;
  }
`;

const LeftDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 40%;
  margin-right: 10%;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  z-index: 1;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const StyledForm = styled(Form)`
  background: #fff;
  width: 100%;
  padding: 24px;

  & > .ant-form-item {
    padding: 0;
    margin-bottom: 16px;

    &:last-child {
      margin-top: 32px;
      margin-bottom: 0;
    }
  }
`;

const StyledInput = styled(Input)`
  height: 40px;

  input {
    font-family: 'Roboto', sans-serif;
    border-radius: 0 !important;
  }
`;

/* stylelint-disable */
const Circle = styled.svg`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 15vw;
  height: 15vw;
  -webkit-clip-path: circle(100% at 0 0);
  clip-path: circle(100% at 0 0);
  background-color: #fb5237;
`;

const Triangle = styled.svg`
  position: fixed;
  bottom: 0;
  width: 15vw;
  height: 15vw;
  z-index: 0;
  right: 0;
  background-color: #1746dd;
  -webkit-clip-path: polygon(100% 0, 0 100%, 100% 100%);
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
`;
/* stylelint-enable */

const StyledIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
`;

const LoginButton = styled(Button)`
  width: 100%;
  border-radius: 0 !important;
  height: 40px;
`;

class LoginForm extends Component {
  state = {
    loading: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.handleEdit();
    }
  }

  handleSubmit = (e) => {
    const { form, onLoginButtonClick } = this.props;
    e.preventDefault();
    this.setState({ loading: true });
    form.validateFields((err, values) => {
      if (!err) {
        onLoginButtonClick(values);
      }
    });
  };

  handleEdit = () => {
    const { loading } = this.state;
    const { error, handleError } = this.props;
    if (loading) {
      this.setState({ loading: false });
    }
    if (error) {
      handleError(false);
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
      error,
      t,
      title,
    } = this.props;
    const { loading } = this.state;
    return (
      <Container>
        <Circle />
        <Triangle />
        <LeftDiv>{t('loginPage.greetings')}</LeftDiv>
        <RightDiv>
          <Title>{title || t('loginPage.label')}</Title>
          <StyledForm onSubmit={this.handleSubmit} onChange={this.handleEdit} layout="vertical">
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: t('loginPage.loginWarning') }],
              })(
                <StyledInput
                  prefix={<StyledIcon type="user" />}
                  placeholder={t('loginPage.loginPlaceholder')}
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: t('loginPage.passwordWarning') }],
              })(
                <StyledInput
                  prefix={<StyledIcon type="lock" />}
                  type="password"
                  placeholder={t('loginPage.passwordPlaceholder')}
                />,
              )}
            </FormItem>
            {error && <ErrorMessage>{t('loginPage.loginError')}</ErrorMessage>}
            <FormItem>
              <LoginButton loading={loading} type="primary" htmlType="submit">
                {t('loginPage.loginButtonLabel')}
              </LoginButton>
            </FormItem>
          </StyledForm>
        </RightDiv>
      </Container>
    );
  }
}

LoginForm.propTypes = {
  title: PropTypes.string,
  error: PropTypes.bool.isRequired,
  handleError: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  form: PropTypes.shape({
    validateFields: PropTypes.func,
    getFieldDecorator: PropTypes.func,
  }).isRequired,
  onLoginButtonClick: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  title: '',
};

const WrappedLoginForm = Form.create()(LoginForm);

const EnchantedLogin = withNamespaces()(WrappedLoginForm);

export default EnchantedLogin;
