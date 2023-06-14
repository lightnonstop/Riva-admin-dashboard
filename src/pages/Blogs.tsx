import { Table } from 'antd';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { getAllBlogs } from '../features/blogs/blogSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
interface DataType{
	key: number;
	name: string;
	category: string;
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
		title: 'Category',
		dataIndex: 'category',
		sorter: (a, b) => a.name.length - b.name.length,
	},
	{
		title: 'Action',
		dataIndex: 'action',
	},
];
function Blogs(){
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getAllBlogs());
		
	}, [])
	interface blogsProps{
		title: string;
		category: string;
	}
	const blogs: blogsProps[] = useSelector((state: any) => state.blogs.blogs)
	
	const data1: DataType[] = [];
	for (let i = 0; i < blogs.length; i++){
			data1.push({
				key: i + 1,
				name: `${blogs[i].title}`,
				category: `${blogs[i].category}`,
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
			<h3 className='title  mb-4'>Blog Lists</h3>
			<div>
				<Table columns={columns} dataSource={data1} />
			</div>
		</div>
	)
}

export default Blogs;
