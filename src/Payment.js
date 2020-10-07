import { CardElement,useElements, useStripe } from '@stripe/react-stripe-js';
import axios from './axios';
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';
import { db } from './firebase';

function Payment() {
    const[{basket,user},dispatch]=useStateValue();
    const history=useHistory();

    const stripe=useStripe();
    const elements=useElements();

    const[error,setError]=useState(null);
    const[disabled,setDisabled]=useState(true);

    const[succeeded, setSucceeded]=useState(false);
    const[processing, setProcessing]=useState("");
    const[clientSecret,setClientSecret]=useState(true);
    
    // useEffect() here is used for managing change in cart items
    // it runs when payment componenet loads as well as when items mentioned in basket change(in this case when 'basket' changes) using setClientSecret() we can charge customer correct amount
    useEffect(() => {
        // generate special stripe secret which allows us to charge a customer
        const getClientSecret=async() => {
            // axios is a library used for making get,post request
            // here we are making axios object
            const response=await axios({
                method:'post',
                
                // create? total - query parameter
                // Stripe expects the total in currencies subunits, it means d we must convert dollar->cents or ruppees-paise eg-10$ should be passed as 1000(cents), 100 ruppees should be passed as 10000(paise)
                url:`/payments/create?total=${getBasketTotal(basket)*100}`
            });
            setClientSecret(response.data.clientSecret) 
        }
        getClientSecret();//calling async function
    }, [basket])

    // console.log('The Secret is >>> ',clientSecret);
    // console.log('current user >>> ', user);

    //asynchronous event 
    const handleSubmit= async (event) => {
        event.preventDefault();// to prevent hotreload
        setProcessing(true);// will allow the Buy Now button to be clicked once, won't be able to click button multiple times
        
        // we are passing clientSecret to confirmCardPayment(this will be final number of items, after clicking buy now we won't be able to change items in basket)
        //in payment__method we will be passing details of card to confirm card payment
        const payload=await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            //paymentIntent = paymentConfirmation i.e once with the card details we send payment we will get sme confirmation about that payment upon receiving confirmation of successful payment we will execute following lines of code
            
            // after payment is processed we are going to give summary of order of user in orders page.
            // so for that we will be first visiting User collection(collection('users')) and then select appropriate user id(doc(user?.uid) - client secret)
            // after selecting User id we will be going through all the orders of that user(collection('orders)) and then AS PER THE NO. OF ITEMS PLACED BY USER IN EACH ORDER WE WILL BE DISPLAYING IT(doc(paymentIntent.id - for identifying orders)
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                // after finding the order we will be displaying items associated with the order
                basket:basket, // items in basket(data layer before we will call 'EMPTY_BASKET')
                amount:paymentIntent.amount, // Total amount for that order id
                created:paymentIntent.created // this will give us time stamp of the day order was placed
            });

            setSucceeded(true);
            setError(null);
            setProcessing(false);
            
            // once payment is successful we will be passing command to empty the basket and remove all the items from the checkout page
            dispatch({
                type:'EMPTY_BASKET'
            })
            // once payment is confirmed we will be redirecting user from payment page to Orders page where user's orders will be present;
            // we are using replace here instead of push since we don't want user to come back to payment page , we are replacing payment page by orders page
            history.replace('/orders');
        })
    }

    const handleChange= event => {
        //Listen for changes in CardElement
        // and display any errors as the customer  type there card details
        setDisabled(event.empty); // disbale the sub,it button if card details are empty
        setError(event.error ? event.error.message:"");// if there is error in details using ternary we are daying wheteher to show the error message or show nothing("")
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout(<Link to='/checkout'>{basket?.length} items</Link>)
                </h1>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 amazon lane</p>
                        <p>Bangalore,India</p>
                    </div>                
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item =>(
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        {/* Stripe Payment */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                    <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                {/* button will be diabled when it is either processing/disabled/succeeded */}
                                <button disabled={processing || disabled || succeeded}>
                                    {/* if pa */}
                                    <span>{processing? <p>Processing</p>: "Buy Now"}</span>
                                </button>
                            </div>
                            {/* In case if there is any error in the card details */}
                                    {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
