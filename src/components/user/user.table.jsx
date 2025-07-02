import { Space, Table, Tag } from 'antd';
import { fetchAllUserAPI } from '../../services/api.service';
import { useState } from 'react';

const UserTable = () => {
  const [dataUsers, setDataUsers ] = useState([
    {
      _id: 'John Brown',
      fullName: 32,
      email: 'New York No. 1 Lake Park',
    },
    
  ]); // Initialize state to hold user data
    const columns = [
        {
          title: 'Id',
          dataIndex: '_id',

        },
        {
          title: 'Full Name',
          dataIndex: 'fullName',

        },
        {
          title: 'Email',
          dataIndex: 'email',

        },
        
        
      ];
      // const data = [
      //   {
      //     key: '1',
      //     name: 'John Brown',
      //     age: 32,
      //     address: 'New York No. 1 Lake Park',
      //     tags: ['nice', 'developer'],
      //   },
      //   {
      //     key: '2',
      //     name: 'Jim Green',
      //     age: 42,
      //     address: 'London No. 1 Lake Park',
      //     tags: ['loser'],
      //   },
      //   {
      //     key: '3',
      //     name: 'Joe Black',
      //     age: 32,
      //     address: 'Sydney No. 1 Lake Park',
      //     tags: ['cool', 'teacher'],
      //   },
      // ];

      const loadUser = async () => { 
        const res = await fetchAllUserAPI()
        // setDataUsers(res.data);
      }

      loadUser();
    return (
        <Table columns={columns} dataSource={dataUsers} />
    );
}

export default UserTable;