import { Table } from 'antd';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { deleteAColor, getAllColors, resetColorState } from '../features/colors/colorSlice';
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

function Colors(){
	const [open, setOpen] = useState<boolean>(false);
	const [colorId, setBrandId] = useState<string>('');

	const showModal = (e: any) => {
		setOpen(true);
		setBrandId(e);
	}

	const hideModal = () => {
		setOpen(false);
	}
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getAllColors());
		
	}, [])
	interface colorsProps{
		title: string;
		_id: string;
	}
	const colors: colorsProps[] = useSelector((state: any) => state.colors.colors)

	useEffect(() => {
		dispatch(resetColorState())
		dispatch(getAllColors());
	}, [])
	const deleteColor = (e: string) => {
		dispatch(deleteAColor(e))
		setOpen(false)
		setTimeout(() => {
			dispatch(getAllColors())
		}, 1000)
	}
	const data1: DataType[] = [];
	for (let i = 0; i < colors.length; i++){
			data1.push({
				key: i + 1,
				name: `${colors[i].title}`,
				action: (
					<>
						<Link className='fs-3 text-danger' to={`/admin/color/${colors[i]._id}`}>
							<BiEdit />
						</Link>
						<button className='fs-3 text-danger ms-3 bg-transparent border-0' onClick={() => showModal(colors[i]._id)}>
							<AiFillDelete />
						</button>
					</>
				),
			});
	}
	return (
		<div>
			<h3 className='title  mb-4'>Color List</h3>
			<div>
				<Table columns={columns} dataSource={data1} />
			</div>
			<CustomModal title='Are you sure you want to delete this color' hideModal={hideModal} open={open} performAction={() => deleteColor(colorId)} />
		</div>
	)
}

export default Colors;
