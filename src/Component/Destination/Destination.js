import React from 'react';
import Url from '../../Images/Bg.png';


const Destination = () => {
    return (
        <div className='header'  style={{ backgroundImage: `url(${Url})` }}>
            <h1>Public Transportation</h1>
            <h3>This is destination.....</h3>
        </div>
    );
};

export default Destination;