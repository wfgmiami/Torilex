import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import numeral from 'numeral';


export default class Content extends React.Component{

	constructor( props ){
		super();
	}

	
	render(){
 		console.log('..............in Content props', this.props);
		const portfolio = this.props.portfolio;
		let totalMV = 0;
		let MV = 0;
		let cost = 0;
		let numShares = 100;
		let ltdUGL = 0;
		let totalCost = 0;
		let totalLtdUgl = 0;

		return (
			<div>	
				<table>
				<caption>Portfolio Holdings</caption>
				 <thead>
					<tr>
						<th>Ticker</th>
						<th scope="col">Name</th>
						<th scope="col">Shares</th>
						<th scope="col">Price</th>
						<th scope="col">MV</th>
						<th scope="col">Cost</th>
						<th scope="col">LTD G/(L)</th>
						<th scope="col">Volume</th>
						<th scope="col">10 Day Avg Daily Volume </th>
						<th scope="col">Volume Change</th>
					</tr>
				</thead>
				<tbody>	
					
					{ portfolio && portfolio.map( ( stock, id ) => {
						let price = stock.quotes.price;
						let summary = stock.quotes.summaryDetail;
						let MV = price.regularMarketPrice * 100;
						let cost = 10000;
						let ltdUGL = MV - cost;
				
						totalMV += MV;	
						totalCost += cost;
						totalLtdUgl += ltdUGL;

						return(
							<tr key={ id }>
							<td>{ price.symbol }</td>
							<td>{ price.shortName }</td>
							<td className='numTd'>{ numShares }</td>
							<td className='numTd'>{ price.regularMarketPrice }</td>
							<td className='numTd'>{ MV }</td>
							<td className='numTd'>{ cost.toLocaleString() }</td>
							<td className='numTd'>{ ltdUGL.toLocaleString() } </td>
							<td className='numTd'>{ price.regularMarketVolume.toLocaleString() }</td>
							<td className='numTd'>{ price.averageDailyVolume10Day.toLocaleString() }</td>
							<td className='numTd'>{ ((price.regularMarketVolume / price.averageDailyVolume10Day - 1) * 100).toFixed(0) }%</td>
						</tr>		
					) } ) }
				
				</tbody>		
				<tfoot>
					<tr>
						<td colSpan="4">Total</td>
						<td className='numTd'>{ Number(totalMV.toFixed(0)).toLocaleString() }</td>
						<td className='numTd'>{ Number(totalCost.toFixed(0)).toLocaleString() }</td>
						<td className='numTd'>{ Number(totalLtdUgl.toFixed(0)).toLocaleString() } </td>
					</tr>
				</tfoot>
			</table>	
		</div>	
		)
	}

}
