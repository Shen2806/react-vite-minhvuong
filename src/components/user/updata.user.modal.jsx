import { Input, notification, Modal } from "antd";
import { useEffect, useState } from "react";
import { createUserAPI, updateUserAPI } from "../../services/api.service";


const UpdateUserModal = (props) => {
        const [id, setId] = useState("");
        const [fullName, setFullName] = useState("");
        const [phone, setPhone] = useState("");
        

        const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props; 
        useEffect(() => {
            if(dataUpdate){
                setId(dataUpdate._id);
                setFullName(dataUpdate.fullName);
                setPhone(dataUpdate.phone);
            }
        },[dataUpdate])
        const handleSubmitBtn = async () => {
            const res = await updateUserAPI(id,fullName, phone)
            if(res.data){
                notification.success({
                    message: "Update User Success",
                    description: `Update successfully!`
                });
                resetAndCloseModal();
                await loadUser(); 
                
            }
            else {
                notification.error({
                    message: "Create User Failed",
                    description: JSON.stringify(res.message)
                });
            } 
            }
            const resetAndCloseModal = () => {
                setIsModalUpdateOpen(false);
                setFullName("");
                setPhone("");
                setId("");
                setDataUpdate(null);
            }
    return(
        <Modal title="Edit User" 
            open={isModalUpdateOpen} 
            onOk={() => handleSubmitBtn()} 
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Update"}>
                    <div>
                    <div>
                    <span>Id</span>
                    <Input
                        value={id}
                        disabled
                    />
                </div>
                    <span>FullName</span>
                    <Input 
                    value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                    />
                </div>
                
                <div>
                    <span>Phone</span>
                    <Input
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </div>
            </Modal>
    )
}

export default UpdateUserModal;