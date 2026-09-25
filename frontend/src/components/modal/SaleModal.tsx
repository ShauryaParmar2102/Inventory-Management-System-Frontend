import { Button, Flex, Modal } from 'antd';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import toastMessage from '../../lib/toastMessage';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getSaleModal, getSaleModalData, toggleSaleModel } from '../../redux/services/modal.Slice';
import ModalInput from './ModalInput';
import { useCreateSaleMutation } from '../../redux/features/management/saleApi';

// Component used to create a new product sale
const SaleModal = () => {
    const modalOpen = useAppSelector(getSaleModal); // Get whether the sale modal is currently open
    const data = useAppSelector(getSaleModalData); // Get the product that the user wants to sell
    const [createNewSale] = useCreateSaleMutation(); // Get the API mutation function used to create a sale
    const dispatch = useAppDispatch(); // Get the Redux dispatch function
    const [updateDate, setUpdateDate] = useState({buyerName: '', quantity: '', date: ''}); // Store the information entered into the sale form

    // Run whenever the user changes one of the form fields
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        // Keep the existing form values and update only the changed field
        setUpdateDate((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    // Run when the user clicks the Sell button
    const onSubmit = async () => {

         // Build the sale information that will be sent to the backend
        const payload = {

            // Add the buyer name, quantity and date from the form
            ...updateDate,
            product: data?._id as string, // Add the ID of the product being sold
            price: data?.price as number,  // Add the product price
            productName: data?.price, // Add the product name/details to the sale
            quantity: Number(updateDate?.quantity), // Convert quantity from a string into a number
        };

        try {
            const res = await createNewSale(payload).unwrap();  // Send the new sale to the backend

             // Check whether the sale was successfully created
            if(res.statusCode === 201) {
                toastMessage({icon: 'success', text: res.message}); // Display a success message
                dispatch(toggleSaleModel({open: false, data: null})); // Close the sale modal and clear its product data
                setUpdateDate({ buyerName: '', quantity: '', date: '' }); // Clear the form fields ready for the next sale
            }
        } catch (error: any) {
            toastMessage({ icon: 'error', text: error.data.message }); // Display an error message if creating the sale fails
        }
    };

      // Structure/UI of the Sale modal
      return (
    <>
     {/* Popup used to create a new product sale */}
      <Modal
        title='New Product Sale'
        centered
        open={modalOpen} // Control whether the modal is visible
        onOk={() => dispatch(toggleSaleModel({ open: false, data: null }))}   // Close the modal
        onCancel={() => dispatch(toggleSaleModel({ open: false, data: null }))} // Close the modal when the user cancels

          // Replace the default footer with a Close button
        footer={[
          <Button key='back' onClick={() => dispatch(toggleSaleModel({ open: false, data: null }))}>
            Close
          </Button>,
        ]}
      >
         {/* Form containing the information for the new sale */}
        <form>

              {/* Input for the customer's/buyer's name */}
          <ModalInput
            handleChange={handleChange}
            name='buyerName'
            defaultValue={updateDate?.buyerName}
            label='Buyer Name'
          />

           {/* Input for the number of products being sold */}
          <ModalInput
            handleChange={handleChange}
            label='Quantity'
            type='number'
            name='quantity'
            defaultValue={updateDate?.quantity}
          />

          {/* Input for the date of the sale */}
          <ModalInput
            handleChange={handleChange}
            label='Selling Date'
            type='date'
            name='date'
            defaultValue={updateDate?.date}
          />
                {/* Centre the Sell button */}
          <Flex justify='center' style={{ margin: '1rem' }}>

               {/* Create the sale when clicked */}
            <Button key='submit' type='primary' onClick={onSubmit}>
              Sell
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};
 
export default SaleModal; // Export the component so it can be used elsewhere