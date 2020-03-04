import React from 'react';
import {
  Grid,
  IconButton,
  Typography
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import logotip from '../logotip.png';
import { withRouter } from 'react-router';
import './layouts.css';
import BacketAlert from '../containers/backet.alert';


class Header extends React.Component {
  toPath = () => {
    if (localStorage.getItem('jwt')) {
      localStorage.clear();
      this.props.history.push('/login')
    } else {
      this.props.history.push('/login')
    }
  }
  render() {
    return (
      <Grid
        container
        justify='space-between'
      >
        <img
          className='footer-img cursor-pointer'
          onClick={() => this.props.history.push('/')}
          src={logotip}
          alt="Logo"
          style={{ width: '170px' }}
        />
        <Grid>
          <IconButton onClick={this.toPath}>
            <ExitToAppIcon color='primary' />
            <Typography color='primary'>&nbsp;{localStorage.getItem('jwt') ? 'Выйти' : 'Войти'}</Typography>
          </IconButton>
          <BacketAlert />
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(Header);