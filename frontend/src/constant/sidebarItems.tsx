import {
  AimOutlined,
  AntDesignOutlined,
  ApartmentOutlined,
  ShoppingOutlined,
  AreaChartOutlined,
  MoneyCollectFilled,
  ProfileFilled,
  UserOutlined,
} from '@ant-design/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const sidebarItems = [
  {
     // Dashboard navigation item
    key: 'Dashboard',
    label: <NavLink to='/'>DASHBOARD</NavLink>,
    icon: React.createElement(ProfileFilled),
  },
  {
     // Navigate to the create product page
    key: 'Add Product',
    label: <NavLink to='/create-product'>ADD PRODUCT</NavLink>,
    icon: React.createElement(AntDesignOutlined),
  },

  {
  // Navigate to the product management page
  key: 'Manage Products',
  label: <NavLink to='/products'>MANAGE PRODUCTS</NavLink>,
  icon: React.createElement(ShoppingOutlined),
},

  {
     // Navigate to the sales management page
    key: 'Manage Products',
    label: <NavLink to='/sales'>MANAGE SALES</NavLink>,
    icon: React.createElement(AreaChartOutlined),
  },
  {
    // Navigate to the seller management page
    key: 'Manage Seller',
    label: <NavLink to='/sellers'>MANAGE SELLERS</NavLink>,
    icon: React.createElement(ApartmentOutlined),
  },
  {
    // Navigate to the user's profile page
    key: 'Profile',
    label: <NavLink to='/profile'>PROFILE</NavLink>,
    icon: React.createElement(UserOutlined),
  },
];