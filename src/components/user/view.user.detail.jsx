import { Button, Drawer, notification} from "antd";
import { useState } from "react";
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";

const ViewUserDetail = (props) => {
    const{
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen,
        loadUser
    } = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const handleOnChangeFile = (event) => {
      if (!event.target.files || event.target.files.length === 0) {
        setSelectedFile(null);
        setPreview(null);
        return
    }

    // I've kept this example simple by using the first image instead of multiple
    const file = event.target.files[0]
    if(file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
    
  }
  const handleUpdateUserAvatar = async () =>{
    const resUpload = await handleUploadFile(selectedFile, 'avatar');
    if(resUpload.data){
      const newAvatar = resUpload.data.fileUploaded;
      const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataDetail._id,dataDetail.fullName, dataDetail.email, dataDetail.phone);
      if(resUpdateAvatar.data){
        setIsDetailOpen(false);
        setSelectedFile(null);
        setPreview(null);
        await loadUser(); 
        notification.success({
          message: 'Update Avatar',
          description: 'Avatar updated successfully!'
        });
      }else{
      notification.error({
        message: 'Error uploading file',
        description: JSON.stringify(resUpdateAvatar.error)
      });
      }
     }else{
      notification.error({
        message: 'Error uploading file',
        description: JSON.stringify(resUpload.message )
      });
    }
  }
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
        <div style={{
          marginTop: '10px',
          height: '200px',
          width: '200px',
          border: '1px solid #d9d9d9',
        }}>
          <img style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
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
          <input type="file" hidden id="btnUpload"
          onChange={handleOnChangeFile}
           />
        </div>
        {preview &&
        <>
          <div style={{
            marginTop: '10px',
            height: '200px',
            width: '200px',
            marginBottom: '10px',
          }}>
            <img style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
            src={preview}/>
          </div>
             <Button
              type="primary"
              style={{ marginTop: '10px' }}
              onClick = {() => handleUpdateUserAvatar()}
              >Save</Button>
        </>
      }
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