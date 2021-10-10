import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';
import { DARK_MODE_ON, DARK_MODE_OFF, CART_ADD_ITEM, CART_REMOVE_ITEM, AUTH_USER, LOGOUT_USER, SHIPPING_DETAILS, CLEAR_CART } from './constants';

export const Store = createContext();

const initialState = {
    darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
    cart: {
        cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [],
        shippingDetails: Cookies.get('shippingDetails') ? JSON.parse(Cookies.get('shippingDetails')) : null,
    },
    userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
};

function reducer(state, action) {
    switch (action.type) {
        case DARK_MODE_ON: {
            Cookies.set('darkMode', 'ON', { sameSite: 'Lax' });
            return { ...state, darkMode: true };
        }
        case DARK_MODE_OFF: {
            Cookies.set('darkMode', 'OFF', { sameSite: 'Lax' });
            return { ...state, darkMode: false };
        }
        case CART_ADD_ITEM: {
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find((item) => item.id === newItem.id);
            const cartItems = existItem ? state.cart.cartItems.map((item) => item.id === existItem.id ? newItem : item) : [...state.cart.cartItems, newItem];
            Cookies.set('cartItems', JSON.stringify(cartItems), { sameSite: 'Lax' });
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case CART_REMOVE_ITEM: {
            const cartItems = state.cart.cartItems.filter((item) => item.id !== action.payload.id);
            Cookies.set('cartItems', JSON.stringify(cartItems), { sameSite: 'Lax' });
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case AUTH_USER: {
            Cookies.set('userInfo', JSON.stringify(action.payload), { sameSite: 'Lax' });
            return { ...state, userInfo: action.payload };
        }
        case LOGOUT_USER: {
            Cookies.remove('userInfo', { sameSite: 'Lax' });
            Cookies.remove('cartItems', { sameSite: 'Lax' });
            Cookies.remove('shippingDetails', { sameSite: 'Lax' });
            return { ...state, userInfo: null, cart: { ...state.cart, cartItems: [] }, };
        }
        case SHIPPING_DETAILS: {
            Cookies.set('shippingDetails', JSON.stringify(action.payload), { sameSite: 'Lax' });
            return { ...state, cart: { ...state.cart, shippingDetails: action.payload }, };
        }
        case CLEAR_CART: {
            Cookies.remove('cartItems', { sameSite: 'Lax' });
            return { ...state, cart: { ...state.cart, cartItems: [] } };
        }
        default: {
            return state;
        }
    };
};

export function StoreProvider(prop) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return (<Store.Provider value={value}>{prop.children}</Store.Provider>)
};