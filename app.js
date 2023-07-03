import express from 'express'

import 'dotenv/config'

import cookieParser from 'cookie-parser'
import morgan from 'morgan'

// error handlers
import errorHandler from './src/middleware/error'
import notFoundHandler from './src/middleware/not-found'


// routes
import routerIndex from './src/routes/index'
import routerAuth from './src/routes/auth'
import routerExpenses from './src/routes/expenses'
import routerVendors from './src/routes/vendors'
import routerCategories from './src/routes/categories'
import routerPayTypes from './src/routes/paytypes'


const app = express()


// Express config
app.use( express.json() )
app.use( express.urlencoded({ extended: false }) )
app.use( morgan( 'tiny' ) )
app.use( cookieParser() )


// registering routes
app.use( '/', routerIndex )
app.use( '/auth', routerAuth )
app.use( '/expenses', routerExpenses )
app.use( '/vendors', routerVendors )
app.use( '/categories', routerCategories )
app.use( '/paytypes', routerPayTypes )


// handling 40X and 50X errors
app.use( errorHandler )
app.use( notFoundHandler )


export default app
