 import { SpinnerIcon } from '@phosphor-icons/react';
import { Button, Flex } from 'antd';
import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toastMessage from '../../lib/toastMessage';
import { useLoginMutation } from '../../redux/features/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/services/authSlice';
import decodeToken from '../../utils/decodeToken';

const LoginPage = () => {
    // Login API mutation and loading state
    const [userLogin, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch(); // Used to update the Redux store
    const navigate = useNavigate(); // Used to navigate after successful login

// Set up the login form
const {
    handleSubmit,
    register,
    formState: { errors },
} = useForm();


    // Handle login form submission
    const onSubmit = async (data: FieldValues) => {
        try{
            // Send the email and password to the login API
            const res = await userLogin(data).unwrap();

             // Continue if login was successful
            if(res.statusCode === 200) {
                const user = decodeToken(res.data.token);  // Decode the token to get the user's information
                dispatch(loginUser({ token: res.data.token, user }));   // Save the token and user information in Redux
                navigate('/'); // Redirect the user to the dashboard
                toastMessage({ icon: 'success', text: 'Successfully Login!' });   // Display success message
            }
        } catch (error: any) {

            // Display an error message if login fails
            toastMessage({ icon: 'error', text: error.data.message });
        }
    };

 return (
    <Flex justify='center' align='center' style={{ height: '100vh' }}>
      <Flex
        vertical
        style={{
          width: '400px',
          padding: '3rem',
          border: '1px solid #164863',
          borderRadius: '.6rem',
        }}
      >
        <h1 style={{ marginBottom: '.7rem', textAlign: 'center', textTransform: 'uppercase' }}>
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email input */}
        <input
          type='email'
          {...register('email', { required: true })}
          placeholder='test-visitor@gmail.com'
          className={`input-field ${errors['email'] ? 'input-field-error' : ''}`}
        />

        {/* Password input */}
        <input
          type='password'
          placeholder='password123'
          className={`input-field ${errors['password'] ? 'input-field-error' : ''}`}
          {...register('password', { required: true })}
        />
          <Flex justify='center'>
            <Button
              htmlType='submit'
              type='primary'
              disabled={isLoading}
              style={{ textTransform: 'uppercase', fontWeight: 'bold', width: '100%' }}
            >
              {isLoading && <SpinnerIcon className='spin' weight='bold' />}
              Login
            </Button>
          </Flex>
        </form>
        <p style={{ marginTop: '1rem' }}>
          Don't have an account? <Link to='/register'>Register Here</Link>
        </p>
      </Flex>
    </Flex>
  );
};

export default LoginPage;