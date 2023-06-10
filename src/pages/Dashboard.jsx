import React from 'react'
import { BsArrowDownRight } from 'react-icons/bs'
import { Column } from '@ant-design/plots';
function Dashboard() {
	const data = [
		{
			type: '家具家电',
			sales: 38,
		},
		{
			type: '粮油副食',
			sales: 52,
		},
		{
			type: '生鲜水果',
			sales: 61,
		},
		{
			type: '美容洗护',
			sales: 145,
		},
		{
			type: '母婴用品',
			sales: 48,
		},
		{
			type: '进口食品',
			sales: 38,
		},
		{
			type: '食品饮料',
			sales: 38,
		},
		{
			type: '家庭清洁',
			sales: 38,
		},
	];
	const config = {
		data,
		xField: 'type',
		yField: 'sales',
		label: {
			position: 'middle',
			style: {
				fill: '#FFFFFF',
				opacity: 0.6,
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
				alias: '类别',
			},
			sales: {
				alias: '销售额',
			},
		},
	};
	return (
		<div>
			<h3 className='mb-4'>Dasboard</h3>
			<div className='d-flex justify-content-between align-items-center gap-3'>
				<div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
					<div>
						<p>Total</p>
						<h4 className='mb-0'>$110</h4>
					</div>
					<div className='d-flex flex-column align-items-end'>
						<h6 className=''><BsArrowDownRight /> 32%</h6>
						<p className='mb-0'>Compare to April, 2023</p>
					</div>
				</div>
				<div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
					<div>
						<p>Total</p>
						<h4 className='mb-0'>$110</h4>
					</div>
					<div className='d-flex flex-column align-items-end'>
						<h6 className='green'><BsArrowDownRight /> 32%</h6>
						<p className='mb-0'>Compare to April, 2023</p>
					</div>
				</div>
				<div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
					<div>
						<p>Total</p>
						<h4 className='mb-0'>$110</h4>
					</div>
					<div className='d-flex flex-column align-items-end'>
						<h6 className='red'><BsArrowDownRight /> 32%</h6>
						<p className='mb-0'>Compare to April, 2023</p>
					</div>
				</div>
			</div>
			<div className="mt-4">
				<h3 className='mb-4'>Income Statistics</h3>
				<div>
					<Column {...config} />;
				</div>
			</div>
		</div>
	)
}

export default Dashboard
