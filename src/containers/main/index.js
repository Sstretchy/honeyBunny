import React from 'react';
import honey from '../../honey.png'
import chup from '../../chup.png'
import './main.css';

class Main extends React.Component {
    toCataloge = () => {
        this.props.history.push('/catalog');
    }
    render() {
        return (
            <>
                <img
                    className='footer-img logo'
                    src={honey}
                    alt="Logo"
                />
                <img
                    onClick={this.toCataloge}
                    src={chup}
                    alt="Logo"
                    className='chup footer-img'
                />
            </>
        );
    }
}

export default Main;