import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {
    const [{ basket, user }, dispatch] = useStateValue();
    const handleAuthentication = () => {
        // we check if user is logged in/not in case if he is logged in with help of signOut()(firebase keyword) we can sign out, that's it!
        {/*
            Now two scenarios arise when we click Hello ! guest div:
            i. if user is not signed in : in header bar, 'Hello Guest! Sign in' will appear
            When we click on it, it will direct us to login page wherein we can sign in
            ii. if user is signed in : in header bar, 'Hello email id of user' will appear
            When we click on it, it will sign out the user from our website and 'Hello Guest! Sign In' will apper again
        */}
        if (user) {
            auth.signOut();
        }
    }

    return (
        <div className="header">
            <Link to="/">
                <img
                    className="header__logo"
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                />
            </Link>
            <div className="header__search">
                <input
                    className="header__searchInput"
                    type="text"
                />
                <SearchIcon
                    className="header__searchIcon" />
            </div>
            <div className="header__nav">
                {/* After loggin out, in order to avoid getting redirected to login page, and to stay in home page, we will be using, 
                !user- 1. it means if user is logged in ,upon clicking Sign Out div and logging out stay in home page(HeLLo Email id!)
                       2. if user is logged out, re diredect to login page upon click Sign in div(Hello Guest!)
                */}
                <Link to={!user && '/login'}>
                    <div onClick={handleAuthentication}
                        className="header__option">
                        <span className="header__optionLineOne">
                            {user ? user?.email : 'Hello Guest!'}
                        </span>
                        <span className="header__optionLineTwo">
                            {user ? 'Sign Out' : 'Sign In'}
                        </span>
                    </div>
                </Link>
                <Link to='/orders'>
                    <div className="header__option">
                        <span className="header__optionLineOne">
                            Returns
                    </span>
                        <span className="header__optionLineTwo">
                            & Orders
                    </span>
                    </div>
                </Link>
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Your
                    </span>
                    <span className="header__optionLineTwo">
                        Prime
                    </span>
                </div>
                <Link to="/checkout">
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                        {/* Here ? -> in basket?.length means optional chaining, if for any reason basket length id undefined then it wouldn't crash it will handle exception(kind of like try-catch) */}
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
