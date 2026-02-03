import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slice/registerslice.js";
import eventReducer from "./slice/Events.slice.js";


const store = configureStore({
  reducer: {
    register: registerReducer,
    event: eventReducer,
  },

  // Redux DevTools enabled automatically in development
  devTools: true,
});

export default store;
