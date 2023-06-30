import express from 'express'
import jwt from 'jsonwebtoken'
import { Auth } from '../controllers/Auth'


const router = express.Router()


// ad-hoc homepage
// router.get(
// 	'/',
// 	jwt({
// 		secret: process.env.SESSION_SECRET,
// 		algorithms: [
// 			'HS256',
// 		],
// 	}),
// 	( req, res ) => {
// 		console.log( req.auth )
// 		res.json({
// 			data: {
// 				appName: 'Quiche',
// 				version: '0.0.1',
// 			},
// 		})
// 	},
// )


router.post( '/token', async ( req, res ) => {
	const { username, password } = req.body

	const errors = []

	if ( 'string' !== typeof username || !username.length ) {
		errors.push( 'Username must be a non-empty string.' )
	}

	if ( 'string' !== typeof password || !password.length ) {
		errors.push( 'Password must be a non-empty string.' )
	}

	if ( errors.length ) {
		return res.status( 400 ).json({
			error: true,
			data: {
				errors,
			},
		})
	}

	const isValid = await Auth.validateUser( username, password, true )

	if ( !isValid ) {
		return res.status( 403 ).json({
			error: true,
			data: 'Unrecognized user. Please check your creds and try again.',
		})
	}

	const token = Auth.createTokenForCreds( username, password )

	return res.json({ token })
})


router.post( '/token/verify', async ( req, res ) => {
	const { token } = req.body

	if ( !token ) {
		return res.status( 400 ).json({
			error: true,
			data: {
				errors: 'You must pass a token to verify.',
			},
		})
	}

	const verified = await Auth.verifyToken( token )

	console.log( verified )

	const message = verified ? 'Token is valid!' : 'Token is invalid. Please create a new token.'

	return res.json({
		data: {
			message,
		},
	})
})


export default router
