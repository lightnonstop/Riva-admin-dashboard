import React from 'react'
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs'
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

interface DataType{
	key: number;
	name: string;
	product: number;
	status: string;
}
const columns: ColumnsType<DataType> = [
	{
		title: 'S/N',
		dataIndex: 'key',
	},
	{
		title: 'Name',
		dataIndex: 'name',
	},
	{
		title: 'Products',
		dataIndex: 'product',
	},
	{
		title: 'Status',
		dataIndex: 'status',
	},
];
const data1: DataType[] = [];
for (let i = 0; i < 46; i++){
	data1.push({
		key: i,
		name: `Edward king ${i}`,
		product: 32,
		status: `London, Park Lane no. ${i}`,
	});
}
function Dashboard() {
	const data = [
		{
			type: 'Jan',
			sales: 38,
		},
		{
			type: 'Feb',
			sales: 52,
		},
		{
			type: 'Mar',
			sales: 61,
		},
		{
			type: 'Apr',
			sales: 145,
		},
		{
			type: 'May',
			sales: 48,
		},
		{
			type: 'Jun',
			sales: 38,
		},
		{
			type: 'Jul',
			sales: 38,
		},
		{
			type: 'Aug',
			sales: 38,
		},
		{
			type: 'Sep',
			sales: 38,
		},
		{
			type: 'Oct',
			sales: 38,
		},
		{
			type: 'Nov',
			sales: 38,
		},
		{
			type: 'Dec',
			sales: 38,
		}
	];
	const config = {
		data,
		xField: 'type',
		yField: 'sales',
		color: ({ }) => {
			return '#6fdc87';
		},
		label: {
			position: 'middle',
			style: {
				fill: '#FFFFFF',
				opacity: 1,
			},
		},
		xAxis: {
			label: {
				autoHide: true,
				autoRotate: false,
			},
		},
		meta: {
			type: {
				alias: 'Month',
			},
			sales: {
				alias: 'Income',
			},
		},
	};
	return (
		<div>
			<h3 className='title  mb-4'>Dashboard</h3>
			<div className='d-flex justify-content-between align-items-center gap-3'>
				<div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
					<div>
						<p className='ttl'>Total</p>
						<h4 className='mb-0 sub-title'>$1100</h4>
					</div>
					<div className='d-flex flex-column align-items-end'>
						<h6><BsArrowDownRight /> 32%</h6>
						<p className='mb-0 ttl'>Compare to April, 2023</p>
					</div>
				</div>
				<div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
					<div>
						<p className='ttl'>Total</p>
						<h4 className='mb-0 sub-title'>$1100</h4>
					</div>
					<div className='d-flex flex-column align-items-end'>
						<h6 className='green'><BsArrowUpRight /> 32%</h6>
						<p className='mb-0 ttl'>Compare to April, 2023</p>
					</div>
				</div>
				<div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
					<div>
						<p className='ttl'>Total</p>
						<h4 className='mb-0 sub-title'>$1100</h4>
					</div>
					<div className='d-flex flex-column align-items-end'>
						<h6 className='red'><BsArrowDownRight /> 32%</h6>
						<p className='mb-0 ttl'>Compare to April, 2023</p>
					</div>
				</div>
			</div>
			<div className="mt-4">
				<h3 className='title mb-5'>Income Statistics</h3>
				<div>
					<Column {...config} />
				</div>
			</div>
			<div className="mt-4">
				<h3 className="title mb-5">
					Recent Orders
				</h3>
				<div>
					<Table columns={columns} dataSource={data1} />
				</div>
			</div>
		</div>
	)
}

export default Dashboard
