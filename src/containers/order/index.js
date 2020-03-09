import React from 'react';
import { Redirect } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import './order.css';
import {
    Grid,
    Button,
    Typography,
    Paper,
    TextField,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { requestService } from '../../services/request.service';

@inject('store')
@observer
class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wayOfPaiment: 'card',
            oddMoney: undefined,
            address: '',
            porch: '',
            floor: '',
            apartment: '',
            comment: '',
            firstName: localStorage.getItem('firstName') || '',
            lastName: localStorage.getItem('lastName') || '',
            phone: '',
            email: '',
        };
    }

    setOrder = async () => {
        const {
            wayOfPaiment,
            oddMoney,
            address,
            porch,
            floor,
            apartment,
            comment,
            firstName,
            lastName,
            phone,
            email,
        } = this.state;
        try {
            await requestService.order.postOrder(
                {
                    wayOfPaiment,
                    oddMoney,
                    address,
                    porch,
                    floor,
                    apartment,
                    comment,
                    firstName,
                    lastName,
                    phone,
                    email,
                }
            );
            await requestService.basket.clearBasket();
            this.props.store.basket.setToStore('basket', [])
            this.props.history.push('success')
        } catch (signInError) {
            console.log('Ошибка при получении корзины');
        }
    }

    changeWayOfPaiment = event => {
        const value = event.target.value;
        this.setState({ wayOfPaiment: value })
        if (value === 'card') {
            this.setState({ oddMoney: undefined })
        } else {
            this.setState({ oddMoney: '500' })
        }
    };

    oddMoney = event => {
        console.log(232)
        this.setState({ oddMoney: event.target.value })
    }

    ChangeInfo = event => {
        const { name, value } = event.target;
        if (value.length < 500) {
            this.setState({ [name]: value })
        }
    }


    componentDidMount() {
        const { setSumma } = this.props.store.basket;
        setSumma()
    }

    toCataloge = () => {
        this.props.history.push('/catalog');
    }
    render() {
        const {
            summa = 0,
            status,
        } = this.props.store.basket;

        const {
            address,
            porch,
            floor,
            apartment,
            comment,
            firstName,
            lastName,
            phone,
            email,
        } = this.state;

        const disabled = address && firstName && lastName && phone;

        if (status) {
            return <Redirect to='/backet' />;
        }

        return (

            <Grid
                container
                direction='row'
                wrap='nowrap'
            >
                <Grid
                    item
                    xs={8}
                    component={Paper}
                    className='order-container'
                >
                    <Typography
                        className='typography-margin-20'
                        variant="h5">
                        Оформление заказа
                        </Typography>
                    <Typography
                        className='typography-margin-20'
                        variant="h6">
                        Оплата
                        </Typography>
                    <FormControl>
                        <RadioGroup
                            value={this.state.wayOfPaiment}
                            onChange={this.changeWayOfPaiment}
                        >
                            <FormControlLabel
                                value="card"
                                control={<Radio />}
                                label="Банковской картой при получении"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="cash"
                                control={<Radio />}
                                label="Наличными при получении"
                                labelPlacement="end"
                            />
                            {
                                this.state.wayOfPaiment !== 'card' &&
                                <FormControl>
                                    <Typography className='typography-margin-20'>Нужна сдача с:</Typography>
                                    <RadioGroup
                                        value={this.state.oddMoney}
                                        onChange={this.oddMoney}
                                        row
                                    >
                                        <FormControlLabel
                                            value={'500'}
                                            control={<Radio />}
                                            label="500"
                                            labelPlacement="top"
                                        />
                                        <FormControlLabel
                                            value={'1000'}
                                            control={<Radio />}
                                            label="1000"
                                            labelPlacement="top"
                                        />
                                        <FormControlLabel
                                            value={'2000'}
                                            control={<Radio />}
                                            label="2000"
                                            labelPlacement="top"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            }
                        </RadioGroup>
                    </FormControl>
                    <Typography
                        className='typography-margin-20'
                        variant="h6">
                        Доставка
                        </Typography>
                    <Typography
                        className='typography-margin-20'>
                        Адрес доставки
                        </Typography>
                    <TextField
                        required
                        label='Например, г.Ярославль, ул.Панина, дом 10'
                        value={address}
                        name='address'
                        onChange={this.ChangeInfo}
                        margin='normal'
                        color='secondary'
                        fullWidth
                        error={!address.trim()}
                        variant="filled"
                        helperText={!address.trim() && 'Поле обязательно для заполнения'}
                    />
                    <TextField
                        className='textfield-margin'
                        label='Подъезд'
                        value={porch}
                        name='porch'
                        onChange={this.ChangeInfo}
                        margin='normal'
                        color='secondary'
                        variant="filled"
                    />
                    <TextField
                        className='textfield-margin'
                        label='Этаж'
                        value={floor}
                        name='floor'
                        onChange={this.ChangeInfo}
                        margin='normal'
                        color='secondary'
                        variant="filled"
                    />
                    <TextField
                        className='textfield-margin'
                        label='Кв/Офис'
                        value={apartment}
                        name='apartment'
                        onChange={this.ChangeInfo}
                        margin='normal'
                        color='secondary'
                        variant="filled"
                    />
                    <TextField
                        label='Комментарий'
                        value={comment}
                        name='comment'
                        onChange={this.ChangeInfo}
                        margin='normal'
                        color='secondary'
                        variant="filled"
                        fullWidth
                        multiline
                        rows={4}
                    />
                    <Typography
                        className='typography-margin-20'
                        variant="h6">
                        Контактные данные
                        </Typography>
                    <Grid
                        container
                        direction='column'
                        wrap='nowrap'
                    >
                        <TextField
                            required
                            label='Имя'
                            value={firstName}
                            name='firstName'
                            onChange={this.ChangeInfo}
                            margin='normal'
                            color='secondary'
                            variant="filled"
                            error={!firstName.trim()}
                            helperText={!firstName.trim() && 'Поле обязательно для заполнения'}
                        />
                        <TextField
                            required
                            label='Фамилия'
                            value={lastName}
                            name='lastName'
                            onChange={this.ChangeInfo}
                            margin='normal'
                            color='secondary'
                            variant="filled"
                            error={!lastName.trim()}
                            helperText={!lastName.trim() && 'Поле обязательно для заполнения'}
                        />
                        <TextField
                            required
                            label='Телефон'
                            value={phone}
                            name='phone'
                            onChange={this.ChangeInfo}
                            margin='normal'
                            color='secondary'
                            variant="filled"
                            error={!phone.trim()}
                            helperText={!phone.trim() && 'Поле обязательно для заполнения'}
                        />
                        <TextField
                            label='E-mail'
                            value={email}
                            name='email'
                            onChange={this.ChangeInfo}
                            margin='normal'
                            color='secondary'
                            variant="filled"
                        />
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={4}
                    component={Paper}
                    className='order-container-center acces-order-container'
                >
                    <Typography
                        className='typography-margin-20'
                        variant="h5">
                        Подтверждение заказа
                         </Typography>
                    <Typography
                        className='typography-margin-20'
                        variant="h5">
                        {`Итог: ${summa} рублей`}
                    </Typography>
                    <Button
                        disabled={!disabled}
                        className='button-margin-20'
                        onClick={this.setOrder} color='secondary'
                        variant='contained'>
                        Оформить заказ
                          </Button>
                    <Typography
                        className='typography-margin-20' >
                        Нажимая на кнопку «Оформить заказ», на самом деле ничего не произойдет, you know?
                        </Typography>
                </Grid>
            </Grid>
        );
    }
}

export default Order;