// eslint-disable-next-line arrow-body-style
const notFoundHandler = ( req, res ) => {
	return res.status( 404 ).json({
		error: true,
		data: {
			errors: 'Route not found.',
		},
	})
}


export default notFoundHandler
