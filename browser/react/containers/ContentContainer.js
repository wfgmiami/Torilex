import React from 'react';
import { connect } from 'react-redux';
import Content from './Content';
import { updateHoldings, getHoldings } from '../action-creators/holdingsAction';




const mapStateToProps = ( state ) => {
	
	return {
		portfolio: state.portfolio.portfolio
	}
}

const mapDispatchToProps = ( dispatch ) => (
		{
			updateHoldings: ( updatedRowsArr, updatedData ) => dispatch(updateHoldings( updatedRowsArr, updatedData )),
			getHoldings: () => dispatch(getHoldings())
		}		
)


export default connect(mapStateToProps, mapDispatchToProps)(Content);
