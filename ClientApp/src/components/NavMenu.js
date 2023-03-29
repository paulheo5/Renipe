import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavMenu.css';
import {useJwt} from 'react-jwt'
import { logout } from '../services/Auth';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const location = useLocation();

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const {decodedToken, isExpired} = useJwt(token);
    const handleLogout = () => {
        logout();
        setToken(localStorage.getItem("token"));
    }

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    useEffect(() => {
        if(!token){
            setToken(localStorage.getItem("token"));
        }
    }, [location]);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        RENIPE
                        <i className='fab fa-typo3' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link
                                to='/AddMeal'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Add Meal
                            </Link>
                        </li>
                  
                        <li className='nav-item'>
                            <Link
                                to='/SearchRecipe'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Search Recipes
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/Meals'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Meals
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/SavedRecipes'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Recipes
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/DailyView'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Daily View
                            </Link>
                        </li>
                        {token && !isExpired?
                            <Link 
                            to='/#'
                            onClick={handleLogout}
                            className='nav-links'
                            >Logout</Link>
                            :
                            <Link to='/login'
                            className='nav-links'
                            onClick={closeMobileMenu}
                            >Login</Link>
                        }
             
                    </ul>
                 
                </div>
            </nav>
        </>
    );
}

export default Navbar;










//import React, { Component } from 'react';
//import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
//import { Link } from 'react-router-dom';
//import './NavMenu.css';

//export class NavMenu extends Component {
//  static displayName = NavMenu.name;

//  constructor (props) {
//    super(props);

//    this.toggleNavbar = this.toggleNavbar.bind(this);
//    this.state = {
//      collapsed: true
//    };
//  }

//  toggleNavbar () {
//    this.setState({
//      collapsed: !this.state.collapsed
//    });
//  }

//  render() {
//    return (
//      <header>
//        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
//          <NavbarBrand tag={Link} to="/">Renipe</NavbarBrand>
//          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
//          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
//            <ul className="navbar-nav flex-grow">
//              <NavItem>
//                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
//              </NavItem>
//              <NavItem>
//                <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
//              </NavItem>
//              <NavItem>
//                <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
//              </NavItem>
//            </ul>
//          </Collapse>
//        </Navbar>
//      </header>
//    );
//  }
//}
