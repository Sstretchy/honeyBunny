import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Grid,
  LinearProgress,
  Link,
  Paper,
  TextField,
  Toolbar,
} from '@material-ui/core';
import Constants from '../../consts';
import { Validator } from '../../services/validator';
import { inject, observer } from 'mobx-react';
import { requestService } from '../../services/request.service';
import logotip from '../../logotip.png';

@inject('store')
@observer
class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordRepeat: '',

      firstNameError: undefined,
      lastNameError: undefined,
      emailError: undefined,
      passwordError: undefined,
      passwordRepeatError: undefined,

      isRequesting: false,
    };
  }

  validateForm = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordRepeat,
    } = this.state;

    const firstNameError = Validator.isValidName(firstName).message;
    const lastNameError = Validator.isValidName(lastName).message;
    const emailError = Validator.isEmail(email).message;
    const passwordError = Validator.isValidPassword(password).message;
    const passwordRepeatError = password !== passwordRepeat && Constants.messages.passwordRepeatError;

    this.setState({
      firstNameError,
      lastNameError,
      emailError,
      passwordError,
      passwordRepeatError,
    });

    return !(
      firstNameError ||
      lastNameError ||
      emailError ||
      passwordError ||
      passwordRepeatError
    );
  };

  signUp = async () => {
    const { history } = this.props;
    const {
      firstName,
      lastName,
      email,
      password,
    } = this.state;

    const isValid = this.validateForm();

    if (!isValid) {
      return;
    }
    try {
      const data = await requestService.auth.signUp({
        firstName,
        lastName,
        login: email,
        email,
        password,
      });
      history.push('/login');
      console.log(data)
    } catch (signInError) {
      throw new Error(signInError);
    }
  };

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordRepeat,

      firstNameError,
      lastNameError,
      emailError,
      passwordError,
      passwordRepeatError,

      isRequesting,
    } = this.state;

    return (
      <Box className='bg-layout'>
        <Paper
          elevation={1}
          className='signup-position paper-padding-off'
        >
          <AppBar
            color='secondary'
            position='static'
          >
            <Toolbar>
              <img
                alt="logo"
                className='footer-img cursor-pointer'
                src={logotip}
                style={{ width: '170px' }}
              />
            </Toolbar>
          </AppBar>
          <Paper
            square={true}
            className='paper-padding-off'
          >
            <Grid className='linear-progress'>
              <LinearProgress
                color='secondary'
                hidden={!isRequesting}
              />
            </Grid>
            <form className='login-padding'>
              <Grid
                container
                direction='column'
                justify='center'
                alignItems='stretch'
              >
                <TextField
                  color='secondary'
                  error={!!firstNameError}
                  helperText={firstNameError}
                  onChange={this.onChange}
                  label='Имя'
                  type='text'
                  name='firstName'
                  value={firstName}
                  className='margin-field underline-color'
                  disabled={isRequesting}
                />
                <TextField
                  color='secondary'
                  error={!!lastNameError}
                  helperText={lastNameError}
                  onChange={this.onChange}
                  label='Фамилия'
                  type='text'
                  name='lastName'
                  value={lastName}
                  className='margin-field underline-color'
                  disabled={isRequesting}
                />
                <TextField
                  color='secondary'
                  error={!!emailError}
                  helperText={emailError}
                  onChange={this.onChange}
                  label='Email'
                  type='email'
                  name='email'
                  value={email}
                  className='margin-field underline-color'
                  disabled={isRequesting}
                />
                <TextField
                  color='secondary'
                  error={!!passwordError}
                  helperText={passwordError}
                  onChange={this.onChange}
                  label='Пароль'
                  type='password'
                  name='password'
                  value={password}
                  className='margin-field underline-color'
                  disabled={isRequesting}
                />
                <TextField
                  color='secondary'
                  error={!!passwordRepeatError}
                  helperText={passwordRepeatError}
                  onChange={this.onChange}
                  label='Подтверждение пароля'
                  type='password'
                  name='passwordRepeat'
                  value={passwordRepeat}
                  className='underline-color'
                  disabled={isRequesting}
                />
              </Grid>
              <Grid
                className='margin-button-login'
                container
                alignItems='baseline'
                justify='space-between'
              >
                <Link
                  color='secondary'
                  href='/login'
                >
                  Уже есть аккаунт? Войдите :)
                </Link>
                <Button
                  onClick={this.signUp}
                  disabled={isRequesting}
                  color='secondary'
                  variant='contained'
                  size='large'
                >
                  Зарегистрироваться
                </Button>
              </Grid>
            </form>
          </Paper>
        </Paper>
      </Box>
    );
  }
}

export default SignUp;
