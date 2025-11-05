const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

export const myReducer = (state = initialCart, action) => {
  let newState = state;

  if (action.type === "ADD") {
    const exists = state.some((item) => item.id === action.payload.id);

    if (!exists) {
      newState = [...state, { ...action.payload, quantity: 1 }];
    } else {
      newState = state;
    }
  } else if (action.type === "INCREMENT") {
    newState = state.map((item, index) => (index === action.index ? { ...item, quantity: item.quantity + 1 } : item));
  } else if (action.type === "DECREMENT") {
    newState = state.map((item, index) => (index === action.index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  } else if (action.type === "REMOVE") {
    newState = state.filter((_, index) => index !== action.index);
  }

  localStorage.setItem("cart", JSON.stringify(newState));

  return newState;
};
