import { Button, Flex } from 'antd'; // Import Ant Design components for the layout and button

// Import the modal used to create a new seller
import CreateSellerModal from '../modal/CreateSellerModal';

// Import useState to control whether the modal is open
import { useState } from 'react';

// Component for opening the Create Seller modal
const CreateSeller = () => {

        // Store whether the Create Seller modal is open or closed
    const [CreateSellerModalOpen, setCreateSellerModalOpen] = useState(false);

     // Structure/UI for the Create Seller section
    return (
        <>

        {/* Main container for the Create Seller section */}
        <Flex
            vertical
            style={{
                padding: '1rem 2rem',
                border: '1px solid #b6cbd7',
                borderRadius: '.6rem',
                marginBottom: '1rem',
            }}
            >
                {/* Heading */}
                <h3 
                style={{
                    textAlign: 'center',
                    marginBottom: '.6rem',
                    fontWeight: '900',
                    textTransform: 'uppercase',
                     
                }}
                    >
                        Create New Seller
                </h3>

        {/* Button used to open the Create Seller modal */}
        <Button
          htmlType='submit'
          type='primary'
          style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
          onClick={() => setCreateSellerModalOpen(true)} // Open the seller modal when clicked
        >
            Create Seller
        </Button>
    </Flex>

{/* Modal containing the Create Seller form */}
    <CreateSellerModal
        openModal={CreateSellerModalOpen} // Tell the modal whether it should be open
        setOpenModal={setCreateSellerModalOpen}  // Allow the modal to change its open/closed state
        />
        </>
    );
};

export default CreateSeller; // Export the component so it can be used elsewhere