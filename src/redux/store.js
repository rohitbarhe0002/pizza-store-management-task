import { combineReducers, createStore } from "redux";
import orderReducer from "./reducer/OrderPizzaReducer";

// Combine reducers if you have multiple reducers
const rootReducer = combineReducers({
  order: orderReducer,
});

// Create Redux store
const store = createStore(rootReducer);

export default store;
