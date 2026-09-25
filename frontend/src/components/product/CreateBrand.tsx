import { Button, Flex } from 'antd';
import { useState } from 'react';
import { SpinnerIcon } from '@phosphor-icons/react';

import { useCreateBrandMutation } from '../../redux/features/management/brandApi';
import toastMessage from '../../lib/toastMessage';

// Component for creating a new brand
const CreateBrand = () => {

  // Get the create brand API function and its loading state
  const [createBrand, { isLoading }] = useCreateBrandMutation();

  // Store the brand name entered by the user
  const [brand, setBrand] = useState('');

  // Run when the Create Brand button is clicked
  const handleClick = async () => {
    try {

      // Send the brand name to the backend
      const res = await createBrand({
        name: brand,
      }).unwrap();

      // Check if the brand was successfully created
      if (res.statusCode === 201) {

        // Display a success message
        toastMessage({
          icon: 'success',
          text: res.message,
        });

        // Clear the brand input
        setBrand('');
      }

    } catch (error: any) {

      // Display an error message if the request fails
      toastMessage({
        icon: 'error',
        text: error.data.message,
      });
    }
  };

  // Structure/UI for creating a brand
  return (
    <Flex
      vertical
      style={{
        padding: '1rem 2rem',
        border: '1px solid #b6cbd7',
        borderRadius: '.6rem',
      }}
    >

      {/* Page heading */}
      <h3
        style={{
          textAlign: 'center',
          marginBottom: '.6rem',
          fontWeight: '900',
          textTransform: 'uppercase',
        }}
      >
        Create New Brand
      </h3>

      {/* Input for entering the brand name */}
      <input
        type='text'
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className='input-field'
        placeholder='Brand Name'
      />

      {/* Button for creating the new brand */}
      <Button
        htmlType='button'
        onClick={handleClick}
        type='primary'
        disabled={isLoading}
        style={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
        }}
      >

        {/* Show a spinner while creating the brand */}
        {isLoading && (
          <SpinnerIcon
            className='spin'
            weight='bold'
          />
        )}

        Create Brand
      </Button>
    </Flex>
  );
};

// Export the component so it can be used elsewhere
export default CreateBrand;