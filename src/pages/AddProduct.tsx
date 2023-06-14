import { useCallback, useEffect, useState } from "react";
import { Input } from "../components"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Select } from "antd";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { getAllBrands } from "../features/brands/brandSlice";
import { useSelector } from "react-redux";
import { getAllCategories } from "../features/categories/categorySlice";
import { getAllColors } from "../features/colors/colorSlice";
import Dropzone from 'react-dropzone';
import { getUploadingImages, getDeletingImages } from "../features/uploads/uploadSlice";
import { createAProduct } from "../features/products/productSlice";
/* All form Validations */
let schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required'),
  brand: Yup.string().required('Brand is required'),
  category: Yup.string().required('Category is required'),
  tag: Yup.string().required('Tag is required'),
  color: Yup.array().min(1, "Pick at least one color").required('Color is required'),
  image: Yup.array().required('Image is required'),
  quantity: Yup.number().required('Quantity is required'),
})

function AddProduct() {
  /* Product states */
  const [productColor, setProductColor] = useState<[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllCategories());
    dispatch(getAllColors());
  }, [])
  

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      color: '',
      image: [],
      brand: '',
      category: '',
      quantity: '',
      tag: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // dispatch(createAProduct(values))
      alert(JSON.stringify(values));
    }
  });


  /* Providing product brands data */
  interface brandsProps{
    title: string;
  }
  const brands: brandsProps[] = useSelector((state: any) => state.brands.brands)

  /* Providing product categories data */
	interface categoriesProps{
		title: string;
	}
	const categories: categoriesProps[] = useSelector((state: any) => state.categories.categories)

  /* Providing product colors data */

  interface colorsProps{
    title: string;
    color: string;
    _id: string;
  } 
	const colors: colorsProps[] = useSelector((state: any) => state.colors.colors)

  interface colorArrProps {
    label: string; 
    value: string;
  }
  const coloropt: colorArrProps[] = [];
  
  colors.forEach(color => {
    coloropt.push({
      value: color._id,
      label: color.title
    })
  })

  /* Providing product images data */

  interface imagesProps{
		url: string;
    public_id: string;
	}
	const images: imagesProps[] = useSelector((state: any) => state.uploads.images)
  const imageArr: any= [];

  images.forEach(image => {
    imageArr.push({
      public_id: image.public_id,
      url: image.url
    })
  })

  const handleColors = useCallback((e: []) => {
    setProductColor(e)
    console.log(productColor);
  }, [productColor])
  
  useEffect(() => {
    formik.values.color = productColor ? productColor : '';
    formik.values.image = imageArr;    
  }, [productColor, imageArr])
  return (
    <div>
        <h3 className="title mb-4">Add Product</h3>
        <div className="">
          <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
            <Input type="text" label="Enter product title" i_id="productTitle" name="title" 
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            value={formik.values.title}
             />
             <div className="error">
                {formik.touched.title && formik.errors.title}
             </div>
            <div>
              <ReactQuill
                theme='snow'
                onChange={formik.handleChange('description')}
                onBlur={formik.handleBlur('description')}
                value={formik.values.description}
            />
              <div className="error">
                  {formik.touched.description && formik.errors.description}
                </div>
            </div>
           <Input type="number" label="Enter Product Price" i_id="productPrice"
           onChange={formik.handleChange('price')}
           onBlur={formik.handleBlur('price')}
           value={formik.values.price}
            />
            <div className="error">
              {formik.touched.price && formik.errors.price}
            </div>
            <select 
            onChange={formik.handleChange('brand')}
            onBlur={formik.handleBlur('brand')}
            value={formik.values.brand}
            name="brand" 
            className='form-control py-3 mb-3' 
            id="">
              <option value="">Select Brand</option>
              {
                brands.map((brand, key) => (
                  <option key={key} value={brand.title}>
                    {brand.title}
                  </option>
                ))
              }
            </select>
            <div className="error">
                {formik.touched.brand && formik.errors.brand}
             </div>
            <select
             onChange={formik.handleChange('category')}
             onBlur={formik.handleBlur('category')}
             value={formik.values.category}
             name="category" 
             className='form-control py-3 mb-3' id="">
              <option value="">Select Category</option>
              {
                categories.map((category, key) => (
                  <option key={key} value={category.title}>
                    {category.title}
                  </option>
                ))
              }
            </select>
            <div className="error">
                {formik.touched.category && formik.errors.category}
             </div>
            <select
             onChange={formik.handleChange('tag')}
             onBlur={formik.handleBlur('tag')}
             value={formik.values.tag}
             name="tag" 
             className='form-control py-3 mb-3' id="">
              <option value="" disabled selected>Select Category</option>
              <option value="featured">Featured</option>
              <option value="popular">Popular</option>
              <option value="special">Special</option>
            </select>

            <div className="error">
                {formik.touched.tag && formik.errors.tag}
             </div>
            <Select
              mode="multiple"
              allowClear
              className="w-100"
              placeholder='Select colors'
              defaultValue={productColor}
              options={coloropt}
              onChange={handleColors}
             />
             
             <div className="error">
              
                {formik.touched.color && formik.errors.color}
              
             </div>
            <Input 
            type="number" 
            label="Enter Product quantity" 
            i_id="productQuantity"
            onChange={formik.handleChange('quantity')}
           onBlur={formik.handleBlur('quantity')}
            value={formik.values.quantity}
             />
             <div className="error">
                {formik.touched.quantity && formik.errors.quantity}
             </div>
             <div className="bg-white border-1 p-5 text-center">
              <Dropzone onDrop={(acceptedFiles) => dispatch(getUploadingImages(acceptedFiles))} >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div { ...getRootProps() }>
                      <input { ...getInputProps() } />
                      <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                  </section>
                )}
              </Dropzone>
             </div>
             <div className="show-images d-flex border-3">
                  {images?.map((image: any, index) => (
                    <div key={index}className="position-relative">
                      <button className="btn-close position-absolute" style={{ top: '5px', right: '5px' }} onClick={() => dispatch(getDeletingImages(image.public_url))} />
                      <img src={image.url} alt="" width={200}height={200} />
                    </div>
                  ))}
             </div>
            <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
              Add Product
            </button>
          </form>
        </div>
    </div>
  )
}

export default AddProduct