import React, { useState } from 'react';
import { AiOutlineDashboard, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaBloggerB, FaClipboardList, FaQuestionCircle, FaUsers } from 'react-icons/fa';
import { SiBrandfolder } from 'react-icons/si';
import { BiCategory } from 'react-icons/bi';
import { CiBoxList } from 'react-icons/ci';
import { BsViewList } from 'react-icons/bs';
import { TbBrandProducthunt } from 'react-icons/tb';
import { HiColorSwatch } from 'react-icons/hi';
import { IoIosColorPalette } from 'react-icons/io';
import { ImBlog } from 'react-icons/im';
import { IoIosNotifications } from 'react-icons/io';
import { Link, Outlet } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RiFileList3Line } from 'react-icons/ri';

const { Header, Sider, Content } = Layout;
function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className='text-white fs-5 text-center py-3 mb-0'>
            <span className='sm-logo'>R</span>
            <span className='lg-logo'>Riva</span>
          </h2>
        </div>
        <Menu
          theme="dark"

          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key !== 'signout') {
              navigate(key.toLowerCase());
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className='fs-4' />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <FaUsers className='fs-4' />,
              label: 'Customers',
            },
            {
              key: 'catalog',
              icon: <AiOutlineShoppingCart className='fs-4' />,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  icon: <TbBrandProducthunt className='fs-4' />,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <RiFileList3Line className='fs-4' />,
                  label: 'Product List',
                },
                {
                  key: 'brand',
                  icon: <SiBrandfolder className='fs-4' />,
                  label: 'Brand',
                },
                {
                  key: 'brand-list',
                  icon: <BsViewList className='fs-4' />,
                  label: 'Brand List',
                },
                {
                  key: 'category',
                  icon: <BiCategory className='fs-4' />,
                  label: 'Category',
                },
                {
                  key: 'category-list',
                  icon: <CiBoxList className='fs-4' />,
                  label: 'Category List',
                },
                {
                  key: 'color',
                  icon: <HiColorSwatch className='fs-4' />,
                  label: 'Color',
                },
                {
                  key: 'color-list',
                  icon: <IoIosColorPalette className='fs-4' />,
                  label: 'Color List',
                },
              ]
            },
            {
              key: 'orders',
              icon: <FaClipboardList className='fs-4' />,
              label: 'Orders',
            },
            {
              key: 'blogs',
              icon: <FaBloggerB className='fs-4' />,
              label: 'Blogs',
              children: [
                {
                  key: 'blog',
                  icon: <ImBlog className='fs-4' />,
                  label: 'Add Blog',
                },
                {
                  key: 'blog-list',
                  icon: <FaBloggerB className='fs-4' />,
                  label: 'Blog List',
                },
                {
                  key: 'blog-category',
                  icon: <BiCategory className='fs-4' />,
                  label: 'Blog Category',
                },
                {
                  key: 'blog-category-list',
                  icon: <FaBloggerB className='fs-4' />,
                  label: 'Blog Category List',
                },
              ]
            },
            {
              key: 'enquiries',
              icon: <FaQuestionCircle className='fs-4' />,
              label: 'Enquiries',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-items-center">
            <div className='position-relative'>
              <IoIosNotifications className='fs-4' />
              <span className='badge bg-warning rounded-cicle p-1 position-absolute d-flex align-items-center justify-content-center'>3</span>
            </div>
            <div className='d-flex gap-3 align-items-center'>
              <div>
                <img width={32} height={32} src='https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg' alt='' />
              </div>
              <div
                role='button'
                id='dropdownMenuLink'
                data-bs-toggle='dropdown'
                aria-expanded='false'>
                <h5 className='mb-0'>Unwana</h5>
                <p className='mb-0'>umichaeledet003@gmail.com</p>
              </div>
              <div className='dropdown-menu' aria-label='dropdownMenuLink'>
                <li>
                  <Link to="#" className='dropdown-item py-1 mb-1' style={{ height: 'auto', lineHeight: '20px' }}>View Profile</Link>
                </li>
                <li>
                  <Link to="#" className='dropdown-item py-1 mb-1' style={{ height: 'auto', lineHeight: '20px' }}>Signout</Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
