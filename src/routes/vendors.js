import express from 'express'
import Vendors from '../controllers/Vendors'


const router = express.Router()


// get all vendors
router.get( '/', async ( req, res ) => {
	const vendors = await Vendors.getVendors()

	return res.json({ vendors })
})


export default router
