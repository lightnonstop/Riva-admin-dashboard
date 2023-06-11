import { Table } from 'antd';
interface data1PropsObj{
	key: number;
	name: string;
	product: number;
	status: string;
}
const columns = [
	{
		title: 'S/N',
		dataIndex: 'key',
	},
	{
		title: 'Name',
		dataIndex: 'name',
	},
	{
		title: 'Product',
		dataIndex: 'product',
	},
	{
		title: 'Status',
		dataIndex: 'status',
	},
];
const data1: data1PropsObj[] = [];
for (let i = 0; i < 46; i++){
	data1.push({
		key: i,
		name: `Edward king ${i}`,
		product: 32,
		status: `London, Park Lane no. ${i}`,
	});
}
function BlogCategoryList(){
	return (
		<div>
			<h3 className='mb-4'>Blog Category List</h3>
			<div>
				<Table columns={columns} dataSource={data1} />
			</div>
		</div>
	)
}

export default BlogCategoryList;
