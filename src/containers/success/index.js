import React from 'react';
import {
    Grid,
    Box,
    Typography
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class Success extends React.Component {
    render() {
        return (
            <Grid
                container
                direction='column'
                alignItems='center'
            >
                <Box
                    className='chalk-font-35'>
                    <Typography>
                        Спасибо за заказ. Оператор свяжется с вами в течение часа :)
                            </Typography>
                </Box>
            </Grid>
        );
    }
}

export default Success;
