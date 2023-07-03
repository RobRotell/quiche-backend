import { debug } from 'console'


// eslint-disable-next-line arrow-body-style
function errorHandler( err, req, res, next ) {
	debug( err )

	return res.status( 500 ).json({
		error: true,
		data: {
			errors: err,
		},
	})
}


export default errorHandler
