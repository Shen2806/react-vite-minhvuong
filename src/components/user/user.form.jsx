import { Button, Input, notification, Modal } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";


const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone)
        if(res.data){
            notification.success({
                message: "Create User Success",
                description: `created successfully!`
            });
            setIsModalOpen(false);
        }
        else {
            notification.error({
                message: "Create User Failed",
                description: JSON.stringify(res.message)
            });
        } 
        console.log(">>check res: ", res.data)
        }
        
   
    return (
        <div className="user-form" style={{margin: "10px 0"}}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <h3>Table Users </h3>
                    <Button type="primary"
                        onClick={()=> setIsModalOpen(true)}
                    >Create User</Button>
                </div>
            </div>
            <Modal title="CREATE USER" 
            open={isModalOpen} 
            onOk={() => handleSubmitBtn()} 
            onCancel={() => setIsModalOpen(false)}
            maskClosable={false}
            okText={"Create"}>
                    <div>
                    <span>FullName</span>
                    <Input 
                    value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        
                    />
                </div>
                <div>
                    <span>Email</span>
                    <Input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div>
                    <span>Password</span>
                    <Input.Password
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
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

        </div>
    )
}

export default UserForm;