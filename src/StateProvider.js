import React, {createContext, useContext, useReducer} from "react";

//Prepares the data layer(kind of like cloud-my interpretation)
export const StateContext=createContext();

//Wrap our app and provide it to data layer(to the cloud-my interpretation)
export const StateProvider=({reducer, initialState,children}) =>(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

//Pull information from the data layer(from the cloud for our use-my interpretation)
export const useStateValue=() => useContext(StateContext);