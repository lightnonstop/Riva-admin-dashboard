import { Table } from 'antd';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { getAllCoupons } from '../features/coupons/couponSlice';
interface DataType{
	key: number;
	name: string;
	expiry: string;
	discount: string;
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
		title: 'Expiry Date',
		dataIndex: 'expiry',
	},
  {
		title: 'Percentage Discount',
		dataIndex: 'discount',
	},
	{
		title: 'Action',
		dataIndex: 'action',
	},
];
function Coupons(){
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getAllCoupons());
		
	}, [])
	interface couponsProps{
		name: string;
		expiry: string;
		discount: string;
	}
	const coupons: couponsProps[] = useSelector((state: any) => state.coupons.coupons)
	
	const data1: DataType[] = [];
	for (let i = 0; i < coupons.length; i++){
			data1.push({
				key: i + 1,
				name: `${coupons[i].name}`,
        expiry: new Date(coupons[i].expiry).toDateString(),
				discount: `${coupons[i].discount}%`,
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
			<h3 className='title  mb-4'>Coupon List</h3>
			<div>
				<Table columns={columns} dataSource={data1} />
			</div>
		</div>
	)
}

export default Coupons;
