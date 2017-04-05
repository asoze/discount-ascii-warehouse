import React, {Component} from 'react';
import oboe from 'oboe';
import ProductRow from './ProductRow.jsx';

export default class ProductTable extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			tableData: [],
			sortOrder: props.sortOrder,
			rowCount: 20,
			isLoading: false,
			displayedAds: []
		};

		this.sortTable = this.sortTable.bind(this);
		this.baseState = this.state;
	}

	componentWillMount() {
		this.constructDataset( 'api' );
	}

	fetch( limit, startAt, sortBy ) {
		console.log( "FETCH", limit, startAt, sortBy );
		this.setState( {
			isLoading: true
		});
		let idx = 0;
		if ( !limit || limit < 10 ) {
			limit = 10;
		}

		//Mandating that we'll always have a limit param
		let url = `api/products?limit=` + limit;

		let rows = [];
		if ( sortBy ) {
			url += `&sort=` + sortBy;
			//Reset state on sort
			this.setState( this.baseState );
		}

		if ( startAt ) {
			url += `&skipBy=` + startAt;
		}

		console.log( "URL", url );

		oboe( url )
			.done( function( elem ) {
				let row = {
					id: elem.id,
					date: elem.date,
					face: elem.face,
					size: elem.size,
					price: elem.price
				};
				rows.push( row );
				
				//Batching the state push
				if ( rows.length == limit ) {
					this.addRowsToState( rows );
				}
			}.bind( this ) );	
	}

	getAdvert() {
		let idAttempt = Math.floor( Math.random()*1000 );
		let dup = false;
		const adIds = this.state.displayedAds;
		for( let i = 0; i < adIds; i++ ) {
			if ( idAttempt == adIds[i] ) {
				dup = true;
			}
		}

		if ( dup ) {
			return this.getAdvert();
		} else {
			return idAttempt;
		}
	}

	addRowsToState( rows ) {
		let newRows = this.state.tableData.concat( rows );
		
		this.setState({ 
		    tableData: newRows,
		    isLoading: false
		})
	}

	buildAdRow() {
		const randomNum = this.getAdvert();

		const adRow = (
			<tr key={'idx' + randomNum + (Math.random()*1000)}>
				<td colSpan="5">
					<img className="ad" src={ "/ad/?r=" + randomNum } />
				</td>
			</tr>
		);
		
		return adRow;
	}

	constructDataset( source, url ) {
		if ( source && source === 'api' ) {
			this.fetch( `20` );
		}
		else if ( source && source === 'sortedApi' ) {
			this.fetch( null, null, 'price' );
		}
		else if ( source && source === 'timedPull' ) {
			const self = this;
			const time = setInterval( function() { self.fetch(`20`) }, 5000 );
		}
	}

	buildRows() {
		let rows = [];
		let formattedRow = '';

		this.state.tableData.map( (rowData, idx) => {
			let currentRow = null;
			
			if ( idx > 0 && idx % 20 == 0 ) {
				currentRow = this.buildAdRow();
			} 
			else {
				currentRow = (
					<ProductRow
						key = {'idx' + idx + Math.random()*1000}
						id = { rowData.id }
						size = { rowData.size }
						price = { rowData.price }
						face = { rowData.face }
						date = { rowData.date }
					></ProductRow>
					//I know I could just close it with />, but my syntax highlighting gets all messy, and I don't feel like screwing with it
				);
			}
			rows.push( currentRow );
		});

		return rows;
	}

	sortTable( criteria ) {
		const key = criteria.target.innerHTML;
		if ( key === 'Price' ) {
			this.fetch( null, null, `price` );
			this.buildRows();
		} else if ( key === 'ID') {
			this.fetch( null, null, `id` );
			this.buildRows();
		} else if ( key === 'Size' ) {
			this.fetch( null, null, `size` );
			this.buildRows();
		}
	}

	listenScrollEvent( e ) {
		const element = e.target;
		const percentDone = element.scrollTop / (element.scrollHeight - 262 );
		const rowCount = this.state.tableData.length;

		if ( percentDone > 0.6 ) {
			this.fetch( `20`, rowCount, null );
		}
	}

	render() {
		let loadingAnim = null;
		if ( this.state.isLoading ) {
			loadingAnim = ( <div id="loading"></div> );
		}
		else { 
			loadingAnim = ( <div style={{display:'none'}} id="loading"></div> );
		}
		return (
			<div>
				{ loadingAnim }
				<table>
					<thead className="fixedHeader">
						<tr>
							<th className="id column" onClick={ this.sortTable }>ID</th>
							<th className="size column" onClick={ this.sortTable }>Size</th>
							<th className="price column" onClick={ this.sortTable }>Price</th>
							<th className="face column" >Face</th>
							<th className="date column" >Date</th>
						</tr>
					</thead>
				</table>

				<table onScroll={this.listenScrollEvent.bind(this)}>
					<tbody className="scrollable">
						{this.buildRows() }
					</tbody>
				</table>
			</div>
		);
	}
}

ProductTable.propTypes = {
	data: React.PropTypes.array
}