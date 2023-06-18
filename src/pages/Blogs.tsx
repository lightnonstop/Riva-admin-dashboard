import { Table } from 'antd';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { deleteABlog, getAllBlogs, resetBlogState } from '../features/blogs/blogSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { CustomModal } from '../components';
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
	const [open, setOpen] = useState<boolean>(false);
	const [blogId, setBlogId] = useState<string>('');

	const showModal = (e: any) => {
		setOpen(true);
		setBlogId(e);
	}

	const hideModal = () => {
		setOpen(false);
	}
	const dispatch = useDispatch<AppDispatch>();
	interface blogsProps{
		title: string;
		category: string;
		_id: string;
	}
	
	const blogs: blogsProps[] = useSelector((state: any) => state.blogs.blogs)
	

	useEffect(() => {
		dispatch(resetBlogState())
		dispatch(getAllBlogs());
	}, [])

	const deleteBlog = (e: string) => {
		dispatch(deleteABlog(e))
		setOpen(false)
		setTimeout(() => {
			dispatch(getAllBlogs())
		}, 1000)
	}
	const data1: DataType[] = [];
	for (let i = 0; i < blogs.length; i++){
			data1.push({
				key: i + 1,
				name: `${blogs[i].title}`,
				category: `${blogs[i].category}`,
				action: (
					<>
						<Link className='fs-3 text-danger' to={`/admin/blog/${blogs[i]._id}`}>
							<BiEdit />
						</Link>
						<button className='fs-3 text-danger ms-3 bg-transparent border-0' onClick={() => showModal(blogs[i]._id)}>
							<AiFillDelete />
						</button>
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
			<CustomModal title='Are you sure you want to delete this blog' hideModal={hideModal} open={open} performAction={() => deleteBlog(blogId)} />
		</div>
	)
}

export default Blogs;
