import { configureStore } from '@reduxjs/toolkit'
import { pizzaApi } from './pizzaApi'
import pizzaReducer from './pizzaSlice'


export const resetStore = () => configureStore({
  reducer: {
 
    // add your reducer(s) here
    pizza: pizzaReducer,
    [pizzaApi.reducerPath]: pizzaApi.reducer,

  },
  middleware: getDefault => getDefault().concat(
  
      pizzaApi.middleware
    ),
  
})

export const store = resetStore()
