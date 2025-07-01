import { Button, Input } from "antd";
import { useState } from "react";

const UserForm = () => {
    const [fullName, setFullName] = useState("minhvuong");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const handleSubmit = () => {
        alert(`click me ! `)
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
                        onClick={handleSubmit}
                        style={{width: "100%"}}
                    >Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default UserForm;