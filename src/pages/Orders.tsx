import { Table } from 'antd';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { getAllOrders } from '../features/orders/orderSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
interface DataType{
	key: number;
	name: string;
	product: {};
	amount: number;
	date: string;
	action: React.ReactElement;
}
const columns: ColumnsType<DataType> = [
	{
		title: 'S/N',
		dataIndex: 'key',
	},
	{
		title: 'Name',
		dataIndex: 'name',
		sorter: (a, b) => a.name.length - b.name.length,
	},
	{
		title: 'Product',
		dataIndex: 'product',
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
	},
	{
		title: 'Date , Time',
		dataIndex: 'date',
	},
	{
		title: 'Action',
		dataIndex: 'action',
	},
];

function Orders(){
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getAllOrders());		
	}, [])
	interface ordersProps{
		title: string;
		products: [];
		createdAt: any;
		paymentIntent: { amount: number};
		orderBy: {firstname: string};
	}
	const orders: ordersProps[] = useSelector((state: any) => state.orders.orders)
	
	const data1: DataType[] = [];
	for (let i = 0; i < orders.length; i++){
			data1.push({
				key: i + 1,
				name: `${orders[i].orderBy.firstname}`,
				product: orders[i].products.map((product: { product: { title: string } }, key) => (
					<ul className='list-unstyled' key={key}>
						<li>{product.product.title}</li>
					</ul>
				)),
				amount: orders[i].paymentIntent.amount,
				date: new Date(orders[i].createdAt).toLocaleString(),
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
			<h3 className='title  mb-4'>Orders</h3>
			<div>
				<Table columns={columns} dataSource={data1} />
			</div>
		</div>
	)
}

export default Orders;
