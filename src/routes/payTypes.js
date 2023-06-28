import express from 'express'
import PayTypes from '../controllers/PayTypes'


const router = express.Router()


// get all pay types
router.get( '/', async ( req, res ) => {
	const payTypes = await PayTypes.getPayTypes()

	return res.json({
		paytypes: payTypes,
	})
})


export default router
