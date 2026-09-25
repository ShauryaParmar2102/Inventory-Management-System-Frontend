// Import the standard Redux hooks from react-redux
// These are actual functions that are used when the application runs
import {
  useDispatch,
  useSelector,
} from 'react-redux';

// TypedUseSelectorHook is only used as a TypeScript type,
// so it must be imported using "import type"
import type { TypedUseSelectorHook } from 'react-redux';

// Import the types from our Redux store
// RootState = type of all the data stored in Redux
// AppDispatch = type of the Redux dispatch function
import type { RootState, AppDispatch } from './store';


// ================= TYPED REDUX HOOKS =================

// Use this throughout the application instead of plain useDispatch()
//
// This gives dispatch the AppDispatch type from our store,
// so TypeScript knows which Redux actions can be dispatched.
export const useAppDispatch: () => AppDispatch = useDispatch;


// Use this throughout the application instead of plain useSelector()
//
// RootState tells TypeScript the structure of our Redux store.
// This means TypeScript knows what state.auth, state.modal,
// and other Redux state contains.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;