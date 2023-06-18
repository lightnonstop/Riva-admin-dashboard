import { Table } from 'antd';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { deleteABrand, getAllBrands, resetBrandState } from '../features/brands/brandSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { CustomModal } from '../components';
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
	const [open, setOpen] = useState<boolean>(false);
	const [brandId, setBrandId] = useState<string>('');

	const showModal = (e: any) => {
		setOpen(true);
		setBrandId(e);
	}

	const hideModal = () => {
		setOpen(false);
	}
	const dispatch = useDispatch<AppDispatch>();
	interface brandsProps{
		_id: any;
		title: string;
	}
	const brands: brandsProps[] = useSelector((state: any) => state.brands.brands)
	
	useEffect(() => {
		dispatch(resetBrandState())
		dispatch(getAllBrands());
	}, [])

	const deleteBrand = (e: string) => {
		dispatch(deleteABrand(e))
		setOpen(false)
		setTimeout(() => {
			dispatch(getAllBrands())
		}, 1000)
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
						<button className='fs-3 text-danger ms-3 bg-transparent border-0' onClick={() => showModal(brands[i]._id)}>
							<AiFillDelete />
						</button>
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
			<CustomModal title='Are you sure you want to delete this brand' hideModal={hideModal} open={open} performAction={() => deleteBrand(brandId)} />
		</div>
	)
}

export default Brands;
