import { Button, Col, Flex, Modal, Row } from 'antd';
import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import toastMessage from '../../lib/toastMessage';
import { useUpdateProductMutation } from '../../redux/features/management/productApi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getUpdateModal,
  getUpdateModalData,
  toggleUpdateModel,
} from '../../redux/services/modal.Slice';
import type { IProduct } from '../../types/product.types';
import ModalInput from './ModalInput';

// Component used to edit an existing product
const EditModal = () => {

  // Get whether the update modal is currently open from Redux
  const modalOpen = useAppSelector(getUpdateModal);

  // Get the product data that should be edited
  const data = useAppSelector(getUpdateModalData);

  // Get the API mutation function used to update a product
  const [updateProduct] = useUpdateProductMutation();

  // Get the Redux dispatch function
  const dispatch = useAppDispatch();

  // Store the product data being edited
  // Partial allows the state to contain only some IProduct properties
  const [updateDate, setUpdateDate] = useState<Partial<IProduct>>();

  // Run whenever the user changes an input or select field
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    // Keep the existing product data and update only the changed field
    setUpdateDate((prev) => ({
      ...prev,

      // Update the changed field
      [e.target.name]: e.target.value,
    }));
  };

  // Run when the user clicks the Update button
  const onSubmit = async () => {

    // Make a copy of the updated product data
    const payload = { ...updateDate };

    // Convert price and stock values into numbers
    // HTML inputs normally return their values as strings
    payload.price = Number(updateDate?.price);
    payload.stock = Number(updateDate?.stock);

    try {

      // Send the product ID and updated information to the backend
      const res = await updateProduct({
        id: updateDate?._id,
        payload,
      }).unwrap();

      // Check whether the product was successfully updated
      if (res.statusCode === 200) {

        // Display a success notification
        toastMessage({
          icon: 'success',
          text: res.message,
        });

        // Close the update modal and clear its stored data
        dispatch(
          toggleUpdateModel({
            open: false,
            data: null,
          })
        );
      }

    } catch (error: any) {

      // Display an error notification if the update request fails
      toastMessage({
        icon: 'error',
        text: error.data.message,
      });
    }
  };

  // Run whenever the product data passed to the modal changes
  useEffect(() => {

    // Put the selected product's existing information into local state
    setUpdateDate(data!);

  }, [data]);

  // Structure/UI of the Edit Product modal
  return (
    <>
      {/* Popup used to update an existing product */}
      <Modal
        title='Update Product'
        centered

        // Controls whether the modal is visible
        open={modalOpen}

        // Close the modal and clear its data
        onOk={() =>
          dispatch(toggleUpdateModel({ open: false, data: null }))
        }

        // Close the modal when the user cancels
        onCancel={() =>
          dispatch(toggleUpdateModel({ open: false, data: null }))
        }

        // Replace the default modal footer with a Close button
        footer={[
          <Button
            key='back'
            onClick={() =>
              dispatch(toggleUpdateModel({ open: false, data: null }))
            }
          >
            Close
          </Button>,
        ]}
      >

        {/* Form containing the editable product information */}
        <form>

          {/* Input used to change the product name */}
          <ModalInput
            handleChange={handleChange}
            name='name'
            defaultValue={updateDate?.name}
            label='Name'
          />

          {/* Input used to change the product price */}
          <ModalInput
            handleChange={handleChange}
            label='Price'
            type='number'
            defaultValue={updateDate?.price}
            name='price'
          />

          {/* Row containing the product size selector */}
          <Row>

            {/* Label for the size field */}
            <Col span={6}>
              <label htmlFor='Size' className='label'>
                Size
              </label>
            </Col>

            {/* Product size dropdown */}
            <Col span={18}>
              <select
                name='size'
                value={updateDate?.size ?? ''}
                onChange={handleChange}
                className='input-field'
              >
                <option value=''>Select Product Size*</option>
                <option value='SMALL'>Small</option>
                <option value='MEDIUM'>Medium</option>
                <option value='LARGE'>Large</option>
              </select>
            </Col>
          </Row>

          {/* Centre the Update button */}
          <Flex justify='center' style={{ margin: '1rem' }}>

            {/* Run onSubmit when the user clicks Update */}
            <Button
              key='submit'
              type='primary'
              onClick={onSubmit}
            >
              Update
            </Button>

          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default EditModal;