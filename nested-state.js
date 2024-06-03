const redux = require('redux');
const produce = require('immer').produce;
const createStore = redux.createStore;

const STREET_UPDATED = 'STREET_UPDATED';

function streetUpdate(street) {
    return {
        type: STREET_UPDATED,
        payload: street
    }
}

const initialState = {
    name: 'vishwa',
    address: {
        street: '123 Main St',
        city: 'Boston',
        state: 'MA'
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case STREET_UPDATED:
            // return {
            //   ...state,
            //   address: {
            //     ...state.address,
            //     street: action.payload,
            //   },
            // };
            return produce(state, (draft) => {
                draft.address.street = action.payload;
            })
        default:
            return state;
    }
}

const store = createStore(reducer);
console.log(store.getState());

const unsuscribe = store.subscribe(() => {
    console.log('Updated State', store.getState());
});

store.dispatch(streetUpdate('456 Main St'));

unsuscribe();