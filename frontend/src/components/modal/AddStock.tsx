import { Button, Col, Flex, Modal, Row } from 'antd';
import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import toastMessage from '../../lib/toastMessage';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getCreateVariantModel,
  getCreateVariantModelData,
  toggleCreateVariantModel,
} from '../../redux/services/modal.Slice';
import type { IProduct } from '../../types/product.types';
import ModalInput from './ModalInput';
import { useCreateNewProductMutation } from '../../redux/features/management/productApi';

// Component used to display the Add Stock modal
const AddStockModal = () => {

    // Get whether the modal is currently open from Redux
    const modalOpen = useAppSelector(getCreateVariantModel);

    // Get the product data that was passed to the modal
    const data = useAppSelector(getCreateVariantModelData);

    // Get the API mutation function for creating a new product variant
    const [createVariant] = useCreateNewProductMutation();

     // Get the Redux dispatch function
    const dispatch = useAppDispatch();

    // Store the product data being edited inside this component
    // Partial means not every IProduct property has to be present
    const [updateDate, setUpdateDate] = useState<Partial<IProduct>>();

     // Runs whenever the user changes an input or select field
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        // Update the property whose name matches the changed input
        setUpdateDate((prev: Partial<IProduct> | undefined) => ({
            ...prev, // Keep all of the existing product properties

            // Update only the input field that the user changed
            // e.target.name is the field name and e.target.value is its new value
            [e.target.name]: e.target.value,
        }));

         // Runs when the user submits the form
        const onSubmit = async () => {
            const payload: any = {...updateDate};  // Make a copy of the current product data

             // Convert price and stock from input strings into numbers
            payload.price = Number(updateDate?.price);
            payload.stock = Number(updateDate?.stock);

            // Remove properties that should not be sent when creating the variant
            delete payload?.id;
            delete payload.createdAt;
            delete payload.updatedAt;
            delete payload._v;
            delete payload?.user;

            try {

                // Send the new product variant to the API
                // unwrap() gives us the successful response or throws an error
                const res = await createVariant(payload).unwrap();
                
                 // If the product was successfully created
                if(res.statusCode === 201) {
                    toastMessage({icon: 'success', text: res.message });  // Display a success notification
                    dispatch(toggleCreateVariantModel({ open: false, data: null })); // Close the modal and clear its stored data
                }
            } catch (error: any) {
                  // Display an error notification if the API request fails
                toastMessage({ icon: 'error', title: error.data.message, text: error.data.errors[0] }); 
            }
        };

        // Update the local state whenever the modal's product data changes
        useEffect(() => {
            setUpdateDate(data!);
        }, [data]);

        return (
            <>

             {/* Modal used for adding stock/creating a product variant */}
            <Modal
                title='Add Stock'
                centered
                open={modalOpen}
                onOk={() => dispatch(toggleCreateVariantModel({open: false, data: null}))}

                  // Custom footer containing a Close button
                footer={[
                    <Button
                        key='back'
                        onClick={() => dispatch(toggleCreateVariantModel({open: false, data: null}))}
                        >
                            Close
                        </Button>,
                ]}
                >
                    <form>

                        {/* Input for the product name */}
                        <ModalInput
                            handleChange={handleChange}
                            name='name'
                            defaultValue={updateDate?.name}
                            label='Name'
                            />

                             {/* Input for the quantity/stock */}
                            <ModalInput
                                handleChange={handleChange}
                                label='Quantity'
                                type='number'
                                name='quantity'
                                defaultValue={updateDate?.stock}
                                />

                                {/* Row containing the product size selection */}
                                <Row>
                                    <Col span={6}>
                                        <label htmlFor='Size' className='label'>
                                            Size
                                        </label>
                                    </Col>

                                    {/* Size dropdown column */}
                                    <Col span={18}>
                                        <select
                                        defaultValue={updateDate?.size}
                                        value={updateDate?.size}
                                        onChange={handleChange}
                                        className={`input-field`}
                                        >
                                        <option value=''>Select Product Size*</option>
                                        <option value='SMALL'>Small</option>
                                        <option value='MEDIUM'>Medium</option>
                                        <option value='LARGE'>Large</option>
                                        </select>
                                    </Col>
                                </Row>
                                 {/* Centre the submit button inside the modal */}
                                <Flex justify='center' style={{margin: '1rem'}}>
                                    <Button key='submit' type='primary' onClick={onSubmit}>
                                        Create New Variant
                                    </Button>
                                </Flex>
                    </form>
                </Modal>

            </>
        );
    };
}

export default AddStockModal; // Export the component so it can be imported and used in other files