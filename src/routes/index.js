import express from 'express'

const router = express.Router()

// ad-hoc homepage
router.get( '/', ( req, res ) => {
	res.json({
		data: {
			appName: 'Quiche',
			version: '0.0.1',
		},
	})
})

export default router
