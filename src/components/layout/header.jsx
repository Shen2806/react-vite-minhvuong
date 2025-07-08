import { Link, NavLink } from 'react-router-dom';
import {Menu} from 'antd';
import { UserOutlined, HomeOutlined, BookOutlined, SettingOutlined } from '@ant-design/icons';
import { Children, useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
const Header = () => {
  const [current, setCurrent] = useState('');
  const {user} = useContext(AuthContext)
  console.log(">>> check data", user)
    const onClick = e => {
      console.log('click ', e);
      setCurrent(e.key);
    }
    const items = [
        {
          label: <Link to={"/"}>Home</Link>,
          key: 'home',
          icon: <HomeOutlined />,
        },
        {
          label: <Link to={"/users"}>Users</Link>,
          key: 'users',
          icon: <UserOutlined />,
        },
        {
          label: <Link to={"/books"}>Books</Link>,
          key: 'books',
          icon: <BookOutlined />,
      },
      {
        label: "Settings",
          key: 'setting',
        icon: <SettingOutlined />,
        children: [
          {
            label: <Link to={"/login"}>Login</Link>,
            key:"login",
          },
          {
            label: <Link to={"/logout"}>Login</Link>,
            key:"logout",
          }
          ]
        }
       
      ];
    return(
        <Menu 
        onClick={onClick} 
        selectedKeys={[current]} 
        mode="horizontal" 
        items={items} /> 

    );
}
export default Header;