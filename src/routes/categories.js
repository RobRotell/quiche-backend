import express from 'express'
import Categories from '../controllers/Categories'


const router = express.Router()


// get all categories
router.get( '/', async ( req, res ) => {
	const categories = await Categories.getCategories()

	return res.json({ categories })
})


export default router
