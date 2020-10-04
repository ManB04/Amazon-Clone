//basically components of data layer
export const initialState={
    basket:[],
    user:null
};

// state- indicates state of the application
// action- indicates what action should be performed like: i. add to the basket ii. remove from the basket
// switch- normal switch case like in any programming language

// selector - ES6 function to loop though itemsi in the data layer(cloud)
// here reduce() is used for iterating through each item in the basket(kind of like looping)
// here ? in basket.?reduce will handle exceptions(like try-catch)
// here  reduce(amount, item) => basket?.reduce((amount,item) => item.price+amount, 0) -> means we will be having a initial amount initailised to 0(0 in item.price+amount,0), then we will iterate through each item and for every item we will be looking at price and incrementing mount(it can be visualised as for each item in basket we do amount=amount+item.price)
export const getBasketTotal= (basket) =>
    basket?.reduce((amount,item) => item.price+amount, 0);

const reducer=(state,action) => {
    // console.log(action);
    switch(action.type){
        case 'ADD_TO_BASKET':       // for adding components to data layer(cloud-my interpretation)
            return{
                ...state,           //...state - returns current state
                basket: [...state.basket,action.item],  // to the current state basket(...state basket) let it remain as it is i.e whatever is inside basket(data layer) let it remain as it is but also ADD MENTIONED ACTION ITEM
            };
        case 'REMOVE_FROM_BASKET': // for removing items from data layer 
            // here findIndex() will find the first basketItem.id which matches with the action.id(basketItem.id===findIndex.id) that is passed and will then return the matched item's id i.e index will store matched item's is(item which is needed to be removed)
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id ===action.id
            );
            let newBasket = [...state.basket];// simply storing current sate of basket before removing item from the basket
            if(index >= 0){
                newBasket.splice(index,1);// with splice we can go to the index and add/remove item, in this case since index stores 1st occurrence of the element in the basket, now splice(index,1) means we want to remove 1 element at position specified by index in the basket 
            }
            else{
                console.warn(
                    `Cannot remove product (id: ${action.id} as its not in basket)`
                )
                // in case if we cannot find index it will throw an error
            }
            return{// we are assigning newBasket to basket and returning basket after using splice
                ...state,
                basket: newBasket
            };
        case 'SET_USER':
            // after we logged in using firebase, this will set user in data layer so that after refresh the logged in user stays logged in.
            return{
                ...state,
                user: action.user
            }
        case 'EMPTY_BASKET':
            // once the payment is processed and successful we will be emptying all the items in check out page
            return{
                ...state,
                basket: []
            }
        default:
            return state;
    }
};

export default reducer;