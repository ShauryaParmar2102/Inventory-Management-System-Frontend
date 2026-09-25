// React hook used to manage the sidebar state
import { useState } from 'react';

// React Router components used for navigation
// Outlet displays the current page inside the layout
import { Outlet, useNavigate } from 'react-router-dom';

// Ant Design components used for the sidebar layout
import { Button, Layout, Menu } from 'antd';

// Logout icon used inside the Logout button
import { LogoutOutlined } from '@ant-design/icons';

// Navigation items displayed inside the sidebar
import { sidebarItems } from '../../constant/sidebarItems';

// Custom Redux dispatch hook
import { useAppDispatch } from '../../redux/hooks';

// Redux action used to log the current user out
import { logoutUser } from '../../redux/services/authSlice';


// Get the Content and Sider components from Ant Design Layout
const { Content, Sider } = Layout;


// Sidebar component used as the main navigation layout
const Sidebar = () => {

    // Controls whether the logout button is visible
    const [showLogoutBtn, setShowLogoutBtn] = useState(true);


    // Get the Redux dispatch function
    const dispatch = useAppDispatch();


    // Get React Router's navigate function
    const navigate = useNavigate();


    // Run when the user clicks the Logout button
    const handleClick = () => {

        // Remove/log out the current user from the Redux state
        dispatch(logoutUser());

        // Send the user back to the home page
        navigate('/');
    };


    return (

        // Main layout that takes up the full height of the screen
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >

            {/* ================= SIDEBAR ================= */}

            <Sider

                // Collapse the sidebar when the screen reaches
                // Ant Design's large responsive breakpoint
                breakpoint='lg'

                // Completely hide the sidebar when collapsed
                collapsedWidth='0'

                // Runs whenever the sidebar is collapsed or expanded
                onCollapse={(collapsed, type) => {

                    // Hide/show the logout button when the
                    // sidebar automatically collapses responsively
                    if (type === 'responsive') {
                        setShowLogoutBtn(!collapsed);
                    }

                    // Hide/show the logout button when the
                    // sidebar is manually collapsed
                    if (type === 'clickTrigger') {
                        setShowLogoutBtn(!collapsed);
                    }
                }}

                // Set the width of the sidebar
                width='220px'

                // Custom sidebar styling
                style={{
                    backgroundColor: '#164863',
                    position: 'relative',
                }}
            >

                {/* ================= WELCOME HEADING ================= */}

                <div className='demo-logo-vertical'>

                    <h1
                        style={{
                            color: '#fff',
                            padding: '1rem',
                            fontSize: '1.8rem',
                            textAlign: 'center',
                        }}
                    >
                        WELCOME
                    </h1>

                </div>


                {/* ================= NAVIGATION MENU ================= */}

                <Menu
                    theme='dark'
                    mode='inline'
                    style={{
                        backgroundColor: '#164863',
                        fontWeight: '700',
                    }}
                    defaultSelectedKeys={['Dashboard']}
                    items={sidebarItems}
                />


                {/* ================= LOGOUT BUTTON ================= */}

                {/* Only display the Logout button when the sidebar is visible */}
                {showLogoutBtn && (

                    <div
                        style={{
                            margin: 'auto',
                            position: 'absolute',
                            bottom: 0,
                            padding: '1rem',
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center',
                        }}
                    >

                        <Button
                            type='primary'
                            danger
                            icon={<LogoutOutlined />}
                            onClick={handleClick}
                        >
                            Logout
                        </Button>

                    </div>
                )}

            </Sider>


            {/* ================= MAIN PAGE AREA ================= */}

            <Layout>

                {/* 
                    Content displays whichever page is currently selected.

                    The white background removes the light-blue background
                    that was appearing behind the Dashboard.
                */}
                <Content
                    style={{
                        backgroundColor: '#ffffff',
                    }}
                >

                    {/* 
                        Outlet is replaced by the current page,
                        such as Dashboard, Products, Sales, etc.
                    */}
                    <Outlet />

                </Content>

            </Layout>

        </Layout>
    );
};


// Export Sidebar so it can be used in the application's routes
export default Sidebar;