import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()


class Auth {

	/**
	 * Validate username/password
	 *
	 * Password is expected to already be hashed.
	 *
	 * @param {string} username
	 * @param {string} password
	 * @param {bool} hashPassword If true, will hash password before querying
	 *
	 * @return {bool} True, if user exists; otherwise, false
	 */
	static async validateUser( username, password, hashPassword = false ) {
		if ( hashPassword ) {
			// eslint-disable-next-line no-param-reassign
			password = this.hashPassword( password )
		}

		const match = await prisma.auth.findFirst({
			where: {
				username,
				password,
			},
		})

		return !!match
	}


	/**
	 * Create token from creds
	 *
	 * @param {string} username
	 * @param {string} password
	 *
	 * @return {string} Token
	 */
	static createTokenForCreds( username, password ) {
		const hashedPassword = this.hashPassword( password )

		return this.createToken({
			username,
			password: hashedPassword,
		})
	}


	/**
	 * Creates token from username and password
	 *
	 * @throws {Error} Argument is null or not an object
	 *
	 * @param {Object} data Data to encode in token
	 * @return {string}
	 */
	static createToken( data ) {
		if ( !data || 'object' !== typeof data ) {
			throw new Error( 'Data argument must be an object.' )
		}

		return jwt.sign({
			data,
		}, process.env.JWT_SECRET, {
			expiresIn: '7d',
		})
	}


	/**
	 * Verify token
	 *
	 * @param {string} token
	 * @return {bool} True, if valid token
	 */
	static verifyToken( token ) {
		let decoded

		try {
			decoded = jwt.verify( token, process.env.JWT_SECRET )
		} catch ( err ) {
			return false
		}

		console.log( decoded )

		if ( decoded.data ) {
			const { username, password } = decoded.data

			console.log( username, password )

			return this.validateUser( username, password )
		}

		return false
	}


	/**
	 * Hash password
	 *
	 * @param {string} password
	 * @return {string}
	 */
	static hashPassword( password ) {
		return crypto.createHash( 'sha256' ).update( password ).digest( 'hex' )
	}

}


export { Auth }
