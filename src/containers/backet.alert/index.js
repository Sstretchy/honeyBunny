import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Constants from '../../consts';
import { withRouter } from 'react-router';
import {
  Box,
  IconButton,
  Button,
  Typography,
  CircularProgress
} from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import './backet.alert.css';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class BacketAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      right: false,
    };
  }

  async componentDidMount() {
    await this.props.store.basket.fetchBasket()
    const { setSumma } = this.props.store.basket;
    setSumma()
  }

  toPath = (path) => {
    this.props.history.push(path);
    this.setState({ 'right': false });
  }

  toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ ...this.state, [side]: open });
  };
  render() {
    const {
      basket = [],
      addProduct,
      removeFromBasket,
      reduceProduct,
      summa = 0,
      count,
    } = this.props.store.basket;
    return (
      <>
        <IconButton onClick={this.toggleDrawer('right', true)} >
          {count ? <Typography color='primary'>{count}&nbsp;</Typography> : <></>}
          <ShoppingBasketIcon
            color='primary'
          />
          <Typography color='primary'>&nbsp;Корзина</Typography>
        </IconButton>
        <Drawer
          className='drawer-width'
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawer('right', false)}
        >
          {localStorage.getItem('id') ?
            <div
              role="presentation"
              onKeyDown={this.toggleDrawer('right', false)}
            >
              <Box className='basket-alert-container'>
                <Typography variant="h4">Корзина</Typography>
                <Typography
                  className='typography-margin-20'
                  variant="h5">
                  {`Сумма покупки: ${summa} рублей`}
                </Typography>
                {
                  Constants.minSumOfOrder > summa ?
                    <Typography
                      className='typography-margin-20 typography-width-200'
                      variant="h5"
                    >
                      {`До минимальной суммы заказа осталось: ${Constants.minSumOfOrder - summa} рублей`}
                    </Typography>
                    :
                    <Button
                      className='button-margin-20'
                      onClick={() => this.toPath('/order')}
                      color='secondary'
                      variant='contained'
                    >
                      Оформить заказ
                                                </Button>
                }
                <Button
                  onClick={() => this.toPath('/backet')}
                  color='secondary'
                  variant='outlined'>
                  Перейти в корзину
                                  </Button>
              </Box>
              <List>
                <ListItem>
                  <ListItemText>
                    <Typography variant='h5'>Сейчас в корзине:</Typography>
                  </ListItemText>
                </ListItem>
                {basket.length ? basket.map((item, index) => (
                  <React.Fragment key={index}>
                    <Divider />
                    <Box
                      className='list-basket'
                    >
                      <Box>
                        <Typography variant='h6'>{item.good.name}</Typography>
                        <Typography>{`${item.good.category}, ${item.good.price}₽ ${item.good.measure}`}</Typography>
                      </Box>
                      <Box className='cart-item-container'>
                        <IconButton
                          onClick={() => removeFromBasket(item.id)}
                          className='iconButton-padding-off'
                        >
                          <DeleteForeverIcon
                            color='secondary'
                            fontSize='large'
                          />
                        </IconButton>
                        <Box className='cart-container'>
                          <IconButton
                            onClick={() => reduceProduct(item.id, item.amount - 1)}
                            className='iconButton-padding-off'
                          >
                            <RemoveCircleIcon
                              color='secondary'
                              fontSize='large'
                            />
                          </IconButton>
                          <InputBase
                            readOnly
                            value={item.amount}
                            className='text-align-center'
                          />
                          <IconButton
                            onClick={() => addProduct(item.id, item.amount + 1)}
                            className='iconButton-padding-off'
                          >
                            <AddCircleIcon
                              color='secondary'
                              fontSize='large'
                            />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </React.Fragment>
                )) :
                  <Box className='list-basket'>
                    <Typography variant='h6'>Пусто</Typography>
                  </Box>
                }
                <Divider />
              </List>
            </div>
            :
            <Box className='basket-alert-container'>
              <Typography variant="h5">Корзина доступна зарегистрированным пользователям</Typography>
            </Box>
          }
        </Drawer >
      </>
    );
  }
}

export default withRouter(BacketAlert);