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
    Toolbar
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import logotip from '../../logotip.png';
import './login.css';
import { requestService } from '../../services/request.service';
import { addJWT } from '../../services/request.service/request.builder';

@inject('store')
@observer
class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            isRequesting: false,
        };
    }

    onLogin = async () => {
        const { login, password } = this.state;
        try {
            const accessToken = await requestService.auth.signIn({
                login,
                password,
            });
            console.log(accessToken)
            addJWT(accessToken);
            this.props.history.push('/');
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
            login,
            password,
            isRequesting,
        } = this.state;

        return (
            <Box className='bg-layout'>
                <Paper
                    elevation={1}
                    className='login-position paper-padding-off'
                >
                    <AppBar
                        color='secondary'
                        position='static'
                    >
                        <Toolbar>
                            <img
                                alt="description"
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
                                    id='login-standard-input'
                                    label='E-mail'
                                    type='text'
                                    name='login'
                                    value={login}
                                    disabled={isRequesting}
                                    onChange={this.onChange}
                                    className='margin-field underline-color'
                                />
                                <TextField
                                    id='password-standard-input'
                                    label='Пароль'
                                    type='password'
                                    name='password'
                                    value={password}
                                    disabled={isRequesting}
                                    onChange={this.onChange}
                                    className='underline-color'
                                    color='secondary'
                                />
                            </Grid>
                            <Grid
                                container
                                alignItems='baseline'
                                justify='space-between'
                                className='margin-button-login'
                            >
                                <Link color='secondary' href='/signup'>Нет учетной записи? Зарегистрироваться!</Link>
                                <Button
                                    color='secondary'
                                    variant='contained'
                                    size='large'
                                    onClick={this.onLogin}
                                    disabled={!login || !password || isRequesting}
                                >
                                    Войти
                            </Button>
                            </Grid>
                        </form>
                    </Paper>
                </Paper>
            </Box>
        );
    }
}

export default Login;
