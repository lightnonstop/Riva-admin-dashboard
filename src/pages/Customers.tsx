import { Table } from 'antd';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllUsers } from '../features/customers/customerSlice';
import { useSelector } from 'react-redux';
import type { ColumnsType } from 'antd/es/table';
interface DataType{
	key: React.Key;
	name: string;
	mobile: number;
	email: string;
}
const columns: ColumnsType<DataType> = [
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
		title: 'Email',
		dataIndex: 'email',
	},
	{
		title: 'Mobile',
		dataIndex: 'mobile',
	},
];
function Customers(){
	
	interface customersProps{
		firstname: string;
		lastname: string;
		email: string;
		mobile: number;
		role: string;
	}
	const customers: customersProps[] = useSelector((state: any) => state.customers.customers)
	const data1: DataType[] = [];
	for (let i = 0; i < customers.length; i++){
		if (customers[i].role !== 'admin'){
			data1.push({
				key: i + 1,
				name: `${customers[i].firstname} ${customers[i].lastname}`,
				email: customers[i].email,
				mobile: customers[i].mobile,
			});
		}
	}
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getAllUsers());
		
	}, [])
	return (
		<div>
			<h3 className='title  mb-4'>Customers</h3>
			<div>
				<Table columns={columns} dataSource={data1} />
			</div>
		</div>
	)
}

export default Customers;
