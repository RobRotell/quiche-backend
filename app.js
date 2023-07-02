import express from 'express'

import 'dotenv/config'

import cookieParser from 'cookie-parser'
import morgan from 'morgan'

// error handlers
import errorHandler from './src/middleware/error.js'
import notFoundHandler from './src/middleware/not-found.js'


// routes
import routerIndex from './src/routes/index'
import routerAuth from './src/routes/auth'
import routerExpenses from './src/routes/expenses'
import routerVendors from './src/routes/vendors'
import routerCategories from './src/routes/categories'
import routerPayTypes from './src/routes/payTypes'


const app = express()


// Express config
app.use( express.json() )
app.use( express.urlencoded({ extended: false }) )
app.use( morgan( 'tiny' ) )
app.use( cookieParser() )


// handling for 40X and 50X requests
app.use( errorHandler )
app.use( notFoundHandler )


// registering routes
app.use( '/', routerIndex )
app.use( '/auth', routerAuth )
app.use( '/expenses', routerExpenses )
app.use( '/vendors', routerVendors )
app.use( '/categories', routerCategories )
app.use( '/paytypes', routerPayTypes )


export default app
