import {Button, Drawer} from "antd";

const ViewUserDetail = (props) => {
    const{
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen
    } = props;

    return (
        <Drawer
        width={"50%"}
        title="User Detail"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={() => {
            setIsDetailOpen(false);
            setDataDetail(null);
        }}
        open={isDetailOpen}
      >
      {dataDetail ? <>
        <p><strong>Id:</strong> {dataDetail._id}</p>
        <br />
        <p><strong>Full Name:</strong> {dataDetail.fullName}</p><br />
        <p><strong>Email:</strong> {dataDetail.email}</p><br />
        <p><strong>Phone:</strong> {dataDetail.phone}</p><br />
        <p><strong>Avatar</strong></p><br />
        <div>
          <img height={200} width={200}
          src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}/>
        </div>
        <div>
          <label htmlFor="btnUpload"
          style={{
            display: 'inline-block',
            padding: '6px 12px',
            marginTop: '10px',
            backgroundColor: '#1890ff',
            color: '#fff',
            borderRadius: '4px',
            cursor: 'pointer',
            textAlign: 'center'
          }}>Upload Avatar</label>
          <input type="file" hidden id="btnUpload" />
        </div>
        {/* <Button type="primary">Upload Avatar</Button> */}
        </>
         :
         <>
           <p>No user data available.</p>
         </>
      }
      </Drawer>
    )

}

export default ViewUserDetail;