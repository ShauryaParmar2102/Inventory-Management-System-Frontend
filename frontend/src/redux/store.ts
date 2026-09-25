// configureStore creates the main Redux store
import { configureStore } from '@reduxjs/toolkit';

// Action and ThunkAction are TypeScript types used for Redux actions/thunks
import type { Action, ThunkAction } from '@reduxjs/toolkit';

// Import the main RTK Query API
// This handles API requests and API caching
import { baseApi } from './features/baseApi';

// Import the authentication reducer
// This manages the logged-in user and token
import authReducer from './services/authSlice';


// ================= REDUX PERSIST =================

// Redux Persist allows Redux state to be saved in browser storage
// so selected state can survive a page refresh
import {
  persistReducer,
  persistStore,

  // These are Redux Persist actions
  // that will be ignored by Redux's serializable check
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Import the modal reducer
// This manages modal state and bulk-delete selections
import modalSlice from './services/modal.Slice';


// ================= STORAGE =================

// Create our own storage adapter for Redux Persist.
//
// Redux Persist needs three functions:
// getItem    = read saved data
// setItem    = save data
// removeItem = delete saved data
//
// We use the browser's localStorage for this.
const storage = {

  // Get saved data from localStorage
  getItem: (key: string) => {
    return Promise.resolve(
      window.localStorage.getItem(key)
    );
  },

  // Save data to localStorage
  setItem: (key: string, value: string) => {
    window.localStorage.setItem(key, value);

    return Promise.resolve(value);
  },

  // Remove saved data from localStorage
  removeItem: (key: string) => {
    window.localStorage.removeItem(key);

    return Promise.resolve();
  },
};


// ================= PERSIST CONFIG =================

// Configure how the authentication state should be persisted
const persistConfig = {

  // Name/key used when saving the auth state in storage
  key: 'auth',

  // Use our browser localStorage adapter
  storage,
};


// Wrap the normal authentication reducer with Redux Persist
// This allows the auth state to survive page refreshes
const persistedAuthReducer = persistReducer(
  persistConfig,
  authReducer
);


// ================= REDUX STORE =================

// Create the main Redux store for the application
export const store = configureStore({

  // Combine all of the application's reducers
  reducer: {

    // Authentication state
    // Uses the persisted reducer so login information
    // can survive page refreshes
    auth: persistedAuthReducer,

    // Modal and bulk-delete state
    modal: modalSlice,

    // RTK Query API state
    //
    // reducerPath is the name baseApi uses
    // for its Redux state
    [baseApi.reducerPath]: baseApi.reducer,
  },


  // ================= MIDDLEWARE =================

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({

      // Redux Toolkit normally checks whether Redux actions
      // contain serializable data.
      serializableCheck: {

        // Redux Persist uses these special actions internally.
        // Ignore them so Redux Toolkit does not show
        // unnecessary serializable warnings.
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },

    // Add RTK Query middleware.
    //
    // This allows baseApi to handle:
    // API requests
    // caching
    // refetching
    // cache invalidation
    }).concat(baseApi.middleware),
});


// ================= REDUX TYPES =================

// Automatically create the TypeScript type representing
// the complete Redux state.
//
// This includes:
// state.auth
// state.modal
// state[baseApi.reducerPath]
export type RootState = ReturnType<typeof store.getState>;


// Get the TypeScript type of the store's dispatch function.
//
// This is the type used by useAppDispatch.
export type AppDispatch = typeof store.dispatch;


// Type used for Redux thunk functions.
//
// ReturnType represents what the thunk returns.
// It defaults to void.
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


// ================= PERSISTOR =================

// Create the Redux Persist persistor.
//
// This works with the Redux store to save and restore
// the persisted authentication state.
export const persistor = persistStore(store);