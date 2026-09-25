// Icons used for uploading a profile picture and going back
import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';

// Ant Design components used for the page layout and buttons
import { Button, Col, Flex, Row } from 'antd';



// Reusable input component used in the edit profile form
import CustomInput from '../components/CustomInput';

// React Hook Form used to manage the profile form
import { useForm } from 'react-hook-form';

// List of profile fields that should be displayed in the form
import { profileInputFields } from '../constant/profile';

// API hooks used to get the logged-in user's profile
// and update their profile information
import {
  useGetSelfProfileQuery,
  useUpdateProfileMutation,
} from '../redux/features/authApi';

// Loading component displayed while the profile is loading
import Loader from '../components/Loader';

// Toast notifications for loading, success, and error messages
import { toast } from 'sonner';

// Used to navigate between pages
import { useNavigate } from 'react-router-dom';

// Contains configuration values such as Cloudinary details
import { config } from '../utils/config';


const EditProfilePage = () => {
  // Get the currently logged-in user's profile from the API
  const { data, isLoading } = useGetSelfProfileQuery(undefined);

  // Mutation function used to update profile information
  const [updateProfile] = useUpdateProfileMutation();

  // Used to navigate to another page
  const navigate = useNavigate();


  // Display the loader while the user's profile is being fetched
  if (isLoading) {
    return <Loader />;
  }


  // Runs when the user selects a new profile picture
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Show a loading notification while the image is uploading
    const toastId = toast.loading('Uploading Image...');

    // Get the first file selected by the user
    const image = e.target.files?.[0] as any;

    // Create FormData so the image can be uploaded
    const data = new FormData();

    // Add the selected image to the upload data
    data.append('file', image);

    // Add the Cloudinary upload preset
    data.append(
      'upload_preset',
      config.VITE_CLOUDINARY_UPLOAD_PRESET as string
    );

    // Add the Cloudinary cloud name
    data.append(
      'cloud_name',
      config.VITE_CLOUDINARY_CLOUD_NAME as string
    );

    // Store uploaded images inside the inventory folder
    data.append('folder', 'inventory');


    try {
      // Upload the image directly to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${config.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: data,
        }
      );

      // Convert the Cloudinary response into JavaScript data
      const res = await response.json();


      // Check whether Cloudinary returned a secure image URL
      if (res.secure_url) {
        // Save the new Cloudinary image URL to the user's profile
        const imgUploadRes = await updateProfile({
          avatar: res.secure_url,
        }).unwrap();


        // Check whether the profile update was successful
        if (imgUploadRes.success) {
          toast.success(
            'Profile updated successfully',
            { id: toastId }
          );
        }

        // Display another success message after the image upload
        toast.success(
          'Image Uploaded Successfully, now save update!',
          { id: toastId }
        );
      } else {
        // Cloudinary did not return an image URL
        toast.error(
          'Failed to Upload Image',
          { id: toastId }
        );
      }
    } catch (error) {
      // Handle an error while uploading or updating the image
      toast.error(
        'Failed to Upload Image',
        { id: toastId }
      );
    }
  };


  return (
    // Main responsive row containing the picture and profile form
    <Row>

      {/* Left side - Profile picture */}
      <Col
        xs={{ span: 24 }}
        lg={{ span: 8 }}
      >
        <Flex
          align='center'
          vertical
          style={{
            margin: '1rem 0',
          }}
        >

          {/* Circular container around the profile picture */}
          <Flex
            justify='center'
            style={{
              width: '250px',
              height: '250px',
              border: '2px solid gray',
              padding: '.5rem',
              borderRadius: '50%',
            }}
          >

            {/* 
              Display the user's avatar if one exists.
              Otherwise display the default User.png image.
            */}
    {/* Display the user's avatar if one exists */}
        <img
          src={data?.data?.avatar || ''}
          alt='user'
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
          </Flex>


          {/* Profile picture upload section */}
          <Flex style={{ padding: '1rem' }}>

            {/* 
              Hidden file input.

              The label underneath acts as the visible button
              for selecting a profile picture.
            */}
            <input
              type='file'
              name='avatar'
              id='avatar'
              placeholder='Change Profile Picture'
              style={{
                display: 'none',
              }}

              // Upload the selected file when it changes
              onChange={handleFileChange}
            />


            {/* 
              Clicking this label opens the hidden file input
              because htmlFor matches the input's id.
            */}
            <label
              htmlFor='avatar'
              style={{
                background: '#164863',
                color: '#fff',
                padding: '.5rem 1rem',
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
                fontSize: '1rem',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              <UploadOutlined />
              Change Profile Picture
            </label>
          </Flex>
        </Flex>
      </Col>


      {/* Right side - Edit profile form */}
      <Col
        xs={{ span: 24 }}
        lg={{ span: 16 }}
      >

        {/* Go Back button */}
        <Flex
          justify='end'
          style={{
            margin: '1rem 0',
          }}
        >
          <Button
            type='default'

            // Return to the profile page
            onClick={() => navigate('/profile')}
          >
            <ArrowLeftOutlined />
            Go Back
          </Button>
        </Flex>


        {/* 
          Pass the user's existing profile data
          into the edit form.
        */}
        <EditProfileForm data={data?.data} />
      </Col>
    </Row>
  );
};


// Export the main page so it can be used by the router
export default EditProfilePage;


/**
 * Edit Profile Form
 *
 * Displays the user's existing profile information
 * and allows them to update it.
 */
const EditProfileForm = ({ data }: { data: any }) => {
  // Used to navigate back to the profile after updating
  const navigate = useNavigate();

  // API mutation used to update the user's profile
  const [updateProfile] = useUpdateProfileMutation();


  // Set up React Hook Form
  const {
    // Connects inputs to the form
    register,

    // Handles form submission
    handleSubmit,

    // Contains any validation errors
    formState: { errors },
  } = useForm({
    // Fill the form with the user's existing profile information
    defaultValues: data,
  });


  // Runs when the user submits the profile form
  const onSubmit = async (data: any) => {
    // Remove database/system fields that should not
    // be sent back as editable profile information
    delete data._id;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.__v;


    // Go through every field in the submitted profile data
    for (const key in data) {
      // Remove fields that contain empty/falsy values
      if (
        data[key] === '' ||
        data[key] === undefined ||
        data[key] === null ||
        !data[key]
      ) {
        delete data[key];
      }
    }


    // Display a loading notification while updating
    const toastId = toast.loading('Updating profile...');


    try {
      // Send the cleaned profile data to the API
      const res = await updateProfile(data).unwrap();


      // Check whether the update was successful
      if (res.success) {
        // Replace the loading notification with success
        toast.success(
          'Profile updated successfully',
          { id: toastId }
        );

        // Return to the profile page
        navigate('/profile');
      }
    } catch (error) {
      // Display an error if the profile update fails
      toast.error(
        'Failed to update profile',
        { id: toastId }
      );
    }
  };


  return (
    // Submit the form through React Hook Form
    <form onSubmit={handleSubmit(onSubmit)}>

      {/* 
        Loop through profileInputFields instead of manually
        writing a CustomInput for every profile field.
      */}
      {profileInputFields.map((input) => (
        <CustomInput
          // React needs a unique key for mapped components
          key={input.id}

          // Name used by React Hook Form
          name={input.name}

          // Pass validation errors to CustomInput
          errors={errors}

          // Text displayed as the input label
          label={input.label}

          // Allows CustomInput to register itself with the form
          register={register}

          // Profile fields are optional
          required={false}
        />
      ))}


      {/* Center the update button */}
      <Flex justify='center'>
        <Button
          // Submit the profile form
          htmlType='submit'
          type='primary'
          style={{
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          Update Profile
        </Button>
      </Flex>
    </form>
  );
};