const priceFormatter = new Intl.NumberFormat( 'en-us', {
	style: 'currency',
	currency: 'USD',
})


/**
 * Convert number to "pretty" price
 *
 * @param {number} rawPrice
 * @return {obj}
 */
const prettifyPrice = rawPrice => {
	if ( Number.isNaN( rawPrice ) ) {
		return false
	}

	return priceFormatter.format( rawPrice )
}


export {
	prettifyPrice,
}
