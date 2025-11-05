export const myAction = (payload) => {
  return {
    type: "ADD",
    payload,
  };
};
export const incrementQuantity = (index) => {
  return {
    type: "INCREMENT",
    index,
  };
};
export const decrementQuantity = (index) => {
  return {
    type: "DECREMENT",
    index,
  };
};

export const removeFromCart = (index) => {
  return {
    type: "REMOVE",
    index,
  };
};
