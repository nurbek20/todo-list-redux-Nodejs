import { GET_TODO } from "../types";

const initialSate = {
  todos: [],
};

export const todoReducer = (state = initialSate, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TODO: {
      return {
        todos: payload,
      };
    }
    default:
      return state;
  }
};
