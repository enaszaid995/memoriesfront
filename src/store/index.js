import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice';


const store = configureStore({
  reducer: { auth: authSlice.reducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/login' ,'auth/signUp'],
        // Ignore these field paths in all actions
        ignoredPaths: ['auth.expirationDate'],
      },
    }),
});

export default store;