import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import Order from './Order';
import './Orders.css'
import { useStateValue } from './StateProvider';

function Orders() {
    const [{basket,user},dispatch]=useStateValue();
    const [orders, setOrders]= useState([]);
    useEffect( () =>{
        if(user){ // since we can only display orders if user is logged in(not for guest)
            db
            .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc') // here all the orders of the user will be sorted in descending on basis of the order date
                .onSnapshot(snapshot => {   // onSnapshot gives us the snapshot db(basically all the items in db ie. items associated to the order) in real time i.e if item is added/removed at any indtant it will give us correct data on contents in db
                    setOrders(snapshot.docs.map(doc => ({ // all orders are returned to us in form of doc(collection('orders') and among those docs we will see each doc as per its id
                        id: doc.id,
                        data: doc.data() // it includes all the data associated to order like items,date etc
                    })))
                })
        }
        else{ // for guest
            setOrders([])
        }
    }, [user])
    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className='orders__order'>
                {orders?.map( order => (  // orders represent complete set of orders done by the user adn we are mapping through each order and passing it to Order conatiner (Order.js)
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders
