import React, { useContext } from 'react';

import './Header.css';
import {Link} from 'react-router-dom';
import {UserContext} from '../../App';

const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div className='nav'>
            
            <nav className="navBar">
                <ul>
                    <li>
                        <Link to='/home'>Home</Link>
                        <Link to='/destination'>Destination</Link>
                        <Link to='/blog'>Blog</Link>
                        <Link to='/contact'>Contact</Link>
                        <Link to='/login'>Login</Link>
                        <Link to='/login'>Username: {loggedInUser.name}</Link>
                        <Link to='/login'>Useremail: {loggedInUser.email}</Link>
                        
                    </li>
                </ul>
            </nav>

            

        </div>
    );
};

export default Header;