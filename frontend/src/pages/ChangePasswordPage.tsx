// Ant Design components used to build the page
import { Button, Flex, Input } from 'antd';

// React hook used to store the password input values
import { useState } from 'react';

// Toast notifications for loading, success, and error messages
import { toast } from 'sonner';

// API mutation used to send the password change request
import { useChangePasswordMutation } from '../redux/features/authApi';

// Used to navigate between pages
import { useNavigate } from 'react-router-dom';

// Back arrow icon
import { ArrowLeftOutlined } from '@ant-design/icons';


const ChangePasswordPage = () => {
  // Mutation function used to call the change password API
  const [changePassword] = useChangePasswordMutation();

  // Store the values entered into each password field
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Used to redirect the user to another page
  const navigate = useNavigate();


  // Runs when the Change Password button is clicked
  const handleSubmit = async () => {
    // Make sure the user has filled in every field
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    // Make sure the new password has at least 6 characters
    if (newPassword.length < 6) {
      toast.error('New password must have 6 characters');
      return;
    }

    // Make sure the new password and confirmation match
    if (newPassword !== confirmPassword) {
      toast.error('Password and confirm password does not match');
      return;
    }


    // Create the data that will be sent to the API
    const payload = {
      oldPassword,
      newPassword,
      confirmPassword,
    };


    try {
      // Display a loading notification while the request is running
      const toastId = toast.loading('Changing password...');

      // Send the password information to the API
      // unwrap() gives us the response or throws an error
      const res = await changePassword(payload).unwrap();


      // Check whether the API says the password change succeeded
      if (res.success) {
        // Replace the loading notification with a success message
        toast.success('Password changed successfully', {
          id: toastId,
        });

        // Clear all of the password fields
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');

        // Redirect the user back to their profile
        navigate('/profile');
      }
    } catch (error: any) {
      // Display an error message if the API request fails
      toast.error(error.data.message, {
        id: error.data.statusCode,
      });
    }
  };


  return (
    // Center the change password form on the page
    <Flex
      justify='center'
      align='center'
      style={{
        height: 'calc(100vh - 10rem)',
      }}
    >
      {/* Container for the password form */}
      <Flex
        vertical
        gap={6}
        style={{
          maxWidth: '500px',
          minWidth: '350px',
          border: '1px solid gray',
          padding: '2rem',
          borderRadius: '.4rem',
        }}
      >
        {/* Current password input */}
        <Input.Password
          size='large'
          placeholder='Old Password'

          // Display the value stored in oldPassword
          value={oldPassword}

          // Update oldPassword whenever the user types
          onChange={(e) => setOldPassword(e.target.value)}
        />


        {/* New password input */}
        <Input.Password
          size='large'
          placeholder='New Password'
          value={newPassword}

          // Update newPassword whenever the user types
          onChange={(e) => setNewPassword(e.target.value)}
        />


        {/* Confirm the new password */}
        <Input.Password
          size='large'
          placeholder='Confirm Password'
          value={confirmPassword}

          // Update confirmPassword whenever the user types
          onChange={(e) => setConfirmPassword(e.target.value)}
        />


        {/* 
          Runs handleSubmit when clicked.

          NOTE:
          disabled={true} means this button cannot currently
          be clicked, so handleSubmit will not run from this button.
        */}
        <Button
          type='primary'
          onClick={handleSubmit}
          disabled={true}
        >
          Change Password
        </Button>


        {/* Return to the profile page */}
        <Button
          type='default'
          onClick={() => navigate('/profile')}
        >
          <ArrowLeftOutlined />
          Go Back
        </Button>
      </Flex>
    </Flex>
  );
};


// Export the page so it can be used by the application's router
export default ChangePasswordPage;