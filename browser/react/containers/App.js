import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

import ContentContainer from './ContentContainer';
import store from '../store';
import { loadHoldings } from '../action-creators/holdingsAction';
import css from '../../../assets/stylesheets/style.scss'

const Promise = require('es6-promise-promise');


class App extends Component{
	constructor( props ){
		super( props );
;
	}

	componentDidMount(){
		store.dispatch( loadHoldings() );
	}


	render(){
//        console.log('.....in App.js, state',this.state);
		return(
			<div className="container-fluid">
				<Nav />
				<div style={ { marginTop: '70px' }}>
					<div className="row">
						<div className="col-sm-10">
							<ContentContainer/>
						</div>
						<div className="col-sm-2">
							<div>NEWS</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


export default App;
