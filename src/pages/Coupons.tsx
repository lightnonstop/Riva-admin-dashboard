import { Table } from 'antd';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { deleteACoupon, getAllCoupons, resetCouponState } from '../features/coupons/couponSlice';
import { CustomModal } from '../components';
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
	const [open, setOpen] = useState<boolean>(false);
	const [couponId, setCouponId] = useState<string>('');

	const showModal = (e: any) => {
		setOpen(true);
		setCouponId(e);
	}

	const hideModal = () => {
		setOpen(false);
	}
	useEffect(() => {
		dispatch(resetCouponState())
		dispatch(getAllCoupons());
	}, [])
	interface couponsProps{
		name: string;
		expiry: string;
		discount: string;
		_id: string;
	}
	const coupons: couponsProps[] = useSelector((state: any) => state.coupons.coupons)
	const deleteCoupon = (e: string) => {
		dispatch(deleteACoupon(e))
		setOpen(false)
		setTimeout(() => {
			dispatch(getAllCoupons())
		}, 1000)
	}
	const data1: DataType[] = [];
	for (let i = 0; i < coupons.length; i++){
			data1.push({
				key: i + 1,
				name: `${coupons[i].name}`,
        expiry: new Date(coupons[i].expiry).toDateString(),
				discount: `${coupons[i].discount}%`,
				action: (
					<>
						<Link className='fs-3 text-danger' to={`/admin/coupon/${coupons[i]._id}`}>
							<BiEdit />
						</Link>
						<button className='fs-3 text-danger ms-3 bg-transparent border-0' onClick={() => showModal(coupons[i]._id)}>
							<AiFillDelete />
						</button>
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
			<CustomModal title='Are you sure you want to delete this coupon' hideModal={hideModal} open={open} performAction={() => deleteCoupon(couponId)} />
		</div>
	)
}

export default Coupons;
