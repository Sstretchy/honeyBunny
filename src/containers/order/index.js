import React from 'react';
import { Redirect } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Validator } from '../../services/validator';
import Constants from '../../consts';
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
import heart from '../../heart.png';

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
            secret: '',
            lena: ''
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
            secret,
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
                    comment: comment + ' Промокод: ' + secret,
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
            secret,
            lena
        } = this.state;

        const isLena = lena.toLowerCase() === 'Спиридонова'.toLowerCase();

        const disabled = address && firstName && lastName && phone
            && !Validator.isEmail(email).message && !Validator.isPhone(phone).message
            && Constants.minSumOfOrder <= summa;

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
                    <TextField
                        label='Промокод на скидку 20%'
                        placeholder='Название песни. Плачь у порога, девчонка – недотрога. Жизнь разделила железная дорога.'
                        value={secret}
                        name='secret'
                        onChange={this.ChangeInfo}
                        margin='normal'
                        color='secondary'
                        variant="filled"
                        fullWidth
                        autoFocus
                        multiline
                        rows={1}
                    />
                    {secret.toLowerCase() == 'Электричка'.toLowerCase() ?
                        <TextField
                            label='Отлично!'
                            placeholder='А напомните-ка еще раз Вашу фамилию ;)'
                            value={lena}
                            name='lena'
                            onChange={this.ChangeInfo}
                            margin='normal'
                            color='secondary'
                            variant="filled"
                            fullWidth
                            autoFocus
                        /> : <></>}
                    {isLena ? <img
                        className='footer-img'
                        src={heart}
                        alt="Logo"
                        style={{ width: '100px', position: 'fixed', top: '80px', alignSelf: 'center' }}
                    /> : <></>}
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
                                        <FormControlLabel
                                            value={'5000'}
                                            control={<Radio />}
                                            label="5000"
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
                        placeholder='Например, г.Ярославль, ул.Панина, дом 10'
                        label='Адрес'
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
                            label='Мобильный телефон'
                            value={phone}
                            name='phone'
                            onChange={this.ChangeInfo}
                            margin='normal'
                            color='secondary'
                            variant="filled"
                            error={Validator.isPhone(phone).message}
                            helperText={Validator.isPhone(phone).message}
                        />
                        <TextField
                            label='E-mail'
                            value={email}
                            name='email'
                            onChange={this.ChangeInfo}
                            margin='normal'
                            color='secondary'
                            variant="filled"
                            error={Validator.isEmail(email).message}
                            helperText={Validator.isEmail(email).message}
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
                    {Constants.minSumOfOrder > summa ? `До минимальной суммы заказа осталось: ${Constants.minSumOfOrder - summa} рублей` : <></>}
                    <Typography
                        className='typography-margin-20'
                        variant="h5">
                        {secret.toLowerCase() == 'Электричка'.toLowerCase() ? `Итог со скидкой 
                        
                        ${ isLena ? 'по блату' : 'по промокоду'} на 
                        ${ isLena ? '50%' : '20%'}: 
                        ${Math.round(
                            isLena ? summa * 0.5 : summa * 0.8
                        )} ₽` : `Итог: ${summa} ₽`}
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