import React from 'react';
import {
    Grid,
    Typography,
    Paper
} from '@material-ui/core';
import './contacts.css';


class Contacts extends React.Component {
    render() {
        return (
            <Grid
                container
                direction='column'
                className='contacts-container'
                component={Paper}
            >
                <Typography
                    className='typography-margin-20'
                    variant="h5"
                >
                    Администрация интернет-магазина Honey Bunny
                </Typography>
                <Typography variant="h6">
                    ООО «Honey Bunny Групп»
                </Typography>
                <Typography variant="h6">
                    ИНН / КПП 7011114419 / 111150001
                </Typography>
                <Typography variant="h6">
                    ОГРН 1011111131001
                </Typography>
                <Typography variant="h6">
                    Юридический адрес: 150000, Ярославская область, г. Ярославль, Панина, д. 10.
                </Typography>
                <Typography variant="h6">
                    Фактический адрес: 150000, Ярославская область, г. Ярославль, Панина, д. 10.
                </Typography>
                <Typography className='typography-margin-20' variant="h5">
                    Режим работы
                </Typography>
                <Typography variant="h6">
                    в будние дни с 6:00 до 18:00 (время московское)
                </Typography>
                <Typography
                    className='typography-margin-20'
                    variant="h5"
                >
                    Контактные данные
                </Typography>
                <Typography variant="h6">
                    Вопросы можно задать по адресу garshina.olya1997@gmail.com
                </Typography>
                <Typography variant="h6">
                    или по телефону 8 800 555 3535 (круглосуточно, 7 дней в неделю, для звонков по РФ, звонок бесплатный).
                </Typography>
            </Grid>
        );
    }
}

export default Contacts;