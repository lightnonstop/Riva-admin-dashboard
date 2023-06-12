import { Table } from 'antd';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { getAllEnquiries } from '../features/enquiries/enquirySlice';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
interface DataType{
	key: number;
	name: string;
	email: string;
	mobile: string;
	status: React.ReactElement;
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
		title: 'Email',
		dataIndex: 'email',
	},
	{
		title: 'Mobile',
		dataIndex: 'mobile',
	},
	{
		title: 'Status',
		dataIndex: 'status',
	},
	{
		title: 'Action',
		dataIndex: 'action',
	},
];
function Enquiries(){
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getAllEnquiries());
		
	}, [])
	interface enquiriesProps{
		name: string;
		email: string;
		mobile: string;
		status: React.ReactElement;
		action: React.ReactElement;
	}
	const enquiries: enquiriesProps[] = useSelector((state: any) => state.enquiries.enquiries)
	
	const data1: DataType[] = [];
	for (let i = 0; i < enquiries.length; i++){
			data1.push({
				key: i + 1,
				name: `${enquiries[i].name}`,
				email: `${enquiries[i].email}`,
				mobile: `${enquiries[i].mobile}`,
				status: (
						<>
							<select name="" id="" className='form-control form-select'>
								<option value="">Set Status</option>
							</select>
						</>
					),
				action: (
					<>
						<Link className='fs-3 text-danger ms-3' to='/'>
							<AiFillDelete />
						</Link>
					</>
				),
			});
	}
	return (
		<div>
			<h3 className='title  mb-4'>Enquiries</h3>
			<div>
				<Table columns={columns} dataSource={data1} />
			</div>
		</div>
	)
}

export default Enquiries;
