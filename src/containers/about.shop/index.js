import React from 'react';
import {
    Box,
} from '@material-ui/core';
import './about.shop.css';
import { inject, observer } from 'mobx-react';
import hand from '../../hand.png';

@inject('store')
@observer
class AboutShop extends React.Component {
    render() {
        return (
            <>
                <Box className='about-container'>
                    <img
                        className='footer-img'
                        src={hand}
                        alt="Logo"
                        style={{ height: '100%', position: 'fixed', top: '100px', left: '0px' }}
                    />
                    <Box className='chalk-font-45'>Немного о нас :)</Box>
                    <Box className='chalk-font-35'>Добро пожаловать в интернет-магазин Honey Bunny</Box>
                    <Box className='chalk-font-35'>Honey Bunny - это:</Box>
                    <Box className='chalk-font-35'>Быстрая и удобная доставка сладостей курьером;</Box>
                    <Box className='chalk-font-35'>Постоянное увеличение количества кондитерских изделий в ассортименте;</Box>
                    <Box className='chalk-font-35'>Вы приобретаете товар по привлекательным ценам.</Box>
                    <Box className='chalk-font-45'>Honey Bunny - сладкая жизнь с доставкой на дом!</Box>
                </Box>
            </>
        );
    }
}

export default AboutShop;