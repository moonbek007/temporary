const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => {
          return item.id !== action.payload;
        }),
      };
    case "INCREASE":
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount + 1 };
        }
        return cartItem;
      });
      return { ...state, cart: tempCart };
    case "DECREASE":
      let tempCart1 = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload) {
          if (cartItem.amount > 0) {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
          return { ...cartItem, amount: cartItem.amount };
        }
        return cartItem;
      });
      return { ...state, cart: tempCart1 };
    case "GET_TOTALS":
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;
          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal;
        },
        { total: 0, amount: 0 }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };
    case "LOADING":
      return { ...state, loading: true };
    case "DISPLAY_ITEMS":
      return { ...state, cart: action.payload, loading: false };
  }
  return state;
};

export default reducer;
