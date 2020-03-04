import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import StoreIcon from '@material-ui/icons/Store';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PaymentIcon from '@material-ui/icons/Payment';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import { withRouter } from 'react-router';

class Navigation extends React.Component {
  links = [
    { link: '/catalog', name: 'Каталог', icon: StoreMallDirectoryIcon },
    { link: '/contacts', name: 'Контакты', icon: ContactPhoneIcon },
    { link: '/aboutshop', name: 'О магазине', icon: StoreIcon },
    { link: '/', name: 'Бесплатная доставка', icon: LocalShippingIcon },
    { link: '/', name: 'Оплата заказа', icon: PaymentIcon },
    { link: '/', name: 'Как купить', icon: ContactSupportIcon },
  ];

  toPath = (link) => {
    this.props.history.push(link);
  }

  render() {
    return (
      <>
        <Divider />
        <List>
          {this.links.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                button
                onClick={() => this.toPath(item.link)}
              >
                <ListItemIcon>
                  {<item.icon color='primary' />}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </>
    );
  }
}

export default withRouter(Navigation);