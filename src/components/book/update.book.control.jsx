import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";


const UpdateBookControl = (props) => {
    
    const {
        dataUpdate, setDataUpdate, loadBook, isModalUpdateOpen, setIsModalUpdateOpen
    } = props;

    const [id, setId] = useState("");
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category
        , setCategory] = useState("");
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            setId(dataUpdate._id);
            setMainText(dataUpdate.mainText);
            setAuthor(dataUpdate.author);
            setPrice(dataUpdate.price);
            setQuantity(dataUpdate.quantity);
            setCategory(dataUpdate.category);

            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book${dataUpdate.thumbnail}`);
        }
    }, [dataUpdate])

    const updateBook = async (newThumbnail) => {
        const resBook = await updateBookAPI(
            id, newThumbnail, mainText, author, price, quantity, category);
        if (resBook.data) {
            resetAndCloseModal()
            await loadBook();
            notification.success({
                message: "Update Book",
                description:"Update book successfully !"
            })
        } else {
            notification.error({
                message: "Error Update Book",
                description: JSON.stringify(resBook.message)
            })
        }
    }
    const handleSubmitBtn = async () => {
        if (!selectedFile && !preview) {
            notification.error({
                message: "Error update book",
                description: "Please upload thumbnail picture !"
            })
            return;
        }
        let newThumbnail = "";
        if (!selectedFile && !preview) {
            newThumbnail = dataUpdate.thumbnail
        } else {
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                newThumbnail = resUpload.data.fileUploaded;
            } else {
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpload.message)
                });
                return;
            }
        }
        await updateBook(newThumbnail);
    }
        
    

    const resetAndCloseModal = () => {
        setMainText('');
        setAuthor('');
        setPrice('');
        setQuantity('');
        setCategory('');
        setSelectedFile('');
        setPreview('');
        setId('');
        setDataUpdate(null);
        setIsModalUpdateOpen(false);
    }

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

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
                    <span>Title</span>
                    <Input 
                    value={mainText}
                        onChange={(event) => setMainText(event.target.value)}
                    />
                </div>
                
                <div>
                    <span>Author</span>
                    <Input
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                    />
                </div>
                <div>
                    <span>Price</span>
                <InputNumber
                    style={{ width: "100%" }}
                    addonAfter={' đ'}
                        value={price}
                        onChange={(event) => setPrice(event)}
                    />
                </div>
                <div>
                    <span>Quantity</span>
                <InputNumber
                    style={{ width: "100%" }}
                        value={quantity}
                        onChange={(event) => setQuantity(event)}
                    />
                </div>
                <div>
                    <span>Category</span>
                    <Select
                                   style={{
                                    width: "100%"
                    }}
                    value={category}
                        onChange={(value) => setCategory(value)}
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
            </Modal>
    )
    
}

export default UpdateBookControl;