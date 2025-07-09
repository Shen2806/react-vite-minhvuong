import { Input, InputNumber, Modal, notification, Select } from "antd";
import { createBookAPI, handleUploadFile } from "../../services/api.service";
import { useState } from "react";

const CreateBookControl = (props) => {

    const {isCreateOpen, setIsCreateOpen, loadBook } = props;

    const [mainText, setMainText] = useState("");

    const [author, setAuthor] = useState("");

    const [price, setPrice] = useState("");

    const [quantity, setQuantity] = useState("");

    const [category, setCategory] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);

    const [preview, setPreview] = useState(null);
    
    const handleSubmitBtn = async () => {
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

        setMainText("");
        
        setAuthor("");
        
        setPrice("");
        
        setQuantity("");
        
        setCategory("");
        
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
        
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file))
        }
    }
    return (
        <Modal
            title="Create Book"
            open={isCreateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Create"}
        >
            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    flexDirection:"column"
                }}
            >
                <div>
                    <span>Title</span>
                    <Input
                        value={mainText}
                        onChange={(event) => { setMainText(event.target.value) }}
                    />
                </div>
                <div>
                    <span>Author</span>
                    <Input
                        value={author}
                        onChange={(event)=>{setAuthor(event.target.value)}}
                    />
                </div>
                <div>
                    <div>Price</div>
                    <InputNumber 
                        style={{ width: "100%" }}
                        addonAfter={' VND'}
                        value={price}
                        onChange={(event)=>{setPrice(event)}}
                    />
                </div>
                <div>
                <div>Quantity</div>
                    <InputNumber 
                        style={{ width: "100%" }}
                        value={price}
                        onChange={(event)=>{setQuantity(event)}}
                    />
                </div>
                <div>
                    <div>Category</div>
                    <Select
                        style={{ width: "100%" }}
                        value={category}
                        onChange={(event) => { setCategory(event) }}
                        options={[
                            { value:'Arts', label:'Arts'},
                            { value:'Business', label:'Business'},
                            { value:'Comics', label:'Comics'},
                            { value:'Cooking', label:'Cooking'},
                            { value:'Entertainment', label:'Entertainment'},
                            { value:'History', label:'History'},
                            { value:'Music', label:'Music'},
                            { value:'Sports', label:'Sports'},
                            { value:'Teen', label:'Teen'},
                            { value:'Travel', label:'Travel'},
                        ]}
                    />
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
                            onClick={(event)=> event.target.value=null}
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
        </Modal>
    )
}

export default CreateBookControl;