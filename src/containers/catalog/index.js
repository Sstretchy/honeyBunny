import React from 'react';
import './catalog.css';
import {
    Grid,
  } from '@material-ui/core';
import Categories from './categories';
import Stuff from './stuff';

class Catalog extends React.Component {
    render() {
        return (
            <Grid
             container 
             direction='row' 
             wrap='nowrap' 
             spacing={2}
             >
                <Stuff/>
                <Categories/>
            </Grid>
        );
    }
}

export default Catalog;