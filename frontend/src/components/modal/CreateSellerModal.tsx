import { Button, Flex, Modal } from 'antd';
import { useForm } from 'react-hook-form';
import CustomInput from '../CustomInput';
import { useCreateSellerMutation } from '../../redux/features/management/sellerApi';
import toastMessage from '../../lib/toastMessage';
import { SpinnerIcon } from '@phosphor-icons/react';

// Define the props that the CreateSellerModal component receives
interface CreateSellerModalProps {
  openModal: boolean; // Controls whether the modal is open or closed
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>; // Function used to change the open/closed state of the modal
}

// Defines the data that will be entered into the seller form
interface SellerFormValues {
  name: string;
  email: string;
  contactNo: string;
}

// Component used to display the Create New Seller form
const CreateSellerModal = ({
  openModal,
  setOpenModal,
}: CreateSellerModalProps) => {
  // Get the API function used to create a seller
  // isLoading is true while the API request is being processed
  const [createSeller, { isLoading }] = useCreateSellerMutation();

  // Get the tools needed to manage the form
  // SellerFormValues tells React Hook Form exactly what fields this form contains
  const {
    handleSubmit, // Handles form submission and validation
    register, // Connects input fields to React Hook Form
    reset, // Clears the form
    formState: { errors }, // Stores validation errors
  } = useForm<SellerFormValues>();

  // Run when the Create Seller form is submitted
  const onSubmit = async (data: SellerFormValues) => {
    try {
      // Send the seller form data to the backend
      const res = await createSeller(data).unwrap();

      // Check if the seller was successfully created
      if (res.statusCode === 201) {
        reset(); // Clear all of the form fields

        // Display a success notification
        toastMessage({
          icon: 'success',
          text: res.message,
        });

        // Close the modal
        setOpenModal(false);
      }
    } catch (error: any) {
      // Display an error notification if creating the seller fails
      toastMessage({
        icon: 'error',
        text: error.data.message,
      });
    }
  };

  // Structure/UI of the Create Seller modal
  return (
    <>
      {/* Popup used for creating a new seller */}
      <Modal
        title='Create New Seller!'
        centered
        open={openModal} // Determines whether the modal is currently visible
        onOk={() => setOpenModal(false)} // Close the modal when OK is triggered
        onCancel={() => setOpenModal(false)} // Close the modal when the user clicks outside/X

        // Replace the default modal footer with a Close button
        footer={[
          <Button key='back' onClick={() => setOpenModal(false)}>
            Close
          </Button>,
        ]}
      >
        {/* Submit the form using React Hook Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Input for the seller's name */}
          <CustomInput
            name='name'
            errors={errors}
            register={register}
            label='Seller Name'
            required={true}
          />

          {/* Input for the seller's email address */}
          <CustomInput
            name='email'
            errors={errors}
            register={register}
            label='Seller Email'
            required={true}
          />

          {/* Input for the seller's contact number */}
          <CustomInput
            name='contactNo'
            errors={errors}
            register={register}
            label='Contact No.'
            required={true}
          />

          {/* Centre the Create Seller button */}
          <Flex justify='center' style={{ margin: '1rem' }}>
            {/* Submit the seller form */}
            <Button
              key='submit'
              type='primary'
              htmlType='submit'
              // Prevent multiple submissions while the API is loading
              disabled={isLoading}
            >
              {/* Show a spinner while the seller is being created */}
              {isLoading && (
                <SpinnerIcon className='spin' weight='bold' />
              )}

              Create Seller
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

// Export the component so it can be imported and used in other files
export default CreateSellerModal;