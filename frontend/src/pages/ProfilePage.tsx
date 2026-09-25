// Icons used for the Edit Profile and Change Password buttons
import { EditFilled, EditOutlined } from '@ant-design/icons';

// Ant Design components used for buttons and page layout
import { Button, Col, Flex, Row } from 'antd';



// Loading component displayed while profile information is loading
import Loader from '../components/Loader';

// API hook used to get the currently logged-in user's profile
import { useGetSelfProfileQuery } from '../redux/features/authApi';

// List of profile properties that should be displayed
import { profileKeys } from '../constant/profile';

// Link is used to navigate to other pages
import { Link } from 'react-router-dom';


const ProfilePage = () => {
  // Get the logged-in user's profile from the API
  // isLoading tells us whether the request is still running
  const { data, isLoading } = useGetSelfProfileQuery(undefined);


  // Display the loading component while waiting for profile data
  if (isLoading) return <Loader />;


  return (
    <>
      {/* Main container for the profile page */}
      <Flex
        vertical
        style={{
          minHeight: 'calc(100vh - 10rem)',
        }}
      >

        {/* Profile picture section */}
        <Flex
          justify='center'
          style={{
            width: '100%',
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
              Display the user's uploaded avatar.

              If the user does not have an avatar,
              display the default User.png image instead.
            */}
            <img
              src={data?.data?.avatar}
              alt='user'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
          </Flex>
        </Flex>


        {/* Profile action buttons */}
        <Flex
          justify='center'
          style={{
            margin: '1rem',
          }}
        >
          <Flex
            gap={16}
            wrap='wrap'
            justify='center'
          >

            {/* Link to the Edit Profile page */}
            <Link to='/edit-profile'>
              <Button type='primary'>
                <EditOutlined />
                Edit Profile
              </Button>
            </Link>


            {/* Link to the Change Password page */}
            <Link to='/change-password'>
              <Button type='primary'>
                <EditFilled />
                Change Password
              </Button>
            </Link>
          </Flex>
        </Flex>


        {/* Row containing the user's profile information */}
        <Row>

          {/* Empty column used for spacing on large screens */}
          <Col
            xs={{ span: 24 }}
            lg={{ span: 4 }}
          ></Col>


          {/* Main profile information container */}
          <Col
            xs={{ span: 24 }}
            lg={{ span: 16 }}
            style={{
              maxWidth: '700px',
              border: '1px solid gray',
              padding: '1rem 2rem',
              borderRadius: '1rem',
            }}
          >
            {/* 
              Loop through profileKeys.

              Each key tells the page which property from the
              user's profile should be displayed.
            */}
            {profileKeys.map((key) => (
              <ProfileInfoItems
                // Name of the profile property
                keyName={key.keyName}

                // Get the matching value from the API profile data
                value={data?.data[key.keyName]}
              />
            ))}
          </Col>


          {/* Empty column used for spacing on large screens */}
          <Col
            xs={{ span: 24 }}
            lg={{ span: 4 }}
          ></Col>
        </Row>
      </Flex>
    </>
  );
};


// Export the page so it can be used by the application's router
export default ProfilePage;


/**
 * ProfileInfoItems
 *
 * Reusable component for displaying one piece
 * of profile information.
 *
 * Example:
 *
 * firstName    Shaurya
 * email        example@email.com
 */
const ProfileInfoItems = ({
  keyName,
  value,
}: {
  keyName: string;
  value: string;
}) => {
  return (
    // Place the property name and value next to each other
    <Flex
      style={{
        width: '100%',
      }}
      gap={24}
    >
      {/* Name of the profile property */}
      <h2
        style={{
          flex: 1,
          fontWeight: '700',
          textTransform: 'capitalize',
        }}
      >
        {keyName}
      </h2>


      {/* Value stored for that profile property */}
      <h3
        style={{
          flex: 4,
          fontWeight: '500',
        }}
      >
        {value}
      </h3>
    </Flex>
  );
};