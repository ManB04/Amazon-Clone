import React from 'react';
import "./Product.css";
import { useStateValue } from './StateProvider';

function Product({id,title, image, price, rating}) {  //props-es6 function
    // state - state of the data layer
    // dispatch - how data is manipulated
    // useStateValue - for pulling items from the data layer
    const[{basket}, dispatch]= useStateValue(); // we can get values from the data layer using useStateValue(), just mention what values you want like state,dispatch,basket,etc.
    // console.log("This is the basket >>>>",basket);
    const addToBasket = () => {
        // dispatch item to data layer i.e with ADD_TO_BASKET we are going to add items to the basket layer, the item added will be based on what is received in props(id,title,image,price,rating)
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id:id,
                title:title,
                image:image,
                price:price,
                rating:rating,
            },
        });
    };
    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                <small>$</small>
                <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating)       // array created
                    .fill()              // array is initialised with size of rating i.e if rating is 5 then array of 5 values created with null values
                    .map((_,i) =>(  //(kind of like loopng) for each value in array we are mapping *(i.e <p>*</p>), here 1st parameter is '_', it means we don't care about initialising our loop and 'i' indicates the number of times we need to iterate through our loop in this case i's value is indicated by rating so if rating is 5 then * will be mapped 5 times in the array
                        <p>🌟</p>
                    ))}
                </div>
            </div>
            <img 
                src={image}
                alt=""
            />
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product
