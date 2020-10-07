import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider';

function CheckoutProduct({id,image,title,price,rating,hideButton}) { //props-es6 function
    const [{ basket }, dispatch] = useStateValue();
    // dispatch helps in manipulating item on basket
    
    const removeFromBasket= () =>{
        dispatch({
            type:'REMOVE_FROM_BASKET',
            id:id
        })
    }
    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={image}
            />
            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className='checkoutProduct__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='checkoutProduct__rating'>
                    {Array(rating).fill()
                    .map((_,i) => (
                        <p>🌟</p>                       
                    ))}
                </div>
                {/* we are using hideButton in case of 'Remove from Basket' because we don't want to show it in final orders page(wherein payment is done and order is placed), since each time we render product we are using CheckoutProduct if we don't hide 'Remove from Basket' in case of Final Orders page it won't make sense  */}
                {!hideButton && (
                    <button onClick={removeFromBasket}>Remove from Basket</button>
                )}
                
            </div>
        </div>
    )
}

export default CheckoutProduct
