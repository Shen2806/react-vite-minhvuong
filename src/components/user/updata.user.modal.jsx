import { Input, notification, Modal } from "antd";
import { useEffect, useState } from "react";
import { createUserAPI } from "../../services/api.service";


const UpdateUserModal = (props) => {
        const [id, setId] = useState("");
        const [fullName, setFullName] = useState("");
        const [phone, setPhone] = useState("");
        

        const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate } = props; 
        useEffect(() => {
            console.log("check props", dataUpdate);
            if(dataUpdate){
                setId(dataUpdate._id);
                setFullName(dataUpdate.fullName);
                setPhone(dataUpdate.phone);
            }
        },[dataUpdate])
        const handleSubmitBtn = async () => {
            const res = await createUserAPI(fullName, email, password, phone)
            if(res.data){
                notification.success({
                    message: "Create User Success",
                    description: `created successfully!`
                });
                resetAndCloseModal();
                // await loadUser(); 
                
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