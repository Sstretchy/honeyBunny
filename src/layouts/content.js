import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../containers/main';
import Catalog from '../containers/catalog';
import Backet from '../containers/backet';
import { withRouter } from 'react-router';
import Order from '../containers/order';
import AboutShop from '../containers/about.shop'
import Contacts from '../containers/contacts';
import Login from '../containers/login';
import SignUp from '../containers/signup';
import {
    Grid,
    Box
} from '@material-ui/core';
import notFound from '../404.png';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class Content extends React.Component {
    render() {
        return (
            <Switch>
                <Route
                    path='/'
                    exact
                    component={Main}
                />
                <Route
                    path='/catalog'
                    exact
                    component={Catalog}
                />
                <Route
                    path='/backet'
                    exact
                    component={Backet}
                />
                <Route
                    path='/order'
                    exact
                    component={Order}
                />
                <Route
                    path='/login'
                    exact
                    component={Login}
                />
                <Route
                    path='/signup'
                    exact
                    component={SignUp}
                />
                <Route
                    path='/contacts'
                    exact
                    component={Contacts}
                />
                <Route
                    path='/aboutshop'
                    exact
                    component={AboutShop}
                />
                <Route
                    component={() => {
                        return (
                            <Grid
                                container
                                direction='column'
                                alignItems='center'
                            >
                                <img
                                    className='footer-img'
                                    src={notFound}
                                    alt="Logo"
                                    style={{ width: '100%', maxWidth: '600px' }}
                                />
                                <Box
                                    className='chalk-font-35'>
                                    Страница не найдена
                                    </Box>
                            </Grid>
                        )
                    }}
                />
            </Switch>
        );
    }
}

export default withRouter(Content);
