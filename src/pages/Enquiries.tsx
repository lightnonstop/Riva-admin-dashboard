import { Table } from 'antd';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { deleteAnEnquiry, getAllEnquiries, updateAnEnquiry } from '../features/enquiries/enquirySlice';
import { Link } from 'react-router-dom';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import { CustomModal } from '../components';
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
	const [open, setOpen] = useState<boolean>(false);
	const [enquiryId, setEnquiryId] = useState<string>('');

	const showModal = (e: any) => {
		setOpen(true);
		setEnquiryId(e);
	}

	const hideModal = () => {
		setOpen(false);
	}
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getAllEnquiries());		
	}, [])
	const deleteEnquiry = (e: string) => {
		dispatch(deleteAnEnquiry(e))
		setOpen(false)
		setTimeout(() => {
			dispatch(getAllEnquiries())
		}, 1000)
	}
	function setEnquiryStatus(e: React.ChangeEvent<HTMLSelectElement>, id: string){
		const data = { id, enquiryValues: e.target.value }
		dispatch(updateAnEnquiry(data))
	}
	interface enquiriesProps{
		name: string;
		email: string;
		mobile: string;
		status: string;
		action: React.ReactElement;
		_id: string;
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
							<select 
                        name="" 
                        defaultValue={enquiries[i].status ? enquiries[i].status : "Submitted"}
                        id=""
                        className="form-control form-select"
						onChange={(e) => setEnquiryStatus(e, enquiries[i]._id)}
                        >
                            <option value="Submitted">Submitted</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
						</>
					),
				action: (
					<>
						<Link className='fs-3 text-danger ms-3' to={`/admin/enquiry/${enquiries[i]._id}`}>
							<AiOutlineEye />
						</Link>
						<button className='fs-3 text-danger ms-3 bg-transparent border-0' onClick={() => showModal(enquiries[i]._id)}>
							<AiFillDelete />
						</button>
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
			<CustomModal title='Are you sure you want to delete this enquiry' hideModal={hideModal} open={open} performAction={() => deleteEnquiry(enquiryId)} />
		</div>
	)
}

export default Enquiries;
