import React from 'react';
import { Card } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import './Home.css'
import bus from '../../Images/Frame-1.png';
import car from '../../Images/Frame-2.png';
import bike from '../../Images/Frame.png';
import train from '../../Images/Group.png';
import {Link} from 'react-router-dom';
import Url from '../../Images/Bg.png';

const Home = () => {
 
    return (


      <div>

          <div className='header' style={{ backgroundImage: `url(${Url})` }} >
              <h1> Public Transportation</h1>
              <div className='rideContainer'>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={bike} />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                
                            <Link to='/destination/bike'> <Button variant="primary">Go with bike</Button> </Link> 
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '18rem' , marginLeft: '20px' }}>
                            <Card.Img variant="top" src={car} />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                
                                <Link to='/destination/car'><Button variant="primary">Go with car</Button></Link>
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '18rem' , marginLeft:'20px'}}>
                            <Card.Img variant="top" src={bus} />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                
                                <Link to='/destination/bus'><Button variant="primary">Go with bus</Button></Link>
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '18rem', marginLeft: '20px' }}>
                            <Card.Img variant="top" src={train} />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                
                            <Link to='/destination/train'> <Button variant="primary">Go with train</Button></Link>
                            </Card.Body>
                        </Card>
              </div>
          </div>

          
             
      </div>
    );
};

export default Home;