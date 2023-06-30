import express from 'express'
import PayTypes from '../controllers/PayTypes'


const router = express.Router()


// get all pay types
router.get( '/', async ( req, res ) => {
	const payTypes = await PayTypes.getAll()

	return res.json({
		paytypes: payTypes,
	})
})


// create new pay type
router.post( '/', async ( req, res ) => {
	const { body: { name } } = req

	if ( !name ) {
		return res.status( 400 ).json({
			error: true,
			data: {
				errors: 'A name must be passed to create a pay type.',
			},
		})
	}

	// first, see if the pay type already exists
	let payType = await PayTypes.getByName( name )

	// if no match, create new pay type
	if ( !payType ) {
		payType = await PayTypes.create( name )
	}

	return res.json({
		paytype: payType,
	})
})


// delete pay type
router.delete( '/', async ( req, res ) => {
	let { body: { id } } = req

	id = parseInt( id, 10 )

	if ( Number.isNaN( id ) ) {
		return res.status( 400 ).json({
			error: true,
			data: {
				errors: 'A numerical ID must be passed to delete a pay type.',
			},
		})
	}

	const deleted = await PayTypes.deleteById( id )

	return res.json({ deleted })
})


export default router
