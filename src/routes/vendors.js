import express from 'express'
import { Vendors } from '../controllers/Vendors'
import { ErrorResponseBody } from '../models/ErrorResponseBody'
import { ResponseBody } from '../models/ResponseBody'


const router = express.Router()


// get all vendors
router.get( '/', async ( req, res ) => {
	const vendors = await Vendors.getAll()

	return res.json({ vendors })
})


// create new vendor
router.post( '/', async ( req, res ) => {
	const { body: { name } } = req

	if ( !name ) {
		return res.status( 400 ).json( new ErrorResponseBody( 'A name must be passed to create a vendor.' ) )
	}

	// first, see if the vendor already exists
	let vendor = await Vendors.getByName( name )

	// if no match, create new vendor
	if ( !vendor ) {
		vendor = await Vendors.create( name )
	}

	return res.json( new ResponseBody({ vendor }) )
})


// delete vendor
router.delete( '/', async ( req, res ) => {
	let { body: { id } } = req

	id = parseInt( id, 10 )

	if ( Number.isNaN( id ) ) {
		return res.status( 400 ).json( new ErrorResponseBody( 'A numerical ID must be passed to delete a vendor.' ) )
	}

	const deleted = await Vendors.deleteById( id )

	return res.json( new ResponseBody({ deleted }) )
})


export default router
