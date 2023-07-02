// eslint-disable-next-line arrow-body-style
const errorHandler = ( req, res ) => {
	return res.status( 404 ).json({
		error: true,
		data: {
			errors: 'Route not found.',
		},
	})
}


export default errorHandler
