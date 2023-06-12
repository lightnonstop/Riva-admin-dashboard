import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllProducts } from '../features/products/productSlice';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
interface DataType{
	key: React.Key;
	title: string;
	price: string;
	quantity: number;
	brand: string;
	category: string;
	color: string;
	action: React.ReactElement;
}
const columns : ColumnsType<DataType> = [
	{
		title: 'S/N',
		dataIndex: 'key',
	},
	{
		title: 'Title',
		dataIndex: 'title',
		defaultSortOrder: 'descend',
    	sorter: (a, b) => a.title.length - b.title.length,
	},
	{
		title: 'Price',
		dataIndex: 'price',
		defaultSortOrder: 'descend',
    	sorter: (a, b) => a.price.length - b.price.length,
	},
	{
		title: 'Brand',
		dataIndex: 'brand',
		defaultSortOrder: 'descend',
    	sorter: (a, b) => a.brand.length - b.brand.length,
	},
	{
		title: 'Quantity',
		dataIndex: 'quantity',
	},
	{
		title: 'Category',
		dataIndex: 'category',
		defaultSortOrder: 'descend',
    	sorter: (a, b) => a.category.length - b.category.length,
	},
	{
		title: 'Color',
		dataIndex: 'color',
	},
	{
		title: 'Action',
		dataIndex: 'action',
	},
];
function ProductList(){
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getAllProducts());
		
	}, [])
	interface productsProps{
		title: string;
		quantity: number;
		price: string;
		brand: string;
		category: string;
		color: string;
	}
	const products: productsProps[] = useSelector((state: any) => state.products.products)
	
	const data1: DataType[] = [];
	for (let i = 0; i < products.length; i++){
			data1.push({
				key: i + 1,
				title: `${products[i].title}`,
				price: `${products[i].price}`,
				quantity: products[i].quantity,
				brand: products[i].brand,
				category: products[i].category,
				color: products[i].color,
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
			<h3 className='title  mb-4'>Product List</h3>
			<div>
				<Table columns={columns} dataSource={data1} />
			</div>
		</div>
	)
}

export default ProductList;
