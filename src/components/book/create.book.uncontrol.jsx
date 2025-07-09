import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";



const CreateBookUnControl = (props) => {
    const { isCreateOpen, setIsCreateOpen, loadBook } = props;
    const [form] = Form.useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleSubmitBtn = async (values) => {
        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description:"Please upload thumbnail picture !"
            })
            return;
        }

        const resUpload = await handleUploadFile(selectedFile, "book")
        if (resUpload.data) {
            const newThumbnail = resUpload.data.fileUploaded;
            const { mainText, author, price, quantity, category} = values;
            const resBook = await createBookAPI(
                newThumbnail, mainText, author, price, quantity, category
            );
            if (resBook.data) {
                resetAndCloseModal()
                await loadBook();
                notification.success({
                    message: "Create book",
                    description:"Create book successfully !"
                })
            } else {
                notification.error({
                    message: "Error create book",
                    description: JSON.stringify(resBook.message)
                })
            }
        } else {
            notification.error({

                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }
    }
        
    

    const resetAndCloseModal = () => {
        form.resetFields();
        setSelectedFile(null);
        setPreview(null);
        setIsCreateOpen(false);
    }

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

}

    return (
        <Modal
            title="Create Book( Uncontrol Component"
            open={isCreateOpen}
            onOk={() => form.submit()}
            onCancel={()=>{resetAndCloseModal()}}
            maskClosable={false}
            okText={"CREATE"}
        >
            <Form
                form={form}
                onFinish={handleSubmitBtn}
                layout="vertical"
            >
                <div style={{
                    display:"flex", flexDirection:"column"
                }}>
                    <div>
                        <Form.Item
                            label="Title"
                            name="mainText"
                            rules={[
                                {
                                    required: true,
                                    message:" Title cannot be blank !"}
                            ]}
                            >
                            <Input />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            label="Author"
                            name="author"
                            rules={[
                                {
                                    required: true,
                                    message:" Author cannot be blank !"}
                            ]}
                            >
                            <Input />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message:" Price cannot be blank !"}
                            ]}
                            >
                            <InputNumber
                                style={{
                                    width: "100%"
                                }}
                                addonAfter={'VND'}
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            label="Quantity"
                            name="quantity"
                            rules={[
                                {
                                    required: true,
                                    message:" Quantity cannot be blank !"}
                            ]}
                            >
                            <InputNumber
                                style={{
                                    width: "100%"
                                }}
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            label="Category"
                            name="category"
                            rules={[
                                {
                                    required: true,
                                    message:" Category cannot be blank !"}
                            ]}
                        >
                            <Select
                                   style={{
                                    width: "100%"
                                }}
                                options={[
                                    { value: 'Arts', label: 'Arts' },
                                    { value: 'Business', label: 'Business' },
                                    { value: 'Comics', label: 'Comics' },

                                    { value: 'Cooking', label: 'Cooking' },
                                    { value: 'Entertainment', label: 'Entertainment' },
                                    { value: 'History', label: 'History' },

                                    { value: 'Music', label: 'Music' },
                                    { value: 'Sports', label: 'Sports' },
                                    { value: 'Teen', label: 'Teen' },
                                    { value: 'Travel', label: 'Travel' },
                                    ]}
                            />
                        </Form.Item>
                    </div>
                    <div>
                    <div>Thumbnail picture</div>
                    <div>
                        <label htmlFor="btnUpload" style={{
                            display: "block",
                            width: "fit-content",
                            marginTop: "15px",
                            padding: "5px 10px",
                            background: "orange",
                            borderRadius: "5px",
                            cursor:"pointer"
                        }}>
                            Upload
                        </label>
                        <input 
                            type="file" hidden id='btnUpload'
                            onChange={(event) => handleOnChangeFile(event)}
                                onClick={(event) => event.target.value = null}
                                style={{display:"none"}}
                        />
                    </div>
                
                {preview &&
                    <>
                        <div
                            style={{
                                marginTop: "10px",
                                marginBottom: "15px",
                                height:"100px", width:"150px"
                        }}>
                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={preview}
                            />
                        </div>
                    </>
                    }
                    </div>
                </div>
            </Form>
        </Modal>
    )
}


export default CreateBookUnControl;