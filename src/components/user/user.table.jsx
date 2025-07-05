import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { notification, Table, Popconfirm } from 'antd';
import UpdateUserModal from './updata.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail'; // 
import { deleteUserAPI } from '../../services/api.service'; 

const UserTable = (props) => {
  const { dataUsers, loadUser } = props;
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  const [dataDetail, setDataDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const handleDeleteUser = async (id) => {
    const res = await deleteUserAPI(id);
    if (res.data) {
      notification.success({
        message: "Delete User Success",
        description: `Deleted successfully!`  
      });
      await loadUser(); // Reload user data after deletion
    }
    else {
      notification.error({
        message: "Delete User Failed",
        description: JSON.stringify(res.message)
      });
    }
  }


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
                <Popconfirm
  title="Delete the user"
  description="Are you sure to delete this user?"
  onConfirm={() => {
    handleDeleteUser(record._id);
  }}
  okText="Yes"
  cancelText="No"
  placement="left"
>
  <DeleteOutlined style={{ cursor: "pointer", color: 'red' }} />
</Popconfirm>

              
            </div>
              
          ),
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
          loadUser={loadUser}

        />
      </>
    );
}

export default UserTable;