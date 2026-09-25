import { Button, Flex } from 'antd';
import { useState } from 'react';
import { useCreateCategoryMutation } from '../../redux/features/management/categoryApi';
import toastMessage from '../../lib/toastMessage';
import { SpinnerIcon } from '@phosphor-icons/react';


// Component used to create a new category
const CreateCategory = () => {

    // Get the create category function and loading state
    const [createCategory, {isLoading}] = useCreateCategoryMutation();

    // Store the category name entered by the user
    const [category, setCategory] = useState('');

     // Run when the Create Category button is clicked
    const handleClick = async () => {
        try {

            // Send the category name to the backend
            const res = await createCategory({name: category}).unwrap();

            // Check if the category was successfully created
            if(res.statusCode === 201) {

                // Display a success message
                toastMessage({ icon: 'success', text: res.message });

                 // Clear the category input
                setCategory('');
            }
        } catch (error: any) {

             // Display an error message if the request fails
            toastMessage({ icon: 'error', text: error.data.message });
        }
    };

      return (
    // Main container for the Create Category section
        <Flex
        vertical
        style={{
            padding: '1rem 2rem',
            border: '1px solid #b6cbd7',
            borderRadius: '.6rem',
            marginBottom: '1rem',
        }}
    >

        {/* Heading for the category form */}
      <h3
        style={{
          textAlign: 'center',
          marginBottom: '.6rem',
          fontWeight: '900',
          textTransform: 'uppercase',
        }}
      >
        Create New Category
      </h3>

       {/* Input for entering the category name */}
      <input
        type='text'
        value={category}  // Display the current category value
        onChange={(e) => setCategory(e.target.value)}  // Update the category when the input changes
        className='input-field'
        placeholder='Category Name'
      />

        {/* Button for creating the category */}
      <Button
        htmlType='button'
        onClick={handleClick}  // Run handleClick when clicked
        type='primary'
        disabled={isLoading} // Disable the button while the request is loading
        style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
      >

        {/* Show a spinner while creating the category */}
        {isLoading && <SpinnerIcon className='spin' weight='bold' />}
        Create Category
      </Button>
    </Flex>
  );
}

export default CreateCategory; // Export the component so it can be used elsewhere