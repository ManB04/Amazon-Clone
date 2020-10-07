import React, {useEffect} from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import {auth} from './firebase'
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe("pk_test_51HVzooHVh6etyJysCAchMa69q2hyo7PCLS0J9xNNBfH46OB53ige21H7oOZgYSOQudPFFWI4Cs6Hjp6WiZ8NiRb400T5403fuY");  //public key from stripe

function App() {
  const [{},dispatch]=useStateValue();
  //useEffect()- it's like a dynamic if statement in react
  useEffect(() => {
    //will run only once when the app component loads
    //onAuthStateChanged is like a listener which will keep track on the user who is logged in it will be attached as soon as the App loads
    auth.onAuthStateChanged(authUser =>{
      // console.log('The User is >>>',authUser);
      if(authUser){
        // the user just logged in/was logged in
        // it is useful since with firebase even after refresh the already logged in user will be relogged-in
        //(***IMP) will be using react context api i.e datalayer's user to keep track of logged in user(see reducer.js-initialState())

        //dispatching logged in user to datalayer
        dispatch(
          {
          type:'SET_USER',
          user:authUser
        }
        )
      }
      else{
        //the user has logged out
        // removing user from data link layer
        dispatch(
        {  
        type:'SET_USER',
        user:null
        }
        )
      }

    })
  },[])

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/orders">
            <Header />
            <Orders/>
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">  {/* Default path- will always redirect to home page if no pattern matches  */}
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
