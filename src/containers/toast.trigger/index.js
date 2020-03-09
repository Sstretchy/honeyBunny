import CloseIcon from '@material-ui/icons/Close';
import ToastService from '../../services/toast.notify';
import {
  IconButton,
  Portal,
  Snackbar,
} from '@material-ui/core';
import React, { Component } from 'react';

class ToastTrigger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToastOpen: false,
      message: '',
    };
  }

  componentDidMount() {
    ToastService.addEventListener(this.handleEvent);
  }

  componentWillUnmount() {
    ToastService.removeEventListener();
  }

  closeToast = () => {
    this.setState({ isToastOpen: false, message: '' });
  };

  handleEvent = (event) => {
    const { message } = event;

    this.setState({ isToastOpen: true, message });
  }

  render() {
    return (
      <Portal>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={this.state.isToastOpen}
          autoHideDuration={5000}
          onClose={this.closeToast}
          message={this.state.message}
          action={
            <IconButton
              onClick={this.closeToast}
            >
              <CloseIcon color='primary'/>
            </IconButton>
          }
        />
      </Portal>
    );
  }
}

export default ToastTrigger;
