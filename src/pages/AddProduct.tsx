import { useEffect, useState } from "react";
import { Input } from "../components"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { getAllBrands } from "../features/brands/brandSlice";
import { useSelector } from "react-redux";
import { getAllCategories } from "../features/categories/categorySlice";
import { getAllColors } from "../features/colors/colorSlice";
import { Multiselect } from "react-widgets/cjs";
import "react-widgets/styles.css";
import Dropzone from 'react-dropzone';
import { getUploadingImages, getDeletingImages } from "../features/uploads/uploadSlice";
interface colorArrProps {
  _id: string; 
  color: string;
}
interface brandsProps{
  title: string;
}
interface colorsProps{
  title: string;
  color: string;
  _id: string;
}
/* All form Validations */
let schema = yup.object().shape({
  title: yup.string()
    .required('Title is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required'),
  brand: yup.string().required('Brand is required'),
  category: yup.string().required('Category is required'),
  color: yup.array().required('Color is required'),
  quantity: yup.number().required('Quantity is required'),
})

function AddProduct() {

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      color: [],
      brand: '',
      category: '',
      quantity: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    }
  });

  const colorArr: colorArrProps[] = [];
  const [productColor, setProductColor] = useState<never[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllCategories());
    dispatch(getAllColors());
  }, [])
  
  /* Providing product brands data */

  const brands: brandsProps[] = useSelector((state: any) => state.brands.brands)

  /* Providing product categories data */
	interface categoriesProps{
		title: string;
	}
	const categories: categoriesProps[] = useSelector((state: any) => state.categories.categories)

  /* Providing product colors data */
  
	const colors: colorsProps[] = useSelector((state: any) => state.colors.colors)

  
  colors.forEach(color => {
    colorArr.push({
      _id: color._id,
      color: color.title
    })
  })

  /* Providing product images data */
  interface imagesProps{
		url: string;
    public_url: string;
	}
	const images: imagesProps[] = useSelector((state: any) => state.uploads.images)  

  useEffect(() => {
    formik.values.color = productColor;    
  }, [productColor])
    console.log(useSelector(state => state));
  return (
    <div>
        <h3 className="title mb-4">Add Product</h3>
        <div className="">
          <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
            <Input type="text" label="Enter product title" i_id="productTitle" name="title" onChange={formik.handleChange('title')}
            onBlur={formik.handleChange('title')}
            value={formik.values.title}
             />
             <div className="error">
                {formik.touched.title && formik.errors.title}
             </div>
            <div onBlur={formik.handleChange('description')}>
              <ReactQuill
                theme='snow'
                onChange={formik.handleChange('description')}
                value={formik.values.description}
            />
              <div className="error">
                  {formik.touched.description && formik.errors.description}
                </div>
            </div>
           <Input type="number" label="Enter Product Price" i_id="productPrice"
           onChange={formik.handleChange('price')}
           onBlur={formik.handleChange('price')}
           value={formik.values.price}
            />
            <div className="error">
              {formik.touched.price && formik.errors.price}
            </div>
            <select 
            onChange={formik.handleChange('brand')}
            onBlur={formik.handleChange('brand')}
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
             onBlur={formik.handleChange('category')}
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
            <Multiselect
              dataKey='id'
              textField='color'
              data={colorArr}
              placeholder="Select Color"
              onChange={(e: any) => setProductColor(e)}
              onBlur={formik.handleChange('color')}
              value={productColor}
             />
             
             <div className="error">
              
                {formik.touched.color && formik.errors.color}
              
             </div>
            <Input 
            type="number" label="Enter Product quantity" i_id="productQuantity"
            onChange={formik.handleChange('quantity')}
            onBlur={formik.handleChange('quantity')}
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
                  {images?.map((image, index) => (
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