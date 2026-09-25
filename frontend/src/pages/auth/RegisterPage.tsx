// Import loading icon
import { SpinnerIcon } from '@phosphor-icons/react';

// Import Ant Design components
import { Button, Flex } from 'antd';

// Import React Hook Form
import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';

// Import navigation components
import { Link, useNavigate } from 'react-router-dom';

// Import toast helper
import toastMessage from '../../lib/toastMessage';

// Import registration API mutation
import { useRegisterMutation } from '../../redux/features/authApi';

// Import Redux hooks and authentication action
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/services/authSlice';

// Import JWT decoder
import decodeToken from '../../utils/decodeToken';

const RegisterPage = () => {
  // Used to update the Redux store
  const dispatch = useAppDispatch();

  // Used to navigate to another page
  const navigate = useNavigate();

  // Registration API mutation and loading state
  const [userRegistration, { isLoading }] = useRegisterMutation();

  // Set up the registration form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // Handle registration form submission
  const onSubmit = async (data: FieldValues) => {
    // Make sure both passwords match
    if (data.password !== data.confirmPassword) {
      toastMessage({
        icon: 'error',
        text: 'Password and confirm password must be same!',
      });
      return;
    }

    try {
      // Send registration details to the API
      const res = await userRegistration(data).unwrap();

      // Check if the account was successfully created
      if (res.statusCode === 201) {
        // Decode the JWT to get the user's information
        const user = decodeToken(res.data.token);

        // Save the token and user information in Redux
        dispatch(loginUser({ token: res.data.token, user }));

        // Redirect to the dashboard
        navigate('/');

        // Display success message
        toastMessage({
          icon: 'success',
          text: res.message,
        });
      }
    } catch (error: any) {
      // Get the validation error or API error message
      const errMsg =
        error?.data?.errors?.[Object.keys(error?.data?.errors)[0]] ||
        error.data.message;

      // Display registration error
      toastMessage({
        icon: 'error',
        text: errMsg,
      });
    }
  };

  return (
    // Center the registration form on the page
    <Flex justify='center' align='center' style={{ height: '100vh' }}>
      {/* Registration form container */}
      <Flex
        vertical
        style={{
          width: '400px',
          padding: '3rem',
          border: '1px solid #164863',
          borderRadius: '.6rem',
        }}
      >
        {/* Page heading */}
        <h1
          style={{
            marginBottom: '.7rem',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          Register
        </h1>

        {/* Submit the form through React Hook Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name input */}
          <input
            type='text'
            {...register('name', { required: true })}
            placeholder='Your Name*'
            className={`input-field ${
              errors['name'] ? 'input-field-error' : ''
            }`}
          />

          {/* Email input */}
          <input
            type='text'
            {...register('email', { required: true })}
            placeholder='Your Email*'
            className={`input-field ${
              errors['email'] ? 'input-field-error' : ''
            }`}
          />

          {/* Password input */}
          <input
            type='password'
            placeholder='Your Password*'
            {...register('password', { required: true })}
            className={`input-field ${
              errors['password'] ? 'input-field-error' : ''
            }`}
          />

          {/* Confirm password input */}
          <input
            type='password'
            placeholder='Confirm Password*'
            {...register('confirmPassword', { required: true })}
            className={`input-field ${
              errors['confirmPassword'] ? 'input-field-error' : ''
            }`}
          />

          {/* Registration button */}
          <Flex justify='center'>
            <Button
              htmlType='submit'
              type='primary'
              style={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                width: '100%',
              }}
            >
              {/* Show spinner while registration request is loading */}
              {isLoading && <SpinnerIcon className='spin' weight='bold' />}
              Register
            </Button>
          </Flex>
        </form>

        {/* Link back to the login page */}
        <p style={{ marginTop: '1rem' }}>
          Already have an account? <Link to='/login'>Login Here</Link>
        </p>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;