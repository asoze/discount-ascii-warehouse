import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ProductTable from './ProductTable.jsx';

export default class Base extends Component {
	constructor( props ) {
		super( props );
		
		this.state = {
			sort: 'id'
		};
	}

	render() {
		return (
		  	<div>
			  	<ProductTable sortOrder={this.state.sort} />
			</div>
		);
	}
}

ReactDOM.render(
	<Base />,
	document.getElementById('productTable')
);

