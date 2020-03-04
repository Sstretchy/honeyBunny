import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Constants from '../../consts';
import {
  Grid,
  Button,
  Box,
  Typography,
  IconButton,
  Paper,
  CircularProgress
} from '@material-ui/core';
import sad from '../../sad.png';
import './backet.css';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class Backet extends React.Component {
  async componentDidMount() {
    this.props.store.basket.fetchBasket(3)
    const { setSumma } = this.props.store.basket;
    setSumma()
  }

  toPath = (path) => {
    this.props.history.push(path);
  }

  render() {
    const {
      basket = [],
      addProduct,
      removeFromBasket,
      reduceProduct,
      summa = 0,
      status,
      setOrder
    } = this.props.store.basket;

    return (
      <>
        {
          !basket.length ?
            <Grid
              container
              justify='center'
            >
              <img
                className='footer-img'
                src={sad}
                alt="Logo"
                style={{ width: '100%', maxWidth: '250px' }}
              />
              <Box className='empty-backet-container'>
                <Box className='chalk-font-35'>Корзина пока что пуста</Box>
                <Box className='chalk-font-25'>Вернитесь в каталог, чтобы продолжить свои покупки</Box>
                <Button
                  onClick={() => this.toPath('/catalog')}
                  color='primary'
                  variant='outlined'
                >Вернуться в каталог
                            </Button>
              </Box>
            </Grid>
            :
            <Grid
              container
              direction='row'
              wrap='nowrap'
              alignItems='flex-start'
            >
              <Grid
                item
                xs={8}
              >
                <Paper className='main-basket-container'>
                  <List>
                    <ListItem>
                      <ListItemText>
                        <Typography variant='h5'>Сейчас в корзине:</Typography>
                      </ListItemText>
                    </ListItem>
                    {
                      basket.length ? basket.map((item, index) => (
                        <React.Fragment key={index}>
                          <Divider />
                          <Box
                            className='list-basket'>
                            <Box>
                              <Typography
                                variant='h6'>
                                {item.name}
                              </Typography>
                              <Typography>
                                {`${item.type}, ${item.price}₽ ${item.forHowMuch}`}
                              </Typography>
                            </Box>
                            <Box className='cart-item-container'>
                              <IconButton
                                disabled={status}
                                onClick={() => removeFromBasket(index)}
                                className='iconButton-padding-off'
                              >
                                <DeleteForeverIcon
                                  color='secondary'
                                  fontSize='large'
                                />
                              </IconButton>
                              <Box className='cart-container'>
                                <IconButton
                                  disabled={status}
                                  onClick={() => reduceProduct(index)}
                                  className='iconButton-padding-off'
                                >
                                  <RemoveCircleIcon
                                    color='secondary'
                                    fontSize='large'
                                  />
                                </IconButton>
                                <InputBase
                                  readOnly
                                  value={item.count}
                                  className='text-align-center'
                                />
                                <IconButton
                                  disabled={status}
                                  onClick={() => addProduct(index)}
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
                </Paper>
              </Grid>
              <Grid
                item
                xs={4}
              >
                <Paper className='sum-of-order-container'>
                  <Box className='basket-alert-container'>
                    <Typography
                      className='typography-margin-20'
                      variant="h4">
                      {`Сумма покупки: ${summa} рублей`}
                    </Typography>
                    {
                      status ?
                        <>
                          <Typography
                            className='typography-margin-20'
                            variant="h5">
                            Доставляется
                                                    </Typography>
                          <CircularProgress
                            size={80}
                            className='progress-margin'
                            color='secondary'
                          />
                          <Button
                            className='button-margin-20'
                            onClick={setOrder}
                            color='secondary'
                            variant='contained'
                          >
                            Отменить заказ
                                                </Button>
                        </>
                        :
                        <>
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
                                variant='contained'>
                                {status ? 'Отменить заказ' : 'Оформить заказ'}
                              </Button>
                          }
                        </>
                    }
                  </Box>
                </Paper>
              </Grid>
            </Grid>
        }
      </>
    );
  }
}

export default Backet;