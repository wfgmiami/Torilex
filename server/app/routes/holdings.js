const express = require('express');
const router = new express.Router();
const yahooFinance = require('yahoo-finance');

const portfolio = ['FB', 'AAPL', 'SNH', 'TA', 'NAT','A', 'JPM','BA', 'C', 'GS', 'BRKB','AMZN','STLD','SBUX','WMT','TSLA','V','MSFT','XOM','M'];
module.exports = router;


router.get('/', (req, res, next) => {
	let stocksArray = [];
	
	portfolio.forEach( stock => {
		yahooFinance.quote({
			symbol: stock,
			modules:['price', 'summaryDetail']
		})	
		.then( quotes => stocksArray.push( { quotes } ) ) 	
		.then( () => {
			
			if( stocksArray.length === portfolio.length ){
				let tempArr = [];
				stocksArray.forEach( stock => {
					tempArr.push( stock.quotes.price.symbol );
				})
				tempArr.sort();
				let holdings = [];
				tempArr.forEach( stock => {
					holdings = holdings.concat( stocksArray.filter( origObj => origObj.quotes.price.symbol === stock ));
				})
				console.log('.............holdings', holdings);
				return holdings;
			}
		})
		.then( holdings =>{
			if( holdings ) res.send( holdings );
		} )
		.catch( next );
	})
})

router.get('/pmt/filter', (req, res, next) => {

	const { sector } = req.query;
	let filteredArray = [];
	sector.forEach( sect => {
		let tempArray = pmtData.filter( stock => stock.Sector === sect );
		filteredArray = filteredArray.concat( tempArray );
	})

	res.send( createNewObject( filteredArray ));
})

router.get('/pmt/search', (req, res, next) => {

	let searchedArray = [];
	const { searchedStock } =  req.query;

	pmtData.forEach( stock => {
		if( stock.Name.toUpperCase().indexOf( searchedStock.toUpperCase() ) > -1 ){
			searchedArray.push( stock );
		}
	})
//	searchedArray = pmtData.filter( stock => stock.Name === searchedStock );
	res.send( createNewObject( searchedArray ));
})



