// createSlice is an actual function used while the application runs
import { createSlice } from '@reduxjs/toolkit';

// PayloadAction is only used as a TypeScript type
import type { PayloadAction } from '@reduxjs/toolkit';

// RootState represents the entire Redux store
// It is only used as a TypeScript type
import type { RootState } from '../store';

// IProduct describes the structure of a product
// It is only used as a TypeScript type
import type { IProduct } from '../../types/product.types';


// ================= STATE TYPE =================

// Defines the structure of the modal Redux state
interface InitialState {

  // Controls the update product modal
  // open = whether the modal is visible
  // data = product being updated
  updateModel: {
    open: boolean,
    data: null | IProduct
  },

  // Controls the create variant modal
  // data contains the product that the variant belongs to
  createVariantModel: {
    open: boolean,
    data: null | IProduct
  },

  // Controls the sale modal
  // Only the product information needed for a sale is stored here
  saleModel: {
    open: boolean,
    data: null | {
      _id: string,
      price: number,
      name: string
    }
  },

  // Stores the IDs of products selected for bulk deletion
  bulkDelete: string[]
}


// ================= INITIAL STATE =================

// Default state when the application starts
const initialState: InitialState = {

  // Update modal starts closed with no selected product
  updateModel: {
    open: false,
    data: null
  },

  // Create variant modal starts closed
  createVariantModel: {
    open: false,
    data: null
  },

  // Sale modal starts closed
  saleModel: {
    open: false,
    data: null
  },

  // No products are initially selected for bulk deletion
  bulkDelete: []
};


// ================= MODAL SLICE =================

// Create the Redux slice used to manage modal state
// and bulk-delete selections
const modalSlice = createSlice({
  // Name of this section of Redux state
  name: 'modal',

  // Starting state
  initialState,

  // Functions that can change this state
  reducers: {

    // ================= UPDATE PRODUCT MODAL =================

    // Open or close the update modal
    // and store the product being updated
    toggleUpdateModel: (
      state,
      action: PayloadAction<{
        open: boolean,
        data: null | IProduct
      }>
    ) => {
      // Set whether the modal should be open
      state.updateModel.open = action.payload.open;

      // Store the selected product
      state.updateModel.data = action.payload.data;
    },


    // ================= CREATE VARIANT MODAL =================

    // Open or close the create variant modal
    // and store the selected product
    toggleCreateVariantModel: (
      state,
      action: PayloadAction<{
        open: boolean,
        data: null | IProduct
      }>
    ) => {
      // Set whether the modal is visible
      state.createVariantModel.open = action.payload.open;

      // Store the product associated with the variant
      state.createVariantModel.data = action.payload.data;
    },


    // ================= SALE MODAL =================

    // Open or close the sale modal
    // and store the basic product information needed for the sale
    toggleSaleModel: (
      state,
      action: PayloadAction<{
        open: boolean,
        data: null | {
          _id: string,
          price: number,
          name: string
        }
      }>
    ) => {
      // Set whether the sale modal should be open
      state.saleModel.open = action.payload.open;

      // Store the selected product's sale information
      state.saleModel.data = action.payload.data;
    },


    // ================= BULK DELETE =================

    // Add one product ID to the bulk-delete array
    addToBulkDelete: (
      state,
      action: PayloadAction<string>
    ) => {
      // Add the selected product ID to the array
      state.bulkDelete.push(action.payload);
    },


    // Replace the bulk-delete array with multiple product IDs
    // Useful when selecting all products
    addAllToBulkDelete: (
      state,
      action: PayloadAction<string[]>
    ) => {
      state.bulkDelete = action.payload;
    },


    // Remove one particular product ID from the bulk-delete array
    removeToBulkDelete: (
      state,
      action: PayloadAction<string>
    ) => {
      // Keep every ID except the one being removed
      state.bulkDelete = state.bulkDelete.filter(
        item => item !== action.payload
      );
    },


    // Remove every product from the bulk-delete selection
    removeAllToBulkDelete: (state) => {
      // Reset the array
      state.bulkDelete = [];
    },
  }
});


// ================= ACTIONS =================

// Export the actions automatically created by createSlice
// These can be called using dispatch()
export const {
  toggleSaleModel,
  toggleUpdateModel,
  toggleCreateVariantModel,
  addToBulkDelete,
  removeToBulkDelete,
  addAllToBulkDelete,
  removeAllToBulkDelete
} = modalSlice.actions;


// Export the reducer so it can be added to the Redux store
export default modalSlice.reducer;


// ================= SELECTORS =================

// Selectors are helper functions used to retrieve
// specific pieces of data from the Redux store


// Get whether the update modal is currently open
export const getUpdateModal = (state: RootState) =>
  state.modal.updateModel.open;


// Get the product currently stored in the update modal
export const getUpdateModalData = (state: RootState) =>
  state.modal.updateModel.data;


// Get whether the sale modal is currently open
export const getSaleModal = (state: RootState) =>
  state.modal.saleModel.open;


// Get the product data stored in the sale modal
export const getSaleModalData = (state: RootState) =>
  state.modal.saleModel.data;


// Get whether the create variant modal is currently open
export const getCreateVariantModel = (state: RootState) =>
  state.modal.createVariantModel.open;


// Get the product stored in the create variant modal
export const getCreateVariantModelData = (state: RootState) =>
  state.modal.createVariantModel.data;


// Get the array of product IDs selected for bulk deletion
export const getBulkDelete = (state: RootState) =>
  state.modal.bulkDelete;