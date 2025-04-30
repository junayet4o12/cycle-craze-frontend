import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import cartReducer from './features/cart/cartSlice'
import wishlistReducer from './features/wishlist/wishlistSlice'
import { baseApi } from './api/baseApi'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const authPersistConfig = {
  key: 'auth',
  storage,
}
const cartPersistConfig = {
  key: 'cart',
  storage,
}
const wishlistPersistConfig = {
  key: 'wishlist',
  storage
}

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer)
const persistedWishlistReducer = persistReducer(wishlistPersistConfig, wishlistReducer)
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
    wishlist: persistedWishlistReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  }).concat(baseApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)