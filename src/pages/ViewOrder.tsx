import { Table } from 'antd';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { getOrderByUser } from '../features/orders/orderSlice';
import { Link, useLocation } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
interface DataType {
	key: number;
	name: string;
	brand: {};
	price: string;
	count: string;
	color: string;
	date: string;
	action: React.ReactElement;
}
const columns: ColumnsType<DataType> = [
	{
		title: 'S/N',
		dataIndex: 'key',
	},
	{
		title: 'Product Name',
		dataIndex: 'name',
		sorter: (a, b) => a.name.length - b.name.length,
	},
	{
		title: 'Brand',
		dataIndex: 'brand',
	},
	{
		title: 'Count',
		dataIndex: 'count',
	},
	{
		title: 'Color',
		dataIndex: 'color',
	},
	{
		title: 'Price',
		dataIndex: 'price',
	},
	{
		title: 'Date, Time',
		dataIndex: 'date',
	},
	{
		title: 'Action',
		dataIndex: 'action',
	},
];

function ViewOrder() {
	const location = useLocation();
	const userId = location.pathname.split('/')[3]

	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getOrderByUser(userId));
	}, [])

	interface ordersByUserProps {
		products: { 
			product: { 
				title: string; 
				brand: string; 
				price: string; 
				createdAt: string 
			}; 
			count: number; 
			color: string; 
		}[];
	}

	const ordersByUser: ordersByUserProps = useSelector((state: any) => state.orders.orderByUser)
	const data1: DataType[] = [];
	if (ordersByUser) {
		const orders = ordersByUser.products;

		for (let i = 0; i < orders.length; i++) {
			data1.push({
				key: i + 1,
				name: `${orders[i].product.title}`,
				brand: `${orders[i].product.brand}`,
				count: `${orders[i].count}`,
				color: `${orders[i].color}`,
				price: `${orders[i].product.price}`,
				date: new Date(orders[i].product.createdAt).toLocaleString(),
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
	}

	return (
		<div>
			<h3 className='title  mb-4'>View User Order</h3>
			<div>
				<Table columns={columns} dataSource={data1} />
			</div>
		</div>
	)
}

export default ViewOrder;
