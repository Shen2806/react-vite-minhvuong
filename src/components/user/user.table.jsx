import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table, Tag } from 'antd';
import UpdateUserModal from './updata.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail'; // Assuming you have a ViewUserDetail component


const UserTable = (props) => {
  const { dataUsers, loadUser } = props;
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  const [dataDetail, setDataDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
    const columns = [
      
        {
          title: 'Id',
          dataIndex: '_id',
          render: (_, record) => (
            <a href='#'
            onClick={() => {
              setDataDetail(record);
              setIsDetailOpen(true);
            }}
            >{record._id}</a>
              
          ),

        },
        {
          title: 'Full Name',
          dataIndex: 'fullName',

        },
        {
          title: 'Email',
          dataIndex: 'email',

        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <div style={{ display: "flex", gap: "20px"}}>
              <EditOutlined 
                onClick={() => {
                  setDataUpdate(record)
                  setIsModalUpdateOpen(true)}
                }
              style={{cursor:"pointer" , color:'orange' }}/>
              <DeleteOutlined style={{cursor:"pointer" , color:'red' }}/>
            </div>
              
          ),
        },
        
      ];
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];



    return (
      <>
        <Table 
        columns={columns} 
        dataSource={dataUsers} 
        rowKey="_id" 
        />
        <UpdateUserModal 
          isModalUpdateOpen={isModalUpdateOpen} 
          setIsModalUpdateOpen={setIsModalUpdateOpen} 
          dataUpdate={dataUpdate}
          setDataUpdate={setDataUpdate}
          loadUser={loadUser}
        />
        <ViewUserDetail 
          isDetailOpen={isDetailOpen} 
          setIsDetailOpen={setIsDetailOpen} 
          dataDetail={dataDetail}
          setDataDetail={setDataDetail}
          // loadUser={loadUser}

        />
      </>
    );
}

export default UserTable;