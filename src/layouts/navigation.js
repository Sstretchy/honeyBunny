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
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { withRouter } from 'react-router';

class Navigation extends React.Component {
  links = [
    { link: '/catalog', name: 'Каталог', icon: ShoppingCartIcon },
    { link: '/contacts', name: 'Контакты', icon: ContactPhoneIcon },
    { link: '/aboutshop', name: 'О магазине', icon: StoreIcon },
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