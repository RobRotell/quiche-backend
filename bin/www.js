#!/usr/bin/env node

// dependencies
import http from 'http'
import { log } from 'console'
import app from '../app'

// get port and set in Express
const port = process.env.PORT || '3001'
app.set( 'port', port )

// create server
const server = http.createServer( app )

// listen on port
server.listen( port )
server.on( 'listening', onListening )

// debugging
function onListening() {
	const addr = server.address()
	const bind = 'string' === typeof addr ? `pipe ${addr}` : `port ${addr.port}`

	log( `Listening on ${bind}` )
}
