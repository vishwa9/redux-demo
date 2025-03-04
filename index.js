const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreator = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleWare = redux.applyMiddleware

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

function orderIceCream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function restockIceCream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

const initialCakeState = {
    numOfCakes: 10,
}

const initialIceCreamState = {
    numOfIceCreams: 20
}

// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20
// }

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
      case CAKE_ORDERED:
        return {
          ...state,
          numOfCakes: state.numOfCakes - 1,
        };
      case CAKE_RESTOCKED:
        return {
          ...state,
          numOfCakes: state.numOfCakes + action.payload,
        };
      default:
        return state;
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
      case ICECREAM_ORDERED:
        return {
          ...state,
          numOfIceCreams: state.numOfIceCreams - 1,
        };
      case ICECREAM_RESTOCKED:
        return {
          ...state,
          numOfIceCreams: state.numOfIceCreams + action.payload,
        };
    case CAKE_ORDERED:
        return {
            ...state,
            numOfIceCreams: state.numOfIceCreams - 1,
        }
      default:
        return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer, applyMiddleWare(logger));
console.log('Initial State', store.getState());

const unsuscribe = store.subscribe(() => {
    
});

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

const actions = bindActionCreator({orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(2);

unsuscribe();