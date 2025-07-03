import {Drawer} from "antd";

const ViewUserDetail = (props) => {
    const{
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen
    } = props;

    return (
        <Drawer
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