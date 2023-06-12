import { useState } from "react";
import { Input } from "../components"
import ReactQuill from 'react-quill';
import type { UploadProps } from 'antd';
import 'react-quill/dist/quill.snow.css';
import { InboxOutlined } from "@ant-design/icons";
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
            <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
              Add Product
            </button>
          </form>
        </div>
    </div>
  )
}

export default AddProduct