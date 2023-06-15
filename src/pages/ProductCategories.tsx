import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteAProductCategory, getAllProductCategories, resetProductCategoryState } from '../features/productCategories/productCategorySlice';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { CustomModal } from '../components';
interface DataType{
	key: number;
	name: string;
	action: React.ReactElement;
}
const columns : ColumnsType<DataType> = [
	{
		title: 'S/N',
		dataIndex: 'key',
	},
	{
		title: 'Name',
		dataIndex: 'name',
		defaultSortOrder: 'descend',
    	sorter: (a, b) => a.name.length - b.name.length,
	},
	{
		title: 'Action',
		dataIndex: 'action',
	},
];
function ProductCategories(){
	const [open, setOpen] = useState<boolean>(false);
	const [productCategoryId, setProductCategoryId] = useState<string>('');

	const showModal = (e: any) => {
		setOpen(true);
		setProductCategoryId(e);
	}

	const hideModal = () => {
		setOpen(false);
	}
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(resetProductCategoryState());
		dispatch(getAllProductCategories());
	}, [])
	interface categoriesProps{
		title: string;
		_id: string;
	}
	const productCategories: categoriesProps[] = useSelector((state: any) => state.productCategories.productCategories)
	const deleteProductCategory = (e: string) => {
		dispatch(deleteAProductCategory(e))
		setOpen(false)
		setTimeout(() => {
			dispatch(getAllProductCategories())
		}, 1000)
	}
	const data1: DataType[] = [];
	for (let i = 0; i < productCategories.length; i++){
			data1.push({
				key: i + 1,
				name: `${productCategories[i].title}`,
				action: (
					<>
						<Link className='fs-3 text-danger' to={`/admin/product-category/${productCategories[i]._id}`}>
							<BiEdit />
						</Link>
						<button className='fs-3 text-danger ms-3 bg-transparent border-0' onClick={() => showModal(productCategories[i]._id)}>
							<AiFillDelete />
						</button>
					</>
				),
			});
	}
	return (
		<div>
			<h3 className='title  mb-4'>Product Categories</h3>
			<div>
				<Table columns={columns} dataSource={data1} />
			</div>
			<CustomModal title='Are you sure you want to delete this product category?' hideModal={hideModal} open={open} performAction={() => deleteProductCategory(productCategoryId)} />
		</div>
	)
}

export default ProductCategories;
