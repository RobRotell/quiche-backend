import express from 'express'

import 'dotenv/config'

import cookieParser from 'cookie-parser'

import routerIndex from './src/routes/index'
import routerAuth from './src/routes/auth'
import routerExpenses from './src/routes/expenses'
import routerVendors from './src/routes/vendors'
import routerCategories from './src/routes/categories'
import routerPayTypes from './src/routes/payTypes'


const app = express()


app.use( express.json() )
app.use( express.urlencoded({ extended: false }) )
app.use( cookieParser() )

app.use( '/', routerIndex )
app.use( '/auth', routerAuth )
app.use( '/expenses', routerExpenses )
app.use( '/vendors', routerVendors )
app.use( '/categories', routerCategories )
app.use( '/paytypes', routerPayTypes )


export default app
