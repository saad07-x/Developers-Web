import {SET_ALERT, REMOVE_ALERT} from '../action/types'
const initialState = [];

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case SET_ALERT:
            console.log(...state);  
            return [...state, payload];
        
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload)

        default:
            return state;    
    }
}

//In Redux, a reducer is a pure function that takes an action and the previous state of the application and returns the new state. 
//The action describes what happened and it is the reducer's job to return the new state based on that action.


//13.27