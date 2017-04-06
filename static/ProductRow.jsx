import React, {Component} from 'react';

export default class ProductRow extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			displayedAds: []
		};
	}
	buildFaceCell( size, face ) {
		return (
			<td className="face column" style={{'fontSize': size + 'px'}}>{ face }</td>
		);
	}

	buildDateCell( date ) {
		return (
			<td className="date column" > {this.buildFuzzyDate( date ) }</td>
		);
	}

	buildCurrencyCell( amt ) {
		if ( !amt ) {
			return ( <td>No Value</td> );
		}
		return (
			<td className="price column" >{ '$' + amt.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').toLocaleString() }</td>
		);
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

	buildAdRow( id ) {
		const adRow = (
			<tr key={'idx' + id}>
				<td colSpan="5">
					<img className="ad" src={ "/ad/?r=" + id } />
				</td>
			</tr>
		);
		
		return adRow;
	}

	render() {
		let row = null;
		if ( this.props.id === "AD" ) {
			row = this.buildAdRow( this.props.face );
		}
		else {
			row = (
				<tr>
					<td className="id column" >{ this.props.id }</td>
					<td className="size column" >{ this.props.size }</td>
					{ this.buildCurrencyCell( this.props.price ) }
					{ this.buildFaceCell( this.props.size, this.props.face ) }
					{ this.buildDateCell( this.props.date ) }
				</tr>
			);
		}
		return row;
	}
}