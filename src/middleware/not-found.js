import { debug } from 'console'


// eslint-disable-next-line arrow-body-style
const notFoundHandler = ( err, req, res ) => {
	debug( err )

	return res.status( 404 ).json({
		error: true,
		data: {
			errors: 'Route not found.',
		},
	})
}


export default notFoundHandler
