import { useState } from "react";
import { Input } from "../components"
import ReactQuill from 'react-quill';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import 'react-quill/dist/quill.snow.css';
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};
function AddProduct() {
  const [blogDesc, setBlogDesc] = useState('');
  function handleBlogDesc(e: any){
    setBlogDesc(e);
  }
  return (
    <div>
        <h3 className="title mb-4">Add Product</h3>
        <div className="">
          <form action="">
            <Input type="text" label="Enter product title" i_id="productTitle" />
            <div className="mb-3">
              <ReactQuill
                theme='snow'
                value={blogDesc}
                onChange={(evt) => {handleBlogDesc(evt)}}
            />
            </div>
           <Input type="number" label="Enter Product Price" i_id="productPrice" />
            <select name="" className='form-control py-3 mb-3' id="">
              <option value="">Select Brand</option>
            </select>
            <select name="" className='form-control py-3 mb-3' id="">
              <option value="">Select Category</option>
            </select>
            <select name="" className='form-control py-3 mb-3' id="">
              <option value="">Select Color</option>
            </select>
            <Input type="number" label="Enter Product Price" i_id="productPrice" />
            <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from uploading company data or other
              banned files.
            </p>
            </Dragger>
            <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
              Add Product
            </button>
          </form>
        </div>
    </div>
  )
}

export default AddProduct