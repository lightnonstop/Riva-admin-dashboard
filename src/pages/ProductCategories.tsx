import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllProductCategories } from '../features/productCategories/productCategorySlice';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
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

	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getAllProductCategories());
		
	}, [])
	interface categoriesProps{
		title: string;
	}
	const productCategories: categoriesProps[] = useSelector((state: any) => state.productCategories.productCategories)
	
	const data1: DataType[] = [];
	for (let i = 0; i < productCategories.length; i++){
			data1.push({
				key: i + 1,
				name: `${productCategories[i].title}`,
				action: (
					<>
						<Link className='fs-3 text-danger' to='/'>
							<BiEdit />
						</Link>
						<Link className='fs-3 text-danger ms-3' to='/'>
							<AiFillDelete />
						</Link>
					</>
				),
			});
	}
	return (
		<div>
			<h3 className='title  mb-4'>Products Categories</h3>
			<div>
				<Table columns={columns} dataSource={data1} />
			</div>
		</div>
	)
}

export default ProductCategories;
