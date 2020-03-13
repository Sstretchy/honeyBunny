import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AddIcon from '@material-ui/icons/Add';
import './view.css';
import {
    Grid,
    Button,
    Box,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class Stuff extends React.Component {
    async componentDidMount() {
        try {
            this.props.store.basket.fetchGood(this.props.match.params.id)
        } catch {
            console.log('oops')
        }
    }
    render() {
        const {
            good = [],
            addToBasket
        } = this.props.store.basket;

        return (
            <Grid container justify='center' alignItems='center' direction='column'>
                <Button
                    color='secondary'
                    variant='contained'
                    onClick={this.props.history.goBack}
                >
                    Назад в каталог
                </Button>
                <Card className='max-width-card'>
                    <CardActionArea>
                        <CardMedia
                            height="140"
                        >
                            <img
                                src={good.link}
                                className='img-width'
                                alt="recipe thumbnail"
                            />
                        </CardMedia>
                        <CardContent>
                            <Box className='wrap-box'>
                                <b className='text-wrap'>
                                    {good.name}
                                </b>
                            </Box>
                            <Typography
                                variant="body2"
                                component="p"
                                className='content-scroll-view'
                            >
                                {good.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className='actions-align'>
                        <Typography
                            noWrap
                            variant='body2'>
                            <b>{`${good.price}₽ `}</b>
                        </Typography>
                        <Button
                            onClick={() => addToBasket(good.id)}
                            color='secondary'
                        >
                            <AddIcon />
                            <ShoppingBasketIcon />
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

export default Stuff;