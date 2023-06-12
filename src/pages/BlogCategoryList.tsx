import { Table } from 'antd';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { getAllBlogCategories } from '../features/blogCategories/blogCategorySlice';
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
function BlogCategoryList(){
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getAllBlogCategories());
		
	}, [])
	interface blogCategoriesProps{
		title: string;
	}
	const blogCategories: blogCategoriesProps[] = useSelector((state: any) => state.blogCategories.blogCategories)
	console.log(blogCategories);
	
	const data1: DataType[] = [];
	for (let i = 0; i < blogCategories.length; i++){
			data1.push({
				key: i + 1,
				name: `${blogCategories[i].title}`,
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
			<h3 className='title  mb-4'>Blog Category List</h3>
			<div>
				<Table columns={columns} dataSource={data1} />
			</div>
		</div>
	)
}

export default BlogCategoryList;
