import express from 'express'
import { Categories } from '../controllers/Categories'


const router = express.Router()


// get all categories
router.get( '/', async ( req, res ) => {
	const categories = await Categories.getAll()

	return res.json({ categories })
})


// create new category
router.post( '/', async ( req, res ) => {
	const { body: { name } } = req

	if ( !name ) {
		return res.status( 400 ).json({
			error: true,
			data: {
				errors: 'A name must be passed to create a category.',
			},
		})
	}

	// first, see if the category already exists
	let category = await Categories.getByName( name )

	// if no match, create new category
	if ( !category ) {
		category = await Categories.create( name )
	}

	return res.json({ category })
})


// delete category
router.delete( '/', async ( req, res ) => {
	let { body: { id } } = req

	id = parseInt( id, 10 )

	if ( Number.isNaN( id ) ) {
		return res.status( 400 ).json({
			error: true,
			data: {
				errors: 'A numerical ID must be passed to delete a category.'
			},
		})
	}

	const deleted = await Categories.deleteById( id )

	return res.json({ deleted })
})


export default router
