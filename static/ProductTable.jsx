import React, {Component} from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import oboe from 'oboe';

export default class ProductTable extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			tableData: [],
			sortOrder: props.sortOrder
		};

		this.sortTable = this.sortTable.bind(this);
		this.baseState = this.state;
	}

	componentDidMount() {
		this.constructDataset( 'api' );
	}

	fetch( url ) {
		this.setState( this.baseState );
		const self = this;

		oboe( url )
			.done( function( elem ) {
				const td = this.state.tableData;

				let row = {
					id: elem.id,
					date: elem.date,
					face: elem.face,
					size: elem.size,
					price: elem.price
				};

				this.setState({ 
				    tableData: td.concat([ row ])
				})
			}.bind( this ) );
	}

	constructDataset( source, url ) {
		if ( source && source === 'file') {
			const dataset = [
				{"id":"0-d2hxy2j827m24p3ihjhn2ep14i","size":17,"price":23,"face":"( .-. )","date":"Tue Mar 28 2017 21:40:25 GMT-0400 (EDT)"},
				{"id":"1-8rgymv79ktih13g9e4vv1v2t9","size":37,"price":980,"face":"( .o.)","date":"Fri Mar 24 2017 04:50:40 GMT-0400 (EDT)"},
				{"id":"2-maff4ksk05a2168rcjcq5mi","size":23,"price":104,"face":"( `·´ )","date":"Fri Mar 24 2017 09:11:45 GMT-0400 (EDT)"},
				{"id":"3-wgsymur5oymkxhkzu2fbt9","size":17,"price":888,"face":"( ° ͜ ʖ °)","date":"Mon Mar 27 2017 15:26:40 GMT-0400 (EDT)"},
				{"id":"4-1rle56wc93hj455x9p1i7ctyb9","size":19,"price":751,"face":"( ͡° ͜ʖ ͡°)","date":"Fri Mar 24 2017 07:53:16 GMT-0400 (EDT)"},
				{"id":"5-o30j9roooyohta163145wb3xr","size":37,"price":513,"face":"( ⚆ _ ⚆ )","date":"Mon Mar 27 2017 17:06:28 GMT-0400 (EDT)"},
				{"id":"6-rbh3k6h078ndjvzerukmaemi","size":28,"price":497,"face":"( ︶︿︶)","date":"Wed Mar 22 2017 04:20:16 GMT-0400 (EDT)"},
				{"id":"7-6qy1m84ahde8wky7e2gipe3ik9","size":30,"price":577,"face":"( ﾟヮﾟ)","date":"Thu Mar 30 2017 17:42:32 GMT-0400 (EDT)"},
			];

			this.setState( {
				tableData: dataset
			});
		} 
		else if ( source && source === 'api' ) {
			this.fetch( `/api/products?limit=20` );
		}
		else if ( source && source === 'sortedApi' ) {
			this.fetch( url );
		}
	}

	buildFaceCell( size, face ) {
		return (
			<td style={{'fontSize': size + 'px'}}>{ face }</td>
		);
	}

	buildDateCell( date ) {
		return (
			<td> {this.buildFuzzyDate( date ) }</td>
		);
	}

	buildCurrencyCell( amt ) {
		return (
			<td>{ '$' + amt.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').toLocaleString() }</td>
		);
	}

	buildRows() {
		let rows = [];
		let formattedRow = '';

		this.state.tableData.map( (rowData, idx) => {
			rows.push( 
				<tr key={'idx' + idx}>
					<td>{ rowData.id }</td>
					<td>{ rowData.size }</td>
					{ this.buildCurrencyCell( rowData.price ) }
					{ this.buildFaceCell( rowData.size, rowData.face ) }
					{ this.buildDateCell( rowData.date ) }
				</tr>
			);
		});

		return rows;
	}

	buildFuzzyDate( dateStr ) {
		const date = new Date( dateStr );
		var delta = Math.round((+new Date - date) / 1000);

		var minute = 60,
		    hour = minute * 60,
		    day = hour * 24,
		    week = day * 7;

		var fuzzy;

		if (delta < 30) {
		    fuzzy = 'just now';
		} else if (delta < minute) {
		    fuzzy = delta + ' seconds ago.';
		} else if (delta < 2 * minute) {
		    fuzzy = 'a minute ago.'
		} else if (delta < hour) {
		    fuzzy = Math.floor(delta / minute) + ' minutes ago.';
		} else if (Math.floor(delta / hour) == 1) {
		    fuzzy = '1 hour ago.'
		} else if (delta < day) {
		    fuzzy = Math.floor(delta / hour) + ' hours ago.';
		} else if (delta < day * 2) {
		    fuzzy = 'yesterday';
		} else if ( delta < week ) {
			fuzzy = Math.floor( delta / day ) + ' days ago.';
		} else {
			fuzzy = dateStr;
		}

		return fuzzy;
	}

	sortTable( criteria ) {
		const key = criteria.target.innerHTML;
		if ( key === 'Price' ) {
			this.fetch( `/api/products?sort=price` );
			this.buildRows();
		} else if ( key === 'ID') {
			this.fetch( `/api/products?sort=id` );
			this.buildRows();
		} else if ( key === 'Size' ) {
			this.fetch( `/api/products?sort=size` );
			this.buildRows();
		}
	}

	render() {
		const data = this.state.tableData;

		return (
			<table>
				<thead>
					<tr>
						<th onClick={ this.sortTable }>ID</th>
						<th onClick={ this.sortTable }>Size</th>
						<th onClick={ this.sortTable }>Price</th>
						<th>Face</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{this.buildRows() }
				</tbody>
			</table>
		);
	}
}

ProductTable.propTypes = {
	data: React.PropTypes.array
}