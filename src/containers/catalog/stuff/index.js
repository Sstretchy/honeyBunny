import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import cake from '../../../cake.jpg';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AddIcon from '@material-ui/icons/Add';
import ToastTrigger from '../../toast.trigger';
import './stuff.css';
import {
    Grid,
    Button,
    Box,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class Stuff extends React.Component {
    render() {
        const {
            addToBasket,
            stuff = []
        } = this.props.store.basket;

        return (
            <Grid
                container
                spacing={2}
            >
                <ToastTrigger />
                {stuff.map((item, index) => (
                    <Grid
                        key={index}
                        item
                        className='stuff-margin width-stuff'
                    >
                        <Card >
                            <CardActionArea>
                                <CardMedia
                                    height="140"
                                >
                                    <img
                                        src={'https://sun9-4.userapi.com/c824201/v824201969/173426/YW0DIgHPsvw.jpg?ava=1'}
                                        className='img-width'
                                        alt="recipe thumbnail"
                                    />
                                </CardMedia>
                                <CardContent>
                                    <Box className='wrap-box'>
                                        <b className='text-wrap'>
                                            {`${item.name}, ${item.weight}`}
                                        </b>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        component="p"
                                        className='content-scroll'
                                    >
                                        {item.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className='actions-align'>
                                {console.log(item)}
                                <Typography
                                    noWrap
                                    variant='body2'>
                                    <b>{`${item.price}₽ `}</b>{item.measure}
                                </Typography>
                                <Button
                                    onClick={() => addToBasket(item.id)}
                                    color='secondary'
                                >
                                    <AddIcon />
                                    <ShoppingBasketIcon />
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}

            </Grid>
        );
    }
}

export default Stuff;