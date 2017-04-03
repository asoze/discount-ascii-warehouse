import React, {Component} from 'react';

export default class ProductTable extends Component {

	constructor( props ) {
		super( props );
		this.state = {
			tableData: props.data
		};
	}

	buildRows() {
		let rows = [];
		let formattedRow = '';

		this.state.tableData.map( (rowData, idx) => {
			rows.push( 
				<tr key={'idx' + idx}>
					<td>{ rowData.id }</td>
					<td>{ rowData.size }</td>
					<td>{ rowData.price }</td>
					<td>{ rowData.face }</td>
					<td>{ rowData.date }</td>
				</tr>
			);
		});

		return rows;
	}

	render() {
		const data = this.state.tableData;
		return (
			<div>
			  	<h1>Available Products</h1>
			  	<table>
			  		<thead>
			  			<tr>
							<th>ID</th>
							<th>Size</th>
							<th>Price</th>
							<th>Face</th>
							<th>Date</th>
						</tr>
			  		</thead>
			  		<tbody>
				  		{ this.buildRows() }
				  	</tbody>
			  	</table>
			</div>
		);
	}
}

ProductTable.propTypes = {
	data: React.PropTypes.array
}