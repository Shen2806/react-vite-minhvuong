import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {Menu, message} from 'antd';
import { UserOutlined, HomeOutlined, BookOutlined, SettingOutlined, LoginOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { Children, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState('');
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (location && location.pathname) {
      const allRoutes = ["users", "books"];
      const currentRoute = allRoutes.find(item => `/${item}` === location.pathname);
      if (currentRoute) {
        setCurrent(currentRoute);
      } else {
        setCurrent("home");
      }
    }
  },[location])
  const onClick = (e) => {
      setCurrent(e.key);
  }
  const handleLogout = async() => {
    const res = await logoutAPI()
    if (res.data) {
      localStorage.removeItem("access_token")
      setUser({
        "email": "",
        "phone": "",
        "fullName": "",
        "role": "",
        "avatar": "",
        "id": ""
      })
      message.success(
        "Logout successfully !"
      )
      navigate("/")
    }
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
      ...(!user.id ? [{
          label: <Link to={"/login"}>Login</Link>,
          key: 'login',
          icon: <LoginOutlined />,
      }] : []),
      ...(user.id ? [{
        label: `Welcom ${user.fullName}`,
          key: 'setting',
        icon: <AliwangwangOutlined />,
        children: [
          {
            label: <span onClick={ () => handleLogout() }>Logout</span>,
            key:"logout",
          }
          ]
        }] : []),
      
       
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