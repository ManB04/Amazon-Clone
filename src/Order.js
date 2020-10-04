import React from 'react'
import './Order.css'
import moment from "moment"; //useful fro timestamps
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';

function Order({order}) { // we are receiving all orders associated to the user from the Orders.js
    return (
        <div className='order'>
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p> {/* in forebase for our order -> data -> we access created(date) and format in  MMMM Do YYYY, h:mma*/}
            <p className='order__id'>
                <small>{order.id}</small> {/* printing order id in small */}
            </p>
            {/* looping through each element in the basket */}
            {order.data.basket?.map(item => ( // for each element we can find it's details by simply calling the checkout component
                <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    hideButton
                />
            ))}
            <CurrencyFormat
                renderText={(value) => (
                    <h3 className='order__total'>Order Total: {value}</h3>
                )}
                decimalSCale={2}
                value={order.data.amount/100} // in firebase we go tthe order-> data and for the the order we take amount and divide it by 100 since while passing it to stripe we were passing it as subunits(cents,paise, etc) and now we are converting it to proper units(Dollar,Ruppee)
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
        </div>
    )
}

export default Order 
