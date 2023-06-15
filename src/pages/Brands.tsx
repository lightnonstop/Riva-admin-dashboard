import { Table } from 'antd';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { getAllBrands, resetBrandState } from '../features/brands/brandSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
interface DataType{
	key: number;
	name: string;
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
		title: 'Action',
		dataIndex: 'action',
	},
];
function Brands(){
	const dispatch = useDispatch<AppDispatch>();
	const brands: brandsProps[] = useSelector((state: any) => state.brands.brands)
	console.log(brands);
	
	useEffect(() => {
		dispatch(resetBrandState())
		dispatch(getAllBrands());
	}, [])
	interface brandsProps{
		_id: any;
		title: string;
	}
	
	const data1: DataType[] = [];
	for (let i = 0; i < brands.length; i++){
			data1.push({
				key: i + 1,
				name: `${brands[i].title}`,
				action: (
					<>
						<Link className='fs-3 text-danger' to={`/admin/brand/${brands[i]._id}`}>
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
			<h3 className='title  mb-4'>Brand List</h3>
			<div>
				<Table columns={columns} dataSource={data1} />
			</div>
		</div>
	)
}

export default Brands;
