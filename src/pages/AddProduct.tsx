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
let schema = yup.object().shape({
  title: yup.string()
    .required('Title is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required'),
})

function AddProduct() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllCategories());
    dispatch(getAllColors());
  }, [])

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

  const colorArr: { _id: string; color: string }[] = [];
  
  colors.forEach(color => {
    colorArr.push({
      _id: color._id,
      color: color.title
    })
  })
console.log(colors);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    }
  });
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
            <select name="" className='form-control py-3 mb-3' id="">
              <option value="">Select Brand</option>
              {
                brands.map((brand, key) => (
                  <option key={key} value={brand.title}>
                    {brand.title}
                  </option>
                ))
              }
            </select>
            <select name="" className='form-control py-3 mb-3' id="">
              <option value="">Select Category</option>
              {
                categories.map((category, key) => (
                  <option key={key} value={category.title}>
                    {category.title}
                  </option>
                ))
              }
            </select>
            <Multiselect
              dataKey='id'
              textField='color'
              data={colorArr}
             />
            {/* <select name="" className='form-control py-3 mb-3' id="">
              <option value="">Select Color</option>
            </select> */}
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