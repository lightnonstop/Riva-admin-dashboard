import { Table } from 'antd';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { deleteABlogCategory, getAllBlogCategories, resetBlogCategoryState } from '../features/blogCategories/blogCategorySlice';
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
function BlogCategories(){
	const [open, setOpen] = useState<boolean>(false);
	const [blogCategoryId, setBlogCategoryId] = useState<string>('');

	const showModal = (e: any) => {
		setOpen(true);
		setBlogCategoryId(e);
	}

	const hideModal = () => {
		setOpen(false);
	}
	const dispatch = useDispatch<AppDispatch>();
	interface blogCategoriesProps{
		title: string;
		_id: string;
	}
	const blogCategories: blogCategoriesProps[] = useSelector((state: any) => state.blogCategories.blogCategories)

	useEffect(() => {
		dispatch(resetBlogCategoryState())
		dispatch(getAllBlogCategories());
	}, [])

	const deleteBlogCategory = (e: string) => {
		dispatch(deleteABlogCategory(e))
		setOpen(false)
		setTimeout(() => {
			dispatch(getAllBlogCategories())
		}, 1000)
	}
	const data1: DataType[] = [];
	for (let i = 0; i < blogCategories.length; i++){
			data1.push({
				key: i + 1,
				name: `${blogCategories[i].title}`,
				action: (
					<>
						<Link className='fs-3 text-danger' to={`/admin/blog-category/${blogCategories[i]._id}`}>
							<BiEdit />
						</Link>
						<button className='fs-3 text-danger ms-3 bg-transparent border-0' onClick={() => showModal(blogCategories[i]._id)}>
							<AiFillDelete />
						</button>
					</>
				),
			});
	}
	return (
		<div>
			<h3 className='title  mb-4'>Blog Category List</h3>
			<div>
				<Table columns={columns} dataSource={data1} />
			</div>
			<CustomModal title='Are you sure you want to delete this blog category' hideModal={hideModal} open={open} performAction={() => deleteBlogCategory(blogCategoryId)} />
		</div>
	)
}

export default BlogCategories;
