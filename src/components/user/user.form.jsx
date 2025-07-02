import { Button, Input, notification } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";


const UserForm = () => {
    const [fullName, setFullName] = useState("minhvuong");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const handleClickBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone)
        if(res.data){
            notification.success({
                message: "Create User Success",
                description: `created successfully!`
            });
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
        <div className="user-form" style={{margin: "20px 0"}}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
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
                <div>
                    <Button type="primary"
                        onClick={handleClickBtn}
                       
                    >Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default UserForm;